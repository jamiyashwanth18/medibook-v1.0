"""Initial schema: users, sessions, patients, and the rest of the current models.

This is the first migration; every schema change from here on is a new revision
against this one, never an edit to it. Each table is only created when it is not
already there, so running this against a database an earlier `create_all` already
built is a safe no-op rather than a "relation already exists" error.
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def _existing_tables() -> set[str]:
    bind = op.get_bind()
    return set(sa.inspect(bind).get_table_names())


def upgrade() -> None:
    existing = _existing_tables()

    if "users" not in existing:
        op.create_table(
            "users",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("email", sa.String(length=320), nullable=True),
            sa.Column("phone", sa.String(length=32), nullable=True),
            sa.Column("password_hash", sa.String(length=255), nullable=False),
            sa.Column("role", sa.String(length=32), nullable=False),
            sa.Column("is_active", sa.Boolean(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.UniqueConstraint("email", name="uq_users_email"),
            sa.UniqueConstraint("phone", name="uq_users_phone"),
        )

    if "sessions" not in existing:
        op.create_table(
            "sessions",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "user_id",
                sa.Uuid(),
                sa.ForeignKey("users.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column("token", sa.String(length=128), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("last_activity_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
            sa.Column("revoked_at", sa.DateTime(timezone=True), nullable=True),
        )
        op.create_index("ix_sessions_user_id", "sessions", ["user_id"])
        op.create_index("ix_sessions_token", "sessions", ["token"], unique=True)

    if "patients" not in existing:
        op.create_table(
            "patients",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "user_id",
                sa.Uuid(),
                sa.ForeignKey("users.id", ondelete="SET NULL"),
                nullable=True,
            ),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("email", sa.String(length=320), nullable=True),
            sa.Column("phone", sa.String(length=32), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.UniqueConstraint("user_id", name="uq_patients_user_id"),
        )
        op.create_index("ix_patients_email", "patients", ["email"])
        op.create_index("ix_patients_phone", "patients", ["phone"])

    if "specializations" not in existing:
        op.create_table(
            "specializations",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("is_active", sa.Boolean(), nullable=False),
            sa.UniqueConstraint("name", name="uq_specializations_name"),
        )

    if "doctors" not in existing:
        op.create_table(
            "doctors",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "user_id",
                sa.Uuid(),
                sa.ForeignKey("users.id", ondelete="SET NULL"),
                nullable=True,
            ),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("contact_email", sa.String(length=320), nullable=True),
            sa.Column("contact_phone", sa.String(length=32), nullable=True),
            sa.Column("slot_duration_minutes", sa.Integer(), nullable=False),
            sa.Column("is_active", sa.Boolean(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.UniqueConstraint("user_id", name="uq_doctors_user_id"),
        )

    if "doctor_specializations" not in existing:
        op.create_table(
            "doctor_specializations",
            sa.Column(
                "doctor_id",
                sa.Uuid(),
                sa.ForeignKey("doctors.id", ondelete="CASCADE"),
                primary_key=True,
            ),
            sa.Column(
                "specialization_id",
                sa.Uuid(),
                sa.ForeignKey("specializations.id", ondelete="CASCADE"),
                primary_key=True,
            ),
        )

    if "disease_mappings" not in existing:
        op.create_table(
            "disease_mappings",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column("term", sa.String(length=255), nullable=False),
            sa.Column("term_type", sa.String(length=32), nullable=False),
            sa.Column("is_active", sa.Boolean(), nullable=False),
            sa.UniqueConstraint("term", "term_type", name="uq_disease_mappings_term_type"),
        )
        op.create_index("ix_disease_mappings_term", "disease_mappings", ["term"])

    if "disease_mapping_specializations" not in existing:
        op.create_table(
            "disease_mapping_specializations",
            sa.Column(
                "mapping_id",
                sa.Uuid(),
                sa.ForeignKey("disease_mappings.id", ondelete="CASCADE"),
                primary_key=True,
            ),
            sa.Column(
                "specialization_id",
                sa.Uuid(),
                sa.ForeignKey("specializations.id", ondelete="CASCADE"),
                primary_key=True,
            ),
        )

    if "availability_rules" not in existing:
        op.create_table(
            "availability_rules",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "doctor_id",
                sa.Uuid(),
                sa.ForeignKey("doctors.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column("weekday", sa.SmallInteger(), nullable=False),
            sa.Column("start_time", sa.Time(), nullable=False),
            sa.Column("end_time", sa.Time(), nullable=False),
        )
        op.create_index("ix_availability_rules_doctor_id", "availability_rules", ["doctor_id"])

    if "time_off" not in existing:
        op.create_table(
            "time_off",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "doctor_id",
                sa.Uuid(),
                sa.ForeignKey("doctors.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column("start_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("end_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("reason", sa.String(length=255), nullable=True),
        )
        op.create_index("ix_time_off_doctor_id", "time_off", ["doctor_id"])

    if "appointments" not in existing:
        op.create_table(
            "appointments",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "doctor_id",
                sa.Uuid(),
                sa.ForeignKey("doctors.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column(
                "patient_id",
                sa.Uuid(),
                sa.ForeignKey("patients.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column("slot_start", sa.DateTime(timezone=True), nullable=False),
            sa.Column("slot_end", sa.DateTime(timezone=True), nullable=False),
            sa.Column("status", sa.String(length=32), nullable=False),
            sa.Column(
                "created_by",
                sa.Uuid(),
                sa.ForeignKey("users.id", ondelete="SET NULL"),
                nullable=True,
            ),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        )
        op.create_index("ix_appointments_doctor_id", "appointments", ["doctor_id"])
        op.create_index("ix_appointments_patient_id", "appointments", ["patient_id"])
        op.create_index("ix_appointments_slot_start", "appointments", ["slot_start"])
        op.create_index(
            "uq_appointments_active_slot",
            "appointments",
            ["doctor_id", "slot_start"],
            unique=True,
            postgresql_where=sa.text("status IN ('booked', 'confirmed')"),
            sqlite_where=sa.text("status IN ('booked', 'confirmed')"),
        )

    if "consultation_records" not in existing:
        op.create_table(
            "consultation_records",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "appointment_id",
                sa.Uuid(),
                sa.ForeignKey("appointments.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column(
                "patient_id",
                sa.Uuid(),
                sa.ForeignKey("patients.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column(
                "doctor_id",
                sa.Uuid(),
                sa.ForeignKey("doctors.id", ondelete="CASCADE"),
                nullable=False,
            ),
            sa.Column("notes", sa.Text(), nullable=True),
            sa.Column("diagnosis", sa.Text(), nullable=True),
            sa.Column("prescription", sa.Text(), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        )
        op.create_index(
            "ix_consultation_records_appointment_id", "consultation_records", ["appointment_id"]
        )
        op.create_index(
            "ix_consultation_records_patient_id", "consultation_records", ["patient_id"]
        )
        op.create_index("ix_consultation_records_doctor_id", "consultation_records", ["doctor_id"])

    if "audit_logs" not in existing:
        op.create_table(
            "audit_logs",
            sa.Column("id", sa.Uuid(), primary_key=True),
            sa.Column(
                "actor_user_id",
                sa.Uuid(),
                sa.ForeignKey("users.id", ondelete="SET NULL"),
                nullable=True,
            ),
            sa.Column("action", sa.String(length=64), nullable=False),
            sa.Column("entity_type", sa.String(length=64), nullable=False),
            sa.Column("entity_id", sa.Uuid(), nullable=True),
            sa.Column("occurred_at", sa.DateTime(timezone=True), nullable=False),
        )
        op.create_index("ix_audit_logs_actor_user_id", "audit_logs", ["actor_user_id"])
        op.create_index("ix_audit_logs_entity_type", "audit_logs", ["entity_type"])
        op.create_index("ix_audit_logs_entity_id", "audit_logs", ["entity_id"])
        op.create_index("ix_audit_logs_occurred_at", "audit_logs", ["occurred_at"])


def downgrade() -> None:
    op.drop_table("audit_logs")
    op.drop_table("consultation_records")
    op.drop_index("uq_appointments_active_slot", table_name="appointments")
    op.drop_table("appointments")
    op.drop_table("time_off")
    op.drop_table("availability_rules")
    op.drop_table("disease_mapping_specializations")
    op.drop_table("disease_mappings")
    op.drop_table("doctor_specializations")
    op.drop_table("doctors")
    op.drop_table("specializations")
    op.drop_table("patients")
    op.drop_table("sessions")
    op.drop_table("users")
