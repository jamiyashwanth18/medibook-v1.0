"""The schema the handlers will be written against.

These cover structure, not behaviour: that the models create, and that the
partial unique index the architecture requires really does make two live
appointments in one doctor's slot impossible at the database level.
"""

from datetime import timedelta

import pytest
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import (
    STATUS_BOOKED,
    STATUS_CANCELLED,
    Appointment,
    Doctor,
    Patient,
    Specialization,
    utcnow,
)


@pytest.fixture
def booking_fixtures(db_session: Session) -> tuple[Doctor, Patient, Patient]:
    cardiology = Specialization(name="Cardiology")
    doctor = Doctor(name="Dr Ada Hart", slot_duration_minutes=30, specializations=[cardiology])
    first = Patient(name="Patient One", email="one@example.test")
    second = Patient(name="Patient Two", email="two@example.test")
    db_session.add_all([cardiology, doctor, first, second])
    db_session.commit()
    return doctor, first, second


def _appointment(doctor: Doctor, patient: Patient, start, status: str = STATUS_BOOKED):
    return Appointment(
        doctor_id=doctor.id,
        patient_id=patient.id,
        slot_start=start,
        slot_end=start + timedelta(minutes=doctor.slot_duration_minutes),
        status=status,
    )


def test_a_doctor_links_to_its_specializations(booking_fixtures) -> None:
    doctor, _, _ = booking_fixtures
    assert [s.name for s in doctor.specializations] == ["Cardiology"]


def test_two_live_appointments_cannot_share_a_slot(db_session: Session, booking_fixtures) -> None:
    doctor, first, second = booking_fixtures
    start = utcnow() + timedelta(days=1)

    db_session.add(_appointment(doctor, first, start))
    db_session.commit()

    db_session.add(_appointment(doctor, second, start))
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()


def test_cancelling_releases_the_slot(db_session: Session, booking_fixtures) -> None:
    doctor, first, second = booking_fixtures
    start = utcnow() + timedelta(days=2)

    taken = _appointment(doctor, first, start)
    db_session.add(taken)
    db_session.commit()

    taken.status = STATUS_CANCELLED
    db_session.commit()

    db_session.add(_appointment(doctor, second, start))
    db_session.commit()  # the partial index only covers booked/confirmed rows
