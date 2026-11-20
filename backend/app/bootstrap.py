"""Users seeded on startup, from the environment and only from the environment.

The platform sets BOOTSTRAP_ADMIN_EMAIL / BOOTSTRAP_ADMIN_PASSWORD on the deployed
API, and SMOKE_TEST_EMAIL / SMOKE_TEST_PASSWORD for the smoke and E2E runs. Each
pair seeds exactly one user, idempotently: the user is created only when no user
with that email exists, so a redeploy never duplicates or overwrites one.

With a pair unset -- a local run, the unit tests -- nothing is seeded. No password
is ever written in this repository; both come from the environment.
"""

import logging

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.config import Settings, get_settings
from app.models import ROLE_ADMIN, ROLE_PATIENT, Patient, User
from app.security import hash_password

logger = logging.getLogger(__name__)


def _ensure_user(session: Session, *, email: str, password: str, role: str, name: str) -> bool:
    """Create the user when no user holds that email. Returns whether one was created."""
    normalized = email.strip().lower()
    if not normalized or not password:
        return False

    existing = session.scalar(select(User).where(func.lower(User.email) == normalized))
    if existing is not None:
        return False

    user = User(
        name=name,
        email=normalized,
        password_hash=hash_password(password),
        role=role,
        is_active=True,
    )
    session.add(user)
    session.flush()

    # A patient signs in and books for themselves, so the lowest role also needs the
    # patients row every appointment points at.
    if role == ROLE_PATIENT:
        session.add(Patient(user_id=user.id, name=name, email=normalized))

    logger.info("Seeded %s user %s", role, normalized)
    return True


def seed_bootstrap_users(session: Session, settings: Settings | None = None) -> int:
    """Seed the first admin and the smoke-test patient. Returns how many were created."""
    settings = settings or get_settings()
    created = 0

    if settings.bootstrap_admin_email and settings.bootstrap_admin_password:
        created += _ensure_user(
            session,
            email=settings.bootstrap_admin_email,
            password=settings.bootstrap_admin_password,
            role=ROLE_ADMIN,
            name="Administrator",
        )

    if settings.smoke_test_email and settings.smoke_test_password:
        created += _ensure_user(
            session,
            email=settings.smoke_test_email,
            password=settings.smoke_test_password,
            role=ROLE_PATIENT,
            name="Smoke Test Patient",
        )

    if created:
        session.commit()
    else:
        session.rollback()
    return created
