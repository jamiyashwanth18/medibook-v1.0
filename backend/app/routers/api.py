"""Routes for API.

Endpoints the approved API spec declares without naming a component that owns them.

Auth and the minimal doctor endpoints AC-009 needs are implemented; every other
handler is still a stub returning a typed placeholder.
"""

import uuid

from fastapi import APIRouter, HTTPException, Response, status
from sqlalchemy import func, or_, select

from app.bootstrap import seed_bootstrap_users
from app.dependencies import AdminUser, AppSettings, CurrentSession, CurrentUser, DbSession
from app.models import (
    ROLE_DOCTOR,
    ROLE_PATIENT,
    AuditLog,
    Doctor,
    Patient,
    Specialization,
    User,
    UserSession,
    utcnow,
)
from app.schemas import (
    DoctorCreateRequest,
    DoctorOut,
    DoctorPatchRequest,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    SpecializationCreateRequest,
    SpecializationOut,
    StubResponse,
    UserOut,
)
from app.security import (
    generate_session_token,
    hash_password,
    iso_z,
    session_expiry,
    verify_password,
)

router = APIRouter(tags=["API"])


def _parse_uuid(value: str) -> uuid.UUID:
    """A path id as a UUID, or 404 -- an unknown or non-UUID id is never a 422."""
    try:
        return uuid.UUID(value)
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found") from None


def _parse_uuid_list(values: list[str]) -> list[uuid.UUID]:
    parsed = []
    for value in values:
        try:
            parsed.append(uuid.UUID(value))
        except (ValueError, AttributeError, TypeError):
            continue
    return parsed


@router.post("/auth/register", status_code=status.HTTP_201_CREATED, response_model=RegisterResponse)
async def post_auth_register(payload: RegisterRequest, db: DbSession) -> RegisterResponse:
    """Patient self-registration with name and unique email or phone and a password meeting strength rules."""
    conditions = []
    if payload.email:
        conditions.append(func.lower(User.email) == payload.email)
    if payload.phone:
        conditions.append(User.phone == payload.phone)

    existing = db.scalar(select(User).where(or_(*conditions))) if conditions else None
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email or phone already in use"
        )

    user = User(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role=ROLE_PATIENT,
        is_active=True,
    )
    db.add(user)
    db.flush()

    db.add(Patient(user_id=user.id, name=payload.name, email=payload.email, phone=payload.phone))
    db.commit()

    return RegisterResponse(user_id=str(user.id), role=ROLE_PATIENT)


@router.post("/auth/login", response_model=LoginResponse)
async def post_auth_login(
    payload: LoginRequest, db: DbSession, settings: AppSettings
) -> LoginResponse:
    """Authenticate by email/phone and password; returns opaque session token in the body."""
    # Idempotent: only creates the bootstrap admin / smoke user when neither exists
    # yet, so a database a deploy already seeded (via the startup lifespan) or a
    # fresh per-test database (which the lifespan never touches) both end up with
    # exactly one of each from the environment.
    seed_bootstrap_users(db, settings)

    identifier = payload.identifier.strip()
    user = db.scalar(
        select(User).where(
            or_(func.lower(User.email) == identifier.lower(), User.phone == identifier)
        )
    )

    invalid_credentials = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
    )
    if user is None or not user.is_active:
        raise invalid_credentials
    if not verify_password(payload.password, user.password_hash):
        raise invalid_credentials

    now = utcnow()
    session = UserSession(
        user_id=user.id,
        token=generate_session_token(),
        created_at=now,
        last_activity_at=now,
        expires_at=session_expiry(now),
    )
    db.add(session)
    db.commit()

    return LoginResponse(
        token=session.token,
        expires_at=iso_z(session.expires_at),
        user=UserOut.model_validate(user),
    )


@router.post("/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
async def post_auth_logout(session: CurrentSession, db: DbSession) -> Response:
    """Revoke the current session server-side."""
    session.revoked_at = utcnow()
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/auth/me", response_model=UserOut)
async def get_auth_me(user: CurrentUser) -> UserOut:
    """Return the current user profile and role."""
    return UserOut.model_validate(user)


@router.get("/specializations")
async def get_specializations() -> StubResponse:
    """List specializations (active for selection flows)."""
    return StubResponse(endpoint="GET /specializations")


@router.post(
    "/specializations", status_code=status.HTTP_201_CREATED, response_model=SpecializationOut
)
async def post_specializations(
    payload: SpecializationCreateRequest, db: DbSession, _admin: AdminUser
) -> SpecializationOut:
    """Create a specialization with a unique name (admin-only)."""
    existing = db.scalar(
        select(Specialization).where(func.lower(Specialization.name) == payload.name.lower())
    )
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Specialization name already in use"
        )

    specialization = Specialization(name=payload.name)
    db.add(specialization)
    db.commit()
    db.refresh(specialization)

    return SpecializationOut.model_validate(specialization)


@router.patch("/specializations/{id}")
async def patch_specializations_by_id(id: str) -> StubResponse:
    """Edit or deactivate a specialization; existing links preserved."""
    return StubResponse(endpoint="PATCH /specializations/{id}")


@router.post("/doctors", status_code=status.HTTP_201_CREATED, response_model=DoctorOut)
async def post_doctors(payload: DoctorCreateRequest, db: DbSession, _admin: AdminUser) -> DoctorOut:
    """Create a doctor with name, contact and at least one specialization, and the
    login they use to manage it (admin-only; minimal, for AC-009 reachability)."""
    existing = db.scalar(select(User).where(func.lower(User.email) == payload.contact_email))
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email or phone already in use"
        )

    user = User(
        name=payload.name,
        email=payload.contact_email,
        phone=payload.contact_phone,
        password_hash=hash_password(payload.password),
        role=ROLE_DOCTOR,
        is_active=True,
    )
    db.add(user)
    db.flush()

    doctor = Doctor(
        user_id=user.id,
        name=payload.name,
        contact_email=payload.contact_email,
        contact_phone=payload.contact_phone,
    )
    if payload.specialization_ids:
        ids = _parse_uuid_list(payload.specialization_ids)
        doctor.specializations = list(
            db.scalars(select(Specialization).where(Specialization.id.in_(ids))).all()
        )
    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return DoctorOut.model_validate(doctor)


@router.patch("/doctors/{id}", response_model=DoctorOut)
async def patch_doctors_by_id(
    id: str, payload: DoctorPatchRequest, db: DbSession, _admin: AdminUser
) -> DoctorOut:
    """Update doctor profile, specializations, or deactivate (removes from search and blocks new slots)."""
    doctor = db.get(Doctor, _parse_uuid(id))
    if doctor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    if payload.name is not None:
        doctor.name = payload.name
    if payload.is_active is not None:
        doctor.is_active = payload.is_active
        # The doctor's login shares this on/off switch: deactivating here must
        # also stop every session of theirs, per AC-009.
        if doctor.user_id is not None:
            doctor_user = db.get(User, doctor.user_id)
            if doctor_user is not None:
                doctor_user.is_active = payload.is_active
    if payload.specialization_ids is not None:
        ids = _parse_uuid_list(payload.specialization_ids)
        doctor.specializations = list(
            db.scalars(select(Specialization).where(Specialization.id.in_(ids))).all()
        )

    db.commit()
    db.refresh(doctor)

    return DoctorOut.model_validate(doctor)


@router.get("/doctors/search")
async def get_doctors_search() -> StubResponse:
    """Search active doctors by disease, symptom or specialization via the static lookup."""
    return StubResponse(endpoint="GET /doctors/search")


@router.get("/disease-mappings")
async def get_disease_mappings() -> StubResponse:
    """List disease/symptom-to-specialization mappings."""
    return StubResponse(endpoint="GET /disease-mappings")


@router.post("/disease-mappings")
async def post_disease_mappings() -> StubResponse:
    """Map a disease/symptom term to one or more specializations."""
    return StubResponse(endpoint="POST /disease-mappings")


@router.patch("/disease-mappings/{id}")
async def patch_disease_mappings_by_id(id: str) -> StubResponse:
    """Edit or remove a mapping; reflected in subsequent searches."""
    return StubResponse(endpoint="PATCH /disease-mappings/{id}")


@router.put("/doctors/{id}/availability")
async def put_doctors_by_id_availability(id: str, db: DbSession, user: CurrentUser) -> StubResponse:
    """Set recurring weekly working hours; overlapping/invalid ranges rejected.

    Only the treating doctor may set their own availability -- role checked first,
    then the doctor row must exist, then it must be theirs.
    """
    if user.role != ROLE_DOCTOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions"
        )

    doctor = db.get(Doctor, _parse_uuid(id))
    if doctor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if doctor.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions"
        )

    return StubResponse(endpoint="PUT /doctors/{id}/availability")


@router.post("/doctors/{id}/time-off")
async def post_doctors_by_id_time_off(id: str) -> StubResponse:
    """Add time off/exception range; warns if it overlaps booked appointments."""
    return StubResponse(endpoint="POST /doctors/{id}/time-off")


@router.get("/doctors/{id}/slots")
async def get_doctors_by_id_slots(id: str) -> StubResponse:
    """Bookable fixed-duration slots computed from rules minus time off minus booked appointments."""
    return StubResponse(endpoint="GET /doctors/{id}/slots")


@router.post("/appointments")
async def post_appointments(_user: CurrentUser) -> StubResponse:
    """Book an available slot under transactional locking; patient or admin-on-behalf."""
    return StubResponse(endpoint="POST /appointments")


@router.get("/appointments")
async def get_appointments() -> StubResponse:
    """List appointments scoped by role: patient sees own, doctor sees own schedule, admin sees all; supports filters."""
    return StubResponse(endpoint="GET /appointments")


@router.patch("/appointments/{id}/reschedule")
async def patch_appointments_by_id_reschedule(id: str) -> StubResponse:
    """Move appointment to a new available slot; old slot freed, new locked."""
    return StubResponse(endpoint="PATCH /appointments/{id}/reschedule")


@router.patch("/appointments/{id}/status")
async def patch_appointments_by_id_status(id: str) -> StubResponse:
    """Doctor updates status among booked/confirmed/completed/cancelled/no-show; cancel releases slot."""
    return StubResponse(endpoint="PATCH /appointments/{id}/status")


@router.delete("/appointments/{id}")
async def delete_appointments_by_id(id: str) -> StubResponse:
    """Cancel an upcoming appointment, releasing the slot; completed/cancelled cannot be cancelled."""
    return StubResponse(endpoint="DELETE /appointments/{id}")


@router.post("/patients")
async def post_patients() -> StubResponse:
    """Admin/front-desk creates a patient record (no login) with name and email or phone."""
    return StubResponse(endpoint="POST /patients")


@router.post("/consultation-records")
async def post_consultation_records() -> StubResponse:
    """Treating doctor creates a text-only consultation record linked to an appointment; change audited."""
    return StubResponse(endpoint="POST /consultation-records")


@router.patch("/consultation-records/{id}")
async def patch_consultation_records_by_id(id: str) -> StubResponse:
    """Edit consultation record text; change captured in audit trail."""
    return StubResponse(endpoint="PATCH /consultation-records/{id}")


@router.get("/consultation-records/{id}")
async def get_consultation_records_by_id(id: str) -> StubResponse:
    """View a record; access audited. Patient sees only own, treating doctor and admin permitted."""
    return StubResponse(endpoint="GET /consultation-records/{id}")


@router.get("/me/consultation-records")
async def get_me_consultation_records() -> StubResponse:
    """Patient lists only their own consultation records."""
    return StubResponse(endpoint="GET /me/consultation-records")


@router.get("/audit-logs")
async def get_audit_logs(db: DbSession, _admin: AdminUser) -> list[dict]:
    """Admin reviews access and change entries for consultation records, newest first."""
    logs = db.scalars(select(AuditLog).order_by(AuditLog.occurred_at.desc())).all()
    return [
        {
            "id": str(log.id),
            "actor_user_id": str(log.actor_user_id) if log.actor_user_id else None,
            "action": log.action,
            "entity_type": log.entity_type,
            "entity_id": str(log.entity_id) if log.entity_id else None,
            "occurred_at": iso_z(log.occurred_at),
        }
        for log in logs
    ]
