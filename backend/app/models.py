"""SQLAlchemy models, one per entity in the approved data model.

Structure only: columns, keys, indexes and the constraints the architecture
names. No business rules live here -- the handlers that enforce them are each a
development ticket of their own.

The portable `Uuid` and `DateTime(timezone=True)` types map to PostgreSQL's
`uuid`/`timestamptz` on the deployed database and still work on the in-memory
SQLite the unit tests build, so one set of models covers both.
"""

import uuid
from datetime import UTC, datetime, time

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    SmallInteger,
    String,
    Text,
    Time,
    UniqueConstraint,
    Uuid,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

# Roles, highest privilege first. `ROLE_ADMIN` is what the bootstrap admin gets;
# `ROLE_PATIENT` is the lowest role, what self-registration and the smoke user get.
ROLE_ADMIN = "admin"
ROLE_DOCTOR = "doctor"
ROLE_PATIENT = "patient"
ROLES = (ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT)

# Appointment statuses the API spec allows on PATCH /appointments/{id}/status.
STATUS_BOOKED = "booked"
STATUS_CONFIRMED = "confirmed"
STATUS_COMPLETED = "completed"
STATUS_CANCELLED = "cancelled"
STATUS_NO_SHOW = "no_show"
APPOINTMENT_STATUSES = (
    STATUS_BOOKED,
    STATUS_CONFIRMED,
    STATUS_COMPLETED,
    STATUS_CANCELLED,
    STATUS_NO_SHOW,
)
# Statuses that still occupy a slot: these are what the partial unique index below
# makes exclusive, so a cancelled appointment frees its slot for someone else.
ACTIVE_APPOINTMENT_STATUSES = (STATUS_BOOKED, STATUS_CONFIRMED)

# Disease-mapping term kinds (POST /disease-mappings {term_type}).
TERM_TYPE_DISEASE = "disease"
TERM_TYPE_SYMPTOM = "symptom"
TERM_TYPES = (TERM_TYPE_DISEASE, TERM_TYPE_SYMPTOM)


def _uuid_pk() -> Mapped[uuid.UUID]:
    return mapped_column(Uuid, primary_key=True, default=uuid.uuid4)


def utcnow() -> datetime:
    """Timezone-aware now, so every timestamp written is comparable to every other."""
    return datetime.now(UTC)


class User(Base):
    """An account that can sign in: patient, doctor or admin."""

    __tablename__ = "users"

    id: Mapped[uuid.UUID] = _uuid_pk()
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str | None] = mapped_column(String(320), unique=True)
    phone: Mapped[str | None] = mapped_column(String(32), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(32), nullable=False, default=ROLE_PATIENT)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )

    sessions: Mapped[list["UserSession"]] = relationship(back_populates="user")


class UserSession(Base):
    """An opaque server-side session; its token is the Bearer the SPA sends back."""

    __tablename__ = "sessions"

    id: Mapped[uuid.UUID] = _uuid_pk()
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    token: Mapped[str] = mapped_column(String(128), nullable=False, unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )
    last_activity_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="sessions")


class Patient(Base):
    """A person appointments are booked for. `user_id` is null for a record the
    front desk created, which has no login."""

    __tablename__ = "patients"

    id: Mapped[uuid.UUID] = _uuid_pk()
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), unique=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str | None] = mapped_column(String(320), index=True)
    phone: Mapped[str | None] = mapped_column(String(32), index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )


class DoctorSpecialization(Base):
    """Link table between a doctor and the specializations they practise."""

    __tablename__ = "doctor_specializations"

    doctor_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("doctors.id", ondelete="CASCADE"), primary_key=True
    )
    specialization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("specializations.id", ondelete="CASCADE"), primary_key=True
    )


class Doctor(Base):
    """A practitioner patients can book. `user_id` links the login that manages it."""

    __tablename__ = "doctors"

    id: Mapped[uuid.UUID] = _uuid_pk()
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), unique=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    contact_email: Mapped[str | None] = mapped_column(String(320))
    contact_phone: Mapped[str | None] = mapped_column(String(32))
    slot_duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False, default=30)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )

    specializations: Mapped[list["Specialization"]] = relationship(
        secondary="doctor_specializations", back_populates="doctors"
    )
    availability_rules: Mapped[list["AvailabilityRule"]] = relationship(back_populates="doctor")
    time_off: Mapped[list["TimeOff"]] = relationship(back_populates="doctor")


class Specialization(Base):
    """A medical specialization doctors are listed under and mappings point at."""

    __tablename__ = "specializations"

    id: Mapped[uuid.UUID] = _uuid_pk()
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    doctors: Mapped[list["Doctor"]] = relationship(
        secondary="doctor_specializations", back_populates="specializations"
    )


class DiseaseMapping(Base):
    """A disease or symptom term that the static lookup resolves to specializations."""

    __tablename__ = "disease_mappings"

    id: Mapped[uuid.UUID] = _uuid_pk()
    term: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    term_type: Mapped[str] = mapped_column(String(32), nullable=False, default=TERM_TYPE_DISEASE)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    specializations: Mapped[list["Specialization"]] = relationship(
        secondary="disease_mapping_specializations"
    )

    __table_args__ = (UniqueConstraint("term", "term_type", name="uq_disease_mappings_term_type"),)


class DiseaseMappingSpecialization(Base):
    """Link table between a mapped term and each specialization it resolves to."""

    __tablename__ = "disease_mapping_specializations"

    mapping_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("disease_mappings.id", ondelete="CASCADE"), primary_key=True
    )
    specialization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("specializations.id", ondelete="CASCADE"), primary_key=True
    )


class AvailabilityRule(Base):
    """One recurring weekly working window. `weekday` is 0=Monday .. 6=Sunday."""

    __tablename__ = "availability_rules"

    id: Mapped[uuid.UUID] = _uuid_pk()
    doctor_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("doctors.id", ondelete="CASCADE"), nullable=False, index=True
    )
    weekday: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    start_time: Mapped[time] = mapped_column(Time, nullable=False)
    end_time: Mapped[time] = mapped_column(Time, nullable=False)

    doctor: Mapped["Doctor"] = relationship(back_populates="availability_rules")


class TimeOff(Base):
    """A dated range in which a doctor is unavailable, overriding the weekly rules."""

    __tablename__ = "time_off"

    id: Mapped[uuid.UUID] = _uuid_pk()
    doctor_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("doctors.id", ondelete="CASCADE"), nullable=False, index=True
    )
    start_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    reason: Mapped[str | None] = mapped_column(String(255))

    doctor: Mapped["Doctor"] = relationship(back_populates="time_off")


class Appointment(Base):
    """A booked consultation slot.

    `uq_appointments_active_slot` is the partial unique index the architecture
    requires: at most one booked-or-confirmed appointment can exist per doctor and
    slot start, so two concurrent bookings of the same slot cannot both commit --
    the loser gets an integrity error the handler turns into 409.
    """

    __tablename__ = "appointments"

    id: Mapped[uuid.UUID] = _uuid_pk()
    doctor_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("doctors.id", ondelete="CASCADE"), nullable=False, index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True
    )
    slot_start: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, index=True
    )
    slot_end: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default=STATUS_BOOKED)
    created_by: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL")
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow, onupdate=utcnow
    )

    __table_args__ = (
        Index(
            "uq_appointments_active_slot",
            "doctor_id",
            "slot_start",
            unique=True,
            postgresql_where=text("status IN ('booked', 'confirmed')"),
            sqlite_where=text("status IN ('booked', 'confirmed')"),
        ),
    )


class ConsultationRecord(Base):
    """Text-only notes the treating doctor keeps against one appointment."""

    __tablename__ = "consultation_records"

    id: Mapped[uuid.UUID] = _uuid_pk()
    appointment_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("appointments.id", ondelete="CASCADE"), nullable=False, index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True
    )
    doctor_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("doctors.id", ondelete="CASCADE"), nullable=False, index=True
    )
    notes: Mapped[str | None] = mapped_column(Text)
    diagnosis: Mapped[str | None] = mapped_column(Text)
    prescription: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow, onupdate=utcnow
    )


class AuditLog(Base):
    """One entry per access to, or change of, an audited record."""

    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = _uuid_pk()
    actor_user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), index=True
    )
    action: Mapped[str] = mapped_column(String(64), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    entity_id: Mapped[uuid.UUID | None] = mapped_column(Uuid, index=True)
    occurred_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utcnow, index=True
    )


__all__ = [
    "ACTIVE_APPOINTMENT_STATUSES",
    "APPOINTMENT_STATUSES",
    "ROLES",
    "ROLE_ADMIN",
    "ROLE_DOCTOR",
    "ROLE_PATIENT",
    "STATUS_BOOKED",
    "STATUS_CANCELLED",
    "STATUS_COMPLETED",
    "STATUS_CONFIRMED",
    "STATUS_NO_SHOW",
    "TERM_TYPES",
    "TERM_TYPE_DISEASE",
    "TERM_TYPE_SYMPTOM",
    "Appointment",
    "AuditLog",
    "AvailabilityRule",
    "Base",
    "ConsultationRecord",
    "DiseaseMapping",
    "DiseaseMappingSpecialization",
    "Doctor",
    "DoctorSpecialization",
    "Patient",
    "Specialization",
    "TimeOff",
    "User",
    "UserSession",
    "utcnow",
]
