"""Shared FastAPI dependencies: the current session, the current user, role checks.

Every endpoint except register and login is authenticated the same way -- a Bearer
token that names a row in `sessions` which is neither expired nor revoked -- and
every protected handler re-checks role and ownership. That lookup belongs in one
place; the handlers themselves stay in their own tickets.

`SECRET_KEY` is deliberately not accepted here. It is the shared bearer baked into
the SPA build, so it is public and identifies the frontend, never a user.
"""

from datetime import UTC, datetime
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import Settings, get_settings
from app.database import get_db
from app.models import ROLE_ADMIN, User, UserSession, utcnow
from app.security import SESSION_INACTIVITY_TTL

# auto_error=False: a missing header returns our own 401 with the same body as an
# invalid one, rather than FastAPI's 403.
bearer_scheme = HTTPBearer(auto_error=False, description="Opaque session token")

CREDENTIALS_ERROR = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Not authenticated",
    headers={"WWW-Authenticate": "Bearer"},
)

DbSession = Annotated[Session, Depends(get_db)]
AppSettings = Annotated[Settings, Depends(get_settings)]
Credentials = Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)]


def _as_utc(value: datetime | None) -> datetime | None:
    """A stored timestamp as an aware UTC datetime (SQLite hands back naive ones)."""
    if value is None:
        return None
    return value if value.tzinfo else value.replace(tzinfo=UTC)


def get_current_session(credentials: Credentials, db: DbSession) -> UserSession:
    """The live session the Bearer token names, or 401."""
    if credentials is None or not credentials.credentials:
        raise CREDENTIALS_ERROR

    session = db.scalar(select(UserSession).where(UserSession.token == credentials.credentials))
    if session is None or session.revoked_at is not None:
        raise CREDENTIALS_ERROR

    expires_at = _as_utc(session.expires_at)
    if expires_at is not None and expires_at <= utcnow():
        raise CREDENTIALS_ERROR

    last_activity_at = _as_utc(session.last_activity_at)
    if last_activity_at is not None and utcnow() - last_activity_at > SESSION_INACTIVITY_TTL:
        raise CREDENTIALS_ERROR

    session.last_activity_at = utcnow()
    db.commit()
    return session


CurrentSession = Annotated[UserSession, Depends(get_current_session)]


def get_current_user(session: CurrentSession, db: DbSession) -> User:
    """The signed-in user behind the Bearer token, or 401."""
    user = db.get(User, session.user_id)
    if user is None or not user.is_active:
        raise CREDENTIALS_ERROR
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def require_roles(*roles: str):
    """A dependency that passes only for a user holding one of `roles`.

    Use as `Depends(require_roles(ROLE_ADMIN))`. Ownership (this patient's
    appointment, this doctor's record) is checked by the handler, which is the only
    code that knows what it is looking at.
    """

    allowed = frozenset(roles)

    def _dependency(user: CurrentUser) -> User:
        if user.role not in allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return user

    return _dependency


def require_admin(user: CurrentUser) -> User:
    """Shorthand for the admin-only endpoints the API spec marks `(admin)`."""
    if user.role != ROLE_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return user


AdminUser = Annotated[User, Depends(require_admin)]
