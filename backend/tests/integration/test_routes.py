"""The approved API spec's paths are mounted and documented.

Each handler is still a stub, so this asserts nothing about behaviour -- only that
the frontend and the development tickets find the agreed paths where the spec says
they are.
"""

import pytest
from fastapi.testclient import TestClient

SPEC_PATHS = [
    ("post", "/auth/register"),
    ("post", "/auth/login"),
    ("post", "/auth/logout"),
    ("get", "/auth/me"),
    ("get", "/specializations"),
    ("post", "/specializations"),
    ("patch", "/specializations/{id}"),
    ("post", "/doctors"),
    ("patch", "/doctors/{id}"),
    ("get", "/doctors/search"),
    ("get", "/disease-mappings"),
    ("post", "/disease-mappings"),
    ("patch", "/disease-mappings/{id}"),
    ("put", "/doctors/{id}/availability"),
    ("post", "/doctors/{id}/time-off"),
    ("get", "/doctors/{id}/slots"),
    ("post", "/appointments"),
    ("get", "/appointments"),
    ("patch", "/appointments/{id}/reschedule"),
    ("patch", "/appointments/{id}/status"),
    ("delete", "/appointments/{id}"),
    ("post", "/patients"),
    ("post", "/consultation-records"),
    ("patch", "/consultation-records/{id}"),
    ("get", "/consultation-records/{id}"),
    ("get", "/me/consultation-records"),
    ("get", "/audit-logs"),
]


@pytest.mark.parametrize(("method", "path"), SPEC_PATHS)
def test_the_spec_path_is_mounted(client: TestClient, method: str, path: str) -> None:
    paths = client.get("/openapi.json").json()["paths"]
    assert path in paths, f"{path} is not served"
    assert method in paths[path], f"{method.upper()} {path} is not served"
