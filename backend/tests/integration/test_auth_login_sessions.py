"""POST /auth/login, GET /auth/me, POST /auth/logout and session lifetime.

AC-005 one generic invalid-credentials message, AC-006 logout revokes a token
and concurrent sessions are independent, AC-008 a malformed/missing/unknown
token reveals nothing, AC-009 deactivation revokes existing sessions,
NFR-001/002/003.
"""

import pytest
from fastapi.testclient import TestClient

from tests.integration._auth_helpers import (
    admin_token,
    auth_headers,
    login,
    rand_hex,
    register_and_login,
    register_patient,
)

INVALID_CREDENTIALS_BODY = {"detail": "Invalid credentials"}


def test_ac005_nfr003_unknown_identifier_returns_generic_401(client: TestClient) -> None:
    response = login(client, f"nobody.{rand_hex()}@example.test", "WhateverPass1")
    assert response.status_code == 401
    assert response.json() == INVALID_CREDENTIALS_BODY


def test_ac005_nfr003_wrong_password_returns_generic_401(client: TestClient) -> None:
    info = register_patient(client)
    assert info["response"].status_code == 201

    response = login(client, info["email"], "WrongPassword9")
    assert response.status_code == 401
    assert response.json() == INVALID_CREDENTIALS_BODY


def test_ac001_login_with_correct_credentials_returns_a_token_and_profile(
    client: TestClient,
) -> None:
    info = register_and_login(client)
    assert "token" in info
    assert info["user"]["role"] == "patient"
    assert info["user"]["is_active"] is True


def test_ac006_a_token_reaches_auth_me_until_logout(client: TestClient) -> None:
    info = register_and_login(client)
    headers = auth_headers(info["token"])

    me = client.get("/auth/me", headers=headers)
    assert me.status_code == 200

    logout = client.post("/auth/logout", headers=headers)
    assert logout.status_code == 204

    after_logout = client.get("/auth/me", headers=headers)
    assert after_logout.status_code == 401


def test_ac006_logging_out_twice_with_the_same_token_is_401_the_second_time(
    client: TestClient,
) -> None:
    info = register_and_login(client)
    headers = auth_headers(info["token"])

    first = client.post("/auth/logout", headers=headers)
    assert first.status_code == 204

    second = client.post("/auth/logout", headers=headers)
    assert second.status_code == 401


def test_ac006_concurrent_logins_each_hold_an_independent_session(client: TestClient) -> None:
    info = register_patient(client)
    assert info["response"].status_code == 201

    first_login = login(client, info["email"], info["password"])
    second_login = login(client, info["email"], info["password"])
    assert first_login.status_code == 200
    assert second_login.status_code == 200

    first_token = first_login.json()["token"]
    second_token = second_login.json()["token"]
    assert first_token != second_token

    # Revoking the first session leaves the second one usable.
    revoke_first = client.post("/auth/logout", headers=auth_headers(first_token))
    assert revoke_first.status_code == 204

    still_good = client.get("/auth/me", headers=auth_headers(second_token))
    assert still_good.status_code == 200

    now_dead = client.get("/auth/me", headers=auth_headers(first_token))
    assert now_dead.status_code == 401


def test_ac008_missing_token_returns_401(client: TestClient) -> None:
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_ac008_malformed_token_returns_401(client: TestClient) -> None:
    response = client.get("/auth/me", headers={"Authorization": "NotBearerAtAll"})
    assert response.status_code == 401


def test_ac008_unknown_token_returns_401(client: TestClient) -> None:
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {rand_hex(32)}"})
    assert response.status_code == 401


@pytest.mark.skip(
    reason=(
        "[KNOWN-LIMIT] exercising the 30-minute inactivity or 24-hour absolute expiry "
        "needs the server clock to move or a direct database write; this suite only "
        "builds state through the HTTP API, so it cannot fast-forward a session's age."
    )
)
def test_ac008_nfr002_a_session_past_its_inactivity_or_absolute_limit_returns_401() -> None:
    pass


def test_ac009_deactivating_a_doctor_revokes_their_existing_sessions(
    client: TestClient,
) -> None:
    admin = admin_token(client)
    suffix = rand_hex()

    # A specialization the doctor needs to be created against.
    spec = client.post(
        "/specializations",
        json={"name": f"QA Specialization {suffix}"},
        headers=auth_headers(admin),
    )
    assert spec.status_code == 201, spec.text
    spec_id = spec.json()["id"]

    doctor_email = f"qa.doctor.{suffix}@example.test"
    doctor_password = "Abcdef12"
    created = client.post(
        "/doctors",
        json={
            "name": f"Dr QA {suffix}",
            "contact_email": doctor_email,
            "specialization_ids": [spec_id],
            "password": doctor_password,
        },
        headers=auth_headers(admin),
    )
    assert created.status_code == 201, created.text
    doctor_id = created.json()["id"]

    doctor_login = login(client, doctor_email, doctor_password)
    assert doctor_login.status_code == 200, doctor_login.text
    doctor_session_token = doctor_login.json()["token"]

    still_works = client.get("/auth/me", headers=auth_headers(doctor_session_token))
    assert still_works.status_code == 200

    deactivate = client.patch(
        f"/doctors/{doctor_id}",
        json={"is_active": False},
        headers=auth_headers(admin),
    )
    assert deactivate.status_code == 200, deactivate.text

    revoked = client.get("/auth/me", headers=auth_headers(doctor_session_token))
    assert revoked.status_code == 401


def test_nfr001_login_and_profile_responses_never_echo_the_plaintext_password(
    client: TestClient,
) -> None:
    info = register_and_login(client)
    assert info["password"] not in str(info["response"].json())
    # Neither /auth/login's body nor /auth/me's ever carries the password back.
    me = client.get("/auth/me", headers=auth_headers(info["token"]))
    assert info["password"] not in str(me.json())
    assert "password" not in me.json()
    assert "password_hash" not in me.json()
