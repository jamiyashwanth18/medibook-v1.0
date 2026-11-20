"""Role-based access: every protected call enforces the caller's role, no
token is always 401, an unknown id is 404, and role checks run before
ownership checks.

AC-010 patient blocked from admin/doctor areas, AC-011 doctor blocked from the
admin dashboard and another doctor's resources, AC-012 anonymous calls are
denied, NFR-005.
"""

import uuid

from fastapi.testclient import TestClient

from tests.integration._auth_helpers import (
    admin_token,
    auth_headers,
    login,
    rand_hex,
    register_and_login,
)


def _make_doctor(client: TestClient, admin: str) -> dict:
    suffix = rand_hex()
    spec = client.post(
        "/specializations",
        json={"name": f"QA Specialization {suffix}"},
        headers=auth_headers(admin),
    )
    assert spec.status_code == 201, spec.text
    spec_id = spec.json()["id"]

    email = f"qa.doctor.{suffix}@example.test"
    password = "Abcdef12"
    created = client.post(
        "/doctors",
        json={
            "name": f"Dr QA {suffix}",
            "contact_email": email,
            "specialization_ids": [spec_id],
            "password": password,
        },
        headers=auth_headers(admin),
    )
    assert created.status_code == 201, created.text
    doctor_id = created.json()["id"]

    doctor_login = login(client, email, password)
    assert doctor_login.status_code == 200, doctor_login.text
    return {"id": doctor_id, "token": doctor_login.json()["token"]}


def test_ac010_nfr005_patient_gets_403_on_admin_only_endpoints(client: TestClient) -> None:
    admin = admin_token(client)
    patient = register_and_login(client)

    create_spec = client.post(
        "/specializations",
        json={"name": f"QA Patient Attempt {rand_hex()}"},
        headers=auth_headers(patient["token"]),
    )
    assert create_spec.status_code == 403

    audit = client.get("/audit-logs", headers=auth_headers(patient["token"]))
    assert audit.status_code == 403

    # sanity: the same call succeeds for the admin.
    admin_ok = client.get("/audit-logs", headers=auth_headers(admin))
    assert admin_ok.status_code == 200


def test_ac010_nfr005_patient_gets_403_on_a_doctor_only_endpoint(client: TestClient) -> None:
    admin = admin_token(client)
    doctor = _make_doctor(client, admin)
    patient = register_and_login(client)

    response = client.put(
        f"/doctors/{doctor['id']}/availability",
        json={"rules": [{"weekday": 0, "start_time": "09:00", "end_time": "12:00"}]},
        headers=auth_headers(patient["token"]),
    )
    assert response.status_code == 403


def test_ac011_nfr005_doctor_gets_403_on_the_admin_dashboard(client: TestClient) -> None:
    admin = admin_token(client)
    doctor = _make_doctor(client, admin)

    response = client.get("/audit-logs", headers=auth_headers(doctor["token"]))
    assert response.status_code == 403


def test_ac011_nfr005_doctor_gets_403_on_another_doctors_resource(client: TestClient) -> None:
    admin = admin_token(client)
    doctor_a = _make_doctor(client, admin)
    doctor_b = _make_doctor(client, admin)

    response = client.put(
        f"/doctors/{doctor_b['id']}/availability",
        json={"rules": [{"weekday": 0, "start_time": "09:00", "end_time": "12:00"}]},
        headers=auth_headers(doctor_a["token"]),
    )
    assert response.status_code == 403


def test_ac012_nfr005_anonymous_calls_are_401_not_403(client: TestClient) -> None:
    admin = admin_token(client)
    doctor = _make_doctor(client, admin)

    assert client.get("/auth/me").status_code == 401
    assert client.get("/audit-logs").status_code == 401
    assert (
        client.put(
            f"/doctors/{doctor['id']}/availability",
            json={"rules": []},
        ).status_code
        == 401
    )
    assert client.post("/appointments", json={}).status_code == 401


def test_unknown_id_is_404_for_an_authorized_caller(client: TestClient) -> None:
    admin = admin_token(client)
    missing_id = str(uuid.uuid4())

    response = client.patch(
        f"/doctors/{missing_id}",
        json={"is_active": False},
        headers=auth_headers(admin),
    )
    assert response.status_code == 404


def test_non_uuid_id_is_404(client: TestClient) -> None:
    admin = admin_token(client)

    response = client.patch(
        "/doctors/not-a-uuid",
        json={"is_active": False},
        headers=auth_headers(admin),
    )
    assert response.status_code == 404


def test_nfr005_role_checks_run_before_ownership_or_existence_checks(
    client: TestClient,
) -> None:
    """A patient hitting an admin-only path with an id that does not exist still
    gets 403 for the wrong role, not 404 for the missing row -- the role gate runs
    first."""
    patient = register_and_login(client)
    missing_id = str(uuid.uuid4())

    response = client.patch(
        f"/doctors/{missing_id}",
        json={"is_active": False},
        headers=auth_headers(patient["token"]),
    )
    assert response.status_code == 403
