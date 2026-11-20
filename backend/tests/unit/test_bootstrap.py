"""The startup seeding: from the environment, idempotent, and nothing without it.

No password is written here. Each one is generated inside the test and passed
around as a variable, so the repository never holds a credential.
"""

import secrets

import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.bootstrap import seed_bootstrap_users
from app.config import Settings
from app.models import ROLE_ADMIN, ROLE_PATIENT, Patient, User
from app.security import verify_password

BOOTSTRAP_VARS = (
    "BOOTSTRAP_ADMIN_EMAIL",
    "BOOTSTRAP_ADMIN_PASSWORD",
    "SMOKE_TEST_EMAIL",
    "SMOKE_TEST_PASSWORD",
)


@pytest.fixture
def clean_env(monkeypatch: pytest.MonkeyPatch) -> None:
    """No seeding variables set, whatever the machine running the tests has."""
    for name in BOOTSTRAP_VARS:
        monkeypatch.delenv(name, raising=False)


@pytest.fixture
def seeded_settings(monkeypatch: pytest.MonkeyPatch, clean_env: None) -> Settings:
    """Settings carrying a freshly generated admin and smoke-test credential pair."""
    monkeypatch.setenv("BOOTSTRAP_ADMIN_EMAIL", "admin@example.test")
    monkeypatch.setenv("BOOTSTRAP_ADMIN_PASSWORD", secrets.token_urlsafe(16))
    monkeypatch.setenv("SMOKE_TEST_EMAIL", "smoke@example.test")
    monkeypatch.setenv("SMOKE_TEST_PASSWORD", secrets.token_urlsafe(16))
    return Settings()


def test_nothing_is_seeded_without_the_variables(db_session: Session, clean_env: None) -> None:
    assert seed_bootstrap_users(db_session, Settings()) == 0
    assert db_session.scalars(select(User)).all() == []


def test_seeds_the_admin_and_the_smoke_user(db_session: Session, seeded_settings: Settings) -> None:
    assert seed_bootstrap_users(db_session, seeded_settings) == 2

    admin = db_session.scalar(select(User).where(User.email == "admin@example.test"))
    assert admin is not None
    assert admin.role == ROLE_ADMIN
    assert admin.is_active
    # The password is stored hashed, never in the clear.
    assert admin.password_hash != seeded_settings.bootstrap_admin_password
    assert verify_password(seeded_settings.bootstrap_admin_password, admin.password_hash)

    smoke = db_session.scalar(select(User).where(User.email == "smoke@example.test"))
    assert smoke is not None
    assert smoke.role == ROLE_PATIENT
    assert verify_password(seeded_settings.smoke_test_password, smoke.password_hash)

    # The lowest role also gets the patients row appointments are booked against.
    patient = db_session.scalar(select(Patient).where(Patient.user_id == smoke.id))
    assert patient is not None


def test_seeding_twice_creates_nothing_new(db_session: Session, seeded_settings: Settings) -> None:
    assert seed_bootstrap_users(db_session, seeded_settings) == 2
    assert seed_bootstrap_users(db_session, seeded_settings) == 0
    assert len(db_session.scalars(select(User)).all()) == 2
