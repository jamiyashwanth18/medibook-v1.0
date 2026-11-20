"""Unit coverage for the auth foundation: hashing, register/login/logout/me, session
expiry and revocation, generic login failure, is_active, and the role dependency.

Each test builds the identifiers it needs with a random suffix, per the behaviour
rule that nothing here depends on another test's leftovers.
"""

import secrets
import uuid
from datetime import timedelta

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import ROLE_ADMIN, ROLE_DOCTOR, User, UserSession, utcnow
from app.security import hash_password, verify_password


def _unique(prefix: str) -> str:
    return f"{prefix}-{secrets.token_hex(4)}"


def _register(client: TestClient, **overrides) -> dict:
    body = {
        "name": _unique("Pat"),
        "email": f"{_unique('pat')}@example.test",
        "password": "Str0ngPass1",
    }
    body.update(overrides)
    return client.post("/auth/register", json=body)


# --- AC-007 / NFR-001: hashing -------------------------------------------------


def test_ac007_passwords_are_stored_only_as_a_bcrypt_hash() -> None:
    hashed = hash_password("Str0ngPass1")
    assert hashed != "Str0ngPass1"
    assert hashed.startswith("$2")
    assert verify_password("Str0ngPass1", hashed)
    assert not verify_password("wrong-password", hashed)


def test_verify_password_rejects_a_missing_hash() -> None:
    assert not verify_password("anything", None)


# --- AC-001 / AC-002 / AC-003: register -----------------------------------------


def test_ac001_register_creates_a_patient_who_can_then_log_in(client: TestClient) -> None:
    email = f"{_unique('newpatient')}@example.test"
    response = _register(client, email=email)

    assert response.status_code == 201
    body = response.json()
    assert body["role"] == "patient"
    assert "token" not in body
    uuid.UUID(body["user_id"])  # a real uuid4

    login = client.post("/auth/login", json={"identifier": email, "password": "Str0ngPass1"})
    assert login.status_code == 200
    assert login.json()["user"]["role"] == "patient"


def test_ac002_duplicate_email_is_rejected_case_insensitively(client: TestClient) -> None:
    email = f"{_unique('dup')}@example.test"
    first = _register(client, email=email)
    assert first.status_code == 201

    second = _register(client, email=email.upper())
    assert second.status_code == 409
    assert "detail" in second.json()


def test_ac002_duplicate_phone_is_rejected(client: TestClient) -> None:
    phone = f"+1555{secrets.randbelow(10**7):07d}"
    first = _register(client, email=None, phone=phone)
    assert first.status_code == 201

    second = _register(client, email=None, phone=phone)
    assert second.status_code == 409


def test_ac002_neither_email_nor_phone_is_rejected(client: TestClient) -> None:
    response = _register(client, email=None, phone=None)
    assert response.status_code == 422


def test_ac003_a_weak_password_is_rejected_with_the_rules_spelled_out(
    client: TestClient,
) -> None:
    response = _register(client, password="short1")
    assert response.status_code == 422
    assert "letter" in str(response.json()).lower()
    assert "digit" in str(response.json()).lower()


def test_ac003_any_role_sent_at_registration_is_ignored(client: TestClient) -> None:
    body = {
        "name": _unique("Pat"),
        "email": f"{_unique('ignored')}@example.test",
        "password": "Str0ngPass1",
        "role": "admin",
    }
    response = client.post("/auth/register", json=body)
    assert response.status_code == 201
    assert response.json()["role"] == "patient"


# --- AC-004 / AC-005: login -----------------------------------------------------


def test_ac004_login_returns_an_opaque_token_and_the_users_role(client: TestClient) -> None:
    email = f"{_unique('login')}@example.test"
    _register(client, email=email)

    response = client.post("/auth/login", json={"identifier": email, "password": "Str0ngPass1"})
    assert response.status_code == 200
    body = response.json()
    assert isinstance(body["token"], str) and len(body["token"]) > 20
    assert "." not in body["token"]  # not a JWT
    assert body["expires_at"].endswith("Z")
    assert body["user"]["role"] == "patient"
    assert body["user"]["is_active"] is True


def test_ac005_unknown_identifier_returns_generic_401(client: TestClient) -> None:
    response = client.post(
        "/auth/login", json={"identifier": "nobody@example.test", "password": "whatever1"}
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}


def test_ac005_wrong_password_returns_generic_401(client: TestClient) -> None:
    email = f"{_unique('wrongpw')}@example.test"
    _register(client, email=email)

    response = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1-but-wrong"}
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}


def test_ac005_inactive_account_returns_generic_401(
    client: TestClient, db_session: Session
) -> None:
    email = f"{_unique('inactive')}@example.test"
    _register(client, email=email)

    user = db_session.query(User).filter(User.email == email).one()
    user.is_active = False
    db_session.commit()

    response = client.post("/auth/login", json={"identifier": email, "password": "Str0ngPass1"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}


# --- AC-006: logout / multiple sessions -----------------------------------------


def test_ac006_logout_revokes_the_session_and_reuse_is_rejected(client: TestClient) -> None:
    email = f"{_unique('logout')}@example.test"
    _register(client, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    me = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me.status_code == 200

    logout = client.post("/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert logout.status_code == 204
    assert logout.content == b""

    reuse = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert reuse.status_code == 401

    logout_again = client.post("/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert logout_again.status_code == 401


def test_ac006_logging_in_again_creates_a_second_independent_session(
    client: TestClient,
) -> None:
    email = f"{_unique('twosessions')}@example.test"
    _register(client, email=email)

    token_a = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]
    token_b = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]
    assert token_a != token_b

    client.post("/auth/logout", headers={"Authorization": f"Bearer {token_a}"})

    still_good = client.get("/auth/me", headers={"Authorization": f"Bearer {token_b}"})
    assert still_good.status_code == 200


# --- AC-008 / NFR-002: session expiry -------------------------------------------


def test_ac008_a_session_past_its_absolute_lifetime_is_rejected(
    client: TestClient, db_session: Session
) -> None:
    email = f"{_unique('absolute')}@example.test"
    _register(client, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    session = db_session.query(UserSession).filter(UserSession.token == token).one()
    session.created_at = utcnow() - timedelta(hours=25)
    session.expires_at = utcnow() - timedelta(hours=1)
    db_session.commit()

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 401


def test_ac008_a_session_idle_past_30_minutes_is_rejected(
    client: TestClient, db_session: Session
) -> None:
    email = f"{_unique('idle')}@example.test"
    _register(client, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    session = db_session.query(UserSession).filter(UserSession.token == token).one()
    session.last_activity_at = utcnow() - timedelta(minutes=31)
    db_session.commit()

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 401


def test_a_fresh_session_within_both_limits_is_accepted(client: TestClient) -> None:
    email = f"{_unique('fresh')}@example.test"
    _register(client, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200


# --- AC-009: deactivation stops every existing session --------------------------


def test_ac009_deactivating_a_user_revokes_every_existing_session_immediately(
    client: TestClient, db_session: Session
) -> None:
    email = f"{_unique('deactivate')}@example.test"
    _register(client, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    assert client.get("/auth/me", headers={"Authorization": f"Bearer {token}"}).status_code == 200

    user = db_session.query(User).filter(User.email == email).one()
    user.is_active = False
    db_session.commit()

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 401


# --- AC-010/011/012: the role dependency and /auth/me ---------------------------


def test_ac010_missing_token_returns_401(client: TestClient) -> None:
    assert client.get("/auth/me").status_code == 401


def test_ac010_malformed_token_returns_401(client: TestClient) -> None:
    response = client.get("/auth/me", headers={"Authorization": "NotBearer abc"})
    assert response.status_code == 401


def test_ac010_unknown_token_returns_401(client: TestClient) -> None:
    response = client.get(
        "/auth/me", headers={"Authorization": f"Bearer {secrets.token_urlsafe(32)}"}
    )
    assert response.status_code == 401


def test_ac011_auth_me_returns_the_callers_profile(client: TestClient) -> None:
    email = f"{_unique('me')}@example.test"
    name = _unique("Me Patient")
    _register(client, name=name, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    body = response.json()
    assert body["email"] == email
    assert body["name"] == name
    assert body["role"] == "patient"
    assert body["is_active"] is True


def _login_as_admin(db_session: Session, client: TestClient) -> str:
    password = secrets.token_urlsafe(12) + "A1"
    admin = User(
        name="Admin",
        email=f"{_unique('admin')}@example.test",
        password_hash=hash_password(password),
        role=ROLE_ADMIN,
        is_active=True,
    )
    db_session.add(admin)
    db_session.commit()

    response = client.post("/auth/login", json={"identifier": admin.email, "password": password})
    return response.json()["token"]


def test_ac012_a_role_the_endpoint_does_not_permit_gets_403(client: TestClient) -> None:
    email = f"{_unique('patientrole')}@example.test"
    _register(client, email=email)
    token = client.post(
        "/auth/login", json={"identifier": email, "password": "Str0ngPass1"}
    ).json()["token"]

    response = client.post(
        "/doctors",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "Dr Nope",
            "contact_email": f"{_unique('drnope')}@example.test",
            "password": "Str0ngPass1",
        },
    )
    assert response.status_code == 403


def test_ac012_an_unknown_doctor_id_gets_404(client: TestClient, db_session: Session) -> None:
    token = _login_as_admin(db_session, client)
    response = client.patch(
        f"/doctors/{uuid.uuid4()}",
        headers={"Authorization": f"Bearer {token}"},
        json={"is_active": False},
    )
    assert response.status_code == 404


def test_ac012_a_non_uuid_doctor_id_gets_404(client: TestClient, db_session: Session) -> None:
    token = _login_as_admin(db_session, client)
    response = client.patch(
        "/doctors/not-a-uuid",
        headers={"Authorization": f"Bearer {token}"},
        json={"is_active": False},
    )
    assert response.status_code == 404


# --- AC-009: admin can create a doctor and deactivate it over HTTP --------------


def test_ac009_admin_creates_a_doctor_and_deactivates_them(
    client: TestClient, db_session: Session
) -> None:
    admin_token = _login_as_admin(db_session, client)
    doctor_email = f"{_unique('doctor')}@example.test"

    created = client.post(
        "/doctors",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"name": "Dr Hart", "contact_email": doctor_email, "password": "Str0ngPass1"},
    )
    assert created.status_code == 201
    doctor_id = created.json()["id"]

    doctor_user = db_session.query(User).filter(User.email == doctor_email).one()
    assert doctor_user.role == ROLE_DOCTOR

    doctor_login = client.post(
        "/auth/login", json={"identifier": doctor_email, "password": "Str0ngPass1"}
    )
    assert doctor_login.status_code == 200
    doctor_token = doctor_login.json()["token"]

    deactivated = client.patch(
        f"/doctors/{doctor_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"is_active": False},
    )
    assert deactivated.status_code == 200
    assert deactivated.json()["is_active"] is False

    blocked = client.get("/auth/me", headers={"Authorization": f"Bearer {doctor_token}"})
    assert blocked.status_code == 401
