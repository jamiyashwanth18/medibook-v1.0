"""POST /auth/register: a patient self-registers, duplicates are rejected, and a
weak password is rejected with the rules spelled out.

AC-001 self-registration, AC-002 duplicate email/phone -> 409, AC-003 weak
password -> 422, NFR-004 password-strength rules shown to the user.
"""

from fastapi.testclient import TestClient

from tests.integration._auth_helpers import rand_digits, rand_hex, register_patient


def test_ac001_registers_a_patient_and_returns_no_token(client: TestClient) -> None:
    info = register_patient(client)
    response = info["response"]

    assert response.status_code == 201
    body = response.json()
    assert body["role"] == "patient"
    assert "user_id" in body
    assert "token" not in body


def test_ac001_ignores_a_role_sent_in_the_body(client: TestClient) -> None:
    suffix = rand_hex()
    response = client.post(
        "/auth/register",
        json={
            "name": f"QA Patient {suffix}",
            "email": f"qa.{suffix}@example.test",
            "password": "Abcdef12",
            "role": "admin",
        },
    )

    assert response.status_code == 201
    assert response.json()["role"] == "patient"


def test_ac002_duplicate_email_is_rejected_with_409(client: TestClient) -> None:
    info = register_patient(client)
    assert info["response"].status_code == 201

    again = client.post(
        "/auth/register",
        json={"name": "Someone Else", "email": info["email"], "password": "Abcdef12"},
    )
    assert again.status_code == 409


def test_ac002_duplicate_email_is_case_insensitive(client: TestClient) -> None:
    info = register_patient(client)
    assert info["response"].status_code == 201

    again = client.post(
        "/auth/register",
        json={
            "name": "Shout Case",
            "email": info["email"].upper(),
            "password": "Abcdef12",
        },
    )
    assert again.status_code == 409


def test_ac002_duplicate_phone_is_rejected_with_409(client: TestClient) -> None:
    phone = f"+1555{rand_digits()}"
    first = client.post(
        "/auth/register",
        json={"name": "First Patient", "phone": phone, "password": "Abcdef12"},
    )
    assert first.status_code == 201

    second = client.post(
        "/auth/register",
        json={"name": "Second Patient", "phone": phone, "password": "Abcdef12"},
    )
    assert second.status_code == 409


def test_ac003_nfr004_password_without_a_digit_is_422_with_rules_in_message(
    client: TestClient,
) -> None:
    suffix = rand_hex()
    response = client.post(
        "/auth/register",
        json={
            "name": f"QA Patient {suffix}",
            "email": f"qa.{suffix}@example.test",
            "password": "onlyletters",
        },
    )

    assert response.status_code == 422
    body = str(response.json()).lower()
    assert "8" in body or "digit" in body or "letter" in body


def test_ac003_nfr004_password_shorter_than_eight_characters_is_422(
    client: TestClient,
) -> None:
    suffix = rand_hex()
    response = client.post(
        "/auth/register",
        json={
            "name": f"QA Patient {suffix}",
            "email": f"qa.{suffix}@example.test",
            "password": "Ab1",
        },
    )
    assert response.status_code == 422


def test_ac003_nfr004_password_without_a_letter_is_422(client: TestClient) -> None:
    suffix = rand_hex()
    response = client.post(
        "/auth/register",
        json={
            "name": f"QA Patient {suffix}",
            "email": f"qa.{suffix}@example.test",
            "password": "12345678",
        },
    )
    assert response.status_code == 422


def test_neither_email_nor_phone_is_422(client: TestClient) -> None:
    suffix = rand_hex()
    response = client.post(
        "/auth/register",
        json={"name": f"QA Patient {suffix}", "password": "Abcdef12"},
    )
    assert response.status_code == 422
