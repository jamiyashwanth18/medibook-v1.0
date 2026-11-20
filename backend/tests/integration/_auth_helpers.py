"""Shared helpers for the auth-slice integration tests (not a test module itself).

Every identifier is randomised per call so tests never depend on data another
test, or another run, left behind -- the suite builds everything it needs
through the HTTP API, never through the database.
"""

from __future__ import annotations

import os
import random
import uuid

from fastapi.testclient import TestClient

VALID_PASSWORD = "Abcdef12"


def rand_hex(n: int = 8) -> str:
    return uuid.uuid4().hex[:n]


def rand_digits(n: int = 9) -> str:
    return "".join(random.choices("0123456789", k=n))


def register_patient(
    client: TestClient,
    *,
    email: str | None = None,
    phone: str | None = None,
    password: str = VALID_PASSWORD,
    name: str | None = None,
) -> dict:
    """Register a fresh patient and return {response, email, phone, password, name}."""
    suffix = rand_hex()
    body: dict = {
        "name": name or f"QA Patient {suffix}",
        "password": password,
    }
    if email is not False:
        body["email"] = email or f"qa.{suffix}@example.test"
    if phone:
        body["phone"] = phone
    response = client.post("/auth/register", json=body)
    return {
        "response": response,
        "email": body.get("email"),
        "phone": body.get("phone"),
        "password": password,
        "name": body["name"],
    }


def login(client: TestClient, identifier: str, password: str):
    return client.post("/auth/login", json={"identifier": identifier, "password": password})


def register_and_login(client: TestClient, **kwargs) -> dict:
    """Register a new patient and log them in. Returns registration info plus token."""
    info = register_patient(client, **kwargs)
    assert info["response"].status_code == 201, info["response"].text
    login_response = login(client, info["email"], info["password"])
    assert login_response.status_code == 200, login_response.text
    body = login_response.json()
    info["token"] = body["token"]
    info["user"] = body["user"]
    return info


def auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def admin_credentials() -> tuple[str, str]:
    """The one admin every run has, from the environment: never a literal here."""
    email = os.environ["BOOTSTRAP_ADMIN_EMAIL"]
    password = os.environ["BOOTSTRAP_ADMIN_PASSWORD"]
    return email, password


def admin_login(client: TestClient):
    email, password = admin_credentials()
    return login(client, email, password)


def admin_token(client: TestClient) -> str:
    response = admin_login(client)
    assert response.status_code == 200, response.text
    return response.json()["token"]
