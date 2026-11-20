"""Password hashing and session-token generation.

Shared scaffolding: registration, login and session lookup are each a ticket of
their own, but they all need the same hash and the same token shape, and a second
implementation of either is how two endpoints stop agreeing.

Passwords are hashed with passlib's bcrypt (salted, slow on purpose). Session
tokens are opaque random strings -- nothing is signed with `SECRET_KEY`, which is
public, and the session's authority comes from the row in `sessions`, not from the
token's contents.
"""

import secrets
from datetime import datetime, timedelta

from passlib.context import CryptContext

from app.config import get_settings
from app.models import utcnow

# bcrypt only: one scheme, so a stored hash never depends on which host wrote it.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Number of random bytes behind a session token. 32 bytes is ~43 URL-safe characters.
TOKEN_BYTES = 32


def hash_password(password: str) -> str:
    """The hash to store for `password`. Never store, log or return the password."""
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str | None) -> bool:
    """Whether `password` matches `password_hash`.

    A missing hash verifies as False rather than raising, so a login for an unknown
    identifier takes the same path -- and answers the same way -- as a wrong password.
    """
    if not password_hash:
        return False
    try:
        return pwd_context.verify(password, password_hash)
    except ValueError:
        # A stored value that is not a bcrypt hash at all: not a match, not a crash.
        return False


def generate_session_token() -> str:
    """A fresh opaque session token."""
    return secrets.token_urlsafe(TOKEN_BYTES)


def session_expiry(issued_at: datetime | None = None) -> datetime:
    """When a session issued now stops being valid (SESSION_TTL_HOURS)."""
    return (issued_at or utcnow()) + timedelta(hours=get_settings().session_ttl_hours)
