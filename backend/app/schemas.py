"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
"""

import re

from pydantic import BaseModel, ConfigDict, field_validator, model_validator

PASSWORD_RULES = (
    "Password must be at least 8 characters long and contain at least one letter and one digit."
)

_HAS_LETTER = re.compile(r"[A-Za-z]")
_HAS_DIGIT = re.compile(r"\d")


def _check_password_strength(password: str) -> str:
    if len(password) < 8 or not _HAS_LETTER.search(password) or not _HAS_DIGIT.search(password):
        raise ValueError(PASSWORD_RULES)
    return password


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


class RegisterRequest(BaseModel):
    """POST /auth/register body. Any role sent here is ignored: self-registration
    always creates a patient."""

    name: str
    email: str | None = None
    phone: str | None = None
    password: str

    @field_validator("name")
    @classmethod
    def _name_not_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("name is required")
        return value

    @field_validator("email")
    @classmethod
    def _normalize_email(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip().lower()
        return value or None

    @field_validator("phone")
    @classmethod
    def _normalize_phone(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip()
        return value or None

    @field_validator("password")
    @classmethod
    def _password_strength(cls, value: str) -> str:
        return _check_password_strength(value)

    @model_validator(mode="after")
    def _requires_an_identifier(self) -> "RegisterRequest":
        if not self.email and not self.phone:
            raise ValueError("either email or phone is required")
        return self


class RegisterResponse(BaseModel):
    user_id: str
    role: str


class LoginRequest(BaseModel):
    """POST /auth/login body. `identifier` is matched against email (case
    insensitively) or phone (exactly)."""

    identifier: str
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: str | None
    phone: str | None
    role: str
    is_active: bool

    @field_validator("id", mode="before")
    @classmethod
    def _id_as_str(cls, value: object) -> str:
        return str(value)


class LoginResponse(BaseModel):
    token: str
    expires_at: str
    user: UserOut


class SpecializationCreateRequest(BaseModel):
    """POST /specializations body (admin-only)."""

    name: str

    @field_validator("name")
    @classmethod
    def _name_not_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("name is required")
        return value


class SpecializationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    is_active: bool

    @field_validator("id", mode="before")
    @classmethod
    def _id_as_str(cls, value: object) -> str:
        return str(value)


class DoctorCreateRequest(BaseModel):
    """POST /doctors body (admin-only): creates the doctor's profile and the
    login they use to manage it."""

    name: str
    contact_email: str
    contact_phone: str | None = None
    password: str
    specialization_ids: list[str] = []

    @field_validator("name")
    @classmethod
    def _name_not_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("name is required")
        return value

    @field_validator("contact_email")
    @classmethod
    def _normalize_email(cls, value: str) -> str:
        value = value.strip().lower()
        if not value:
            raise ValueError("contact_email is required")
        return value

    @field_validator("contact_phone")
    @classmethod
    def _normalize_phone(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip()
        return value or None

    @field_validator("password")
    @classmethod
    def _password_strength(cls, value: str) -> str:
        return _check_password_strength(value)


class DoctorPatchRequest(BaseModel):
    """PATCH /doctors/{id} body (admin-only)."""

    name: str | None = None
    specialization_ids: list[str] | None = None
    is_active: bool | None = None


class DoctorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    contact_email: str | None
    contact_phone: str | None
    is_active: bool

    @field_validator("id", mode="before")
    @classmethod
    def _id_as_str(cls, value: object) -> str:
        return str(value)
