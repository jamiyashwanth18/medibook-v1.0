# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Covers patient self-registration by email or phone, login/logout, and role-based access enforcement for patients, doctors and administrators. Sessions and credential storage are treated as checkable security outcomes.

Goal: patient self-registration, login, and role-based access for patients, doctors and administrators; sessions and credentials handled as checkable security outcomes. Assumption recorded: email/password authentication plus role-based auth, hosted in an India region to keep data in-country. Stories: US-001 (registration), US-002 (login/logout), US-003 (secure password storage and session expiry), US-004 (role-based access enforcement).

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: planning:EPIC-002

Admins maintain the clinic's specialization list and doctor profiles so patients can find and book the right doctors.

Goal: admins maintain the clinic's doctors and the list of specializations; all doctors are internal staff of the single clinic. Stories: US-005 (create/edit/deactivate specializations), US-006 (create and maintain doctor records with specialization).

**Related:** US-005, US-006

### EPIC-003 · approved · source: planning:EPIC-003

A predefined, admin-maintained static lookup maps diseases/symptoms to specializations with explicitly no AI/ML, and patients search doctors using it.

Goal: disease-to-specialization lookup and doctor search. Stories: US-007 (admin maintains the static disease/symptom-to-specialization mapping, explicitly no AI, LLM or ML involved in matching), US-008 (patients search doctors by disease, symptom or specialization using that mapping).

**Related:** US-007, US-008

### EPIC-004 · approved · source: planning:EPIC-004

Doctors define recurring weekly working hours plus time off/exceptions; the system generates bookable slots of a fixed default duration and hides already-booked slots.

Goal: doctor availability and slot generation. Availability reflects current bookings on page load/refresh (no live push -- not real-time push updates). Stories: US-009 (recurring weekly availability), US-010 (time off and exception dates), US-011 (automatic bookable slot generation, hiding booked slots).

**Related:** US-009, US-010, US-011

### EPIC-005 · approved · source: planning:EPIC-005

Patients book, reschedule and cancel their own in-person appointments, with server-side transactional slot locking preventing double booking.

Goal: appointment booking, reschedule and cancellation. Statuses include booked, confirmed, completed, cancelled, no-show. Stories: US-012 (book an appointment, critical), US-013 (prevent double booking via transactional slot locking, critical), US-014 (reschedule own appointment), US-015 (cancel own appointment).

**Related:** US-012, US-013, US-014, US-015

### EPIC-006 · approved · source: planning:EPIC-006

Doctors view their scheduled appointments and update appointment status as visits occur.

Goal: doctor appointment management and status. Stories: US-016 (view scheduled appointments, filterable by date/status), US-017 (update appointment status through booked/confirmed/completed/cancelled/no-show).

**Related:** US-016, US-017

### EPIC-007 · approved · source: planning:EPIC-007

Doctors maintain consultation records -- notes, diagnosis and prescription text -- linked to the patient and appointment; patients can view their own records.

Goal: consultation records. Assumption recorded: optional file attachments described in earlier understanding depend on a file-storage service out of scope for this MVP tier, so attachments are excluded in this version; records hold text content only. Stories: US-018 (doctor creates/updates consultation record), US-019 (patient views own consultation records only).

**Related:** US-018, US-019

### EPIC-008 · approved · source: planning:EPIC-008

A basic admin dashboard to manage doctors, specializations, disease mappings and appointments, plus a front-desk flow to create patients and book on their behalf.

Goal: admin dashboard and booking on behalf. Stories: US-020 (dashboard overview and navigation, filterable appointments view), US-021 (create patient record and book appointment on their behalf), US-022 (admin reschedule/cancel any appointment).

**Related:** US-020, US-021, US-022

### EPIC-009 · approved · source: planning:EPIC-009

Health data is treated as sensitive under India's DPDP Act 2023, requiring role-restricted access, encryption in transit and at rest, an audit trail on record access/changes, and no cross-border transfer.

Goal: data protection, audit and residency (DPDP). Assumption recorded: appointment confirmations/reminders/change notices described in earlier understanding depend on email and SMS providers out of scope for this MVP tier; at this version these are surfaced in-app (on-screen status and confirmations) rather than sent by email or SMS. Stories: US-023 (encryption and in-country storage, critical), US-024 (audit trail on record access and changes), US-025 (in-app appointment confirmation and status visibility).

**Related:** US-023, US-024, US-025

### SPRINT-1 · draft · source: planning:Sprint 1

Stand up patient/doctor/admin accounts: registration, login/logout, secure password and session handling, and role-based access enforcement.

Sprint 1, capacity 20. Goal: stand up patient/doctor/admin accounts -- registration, login/logout, secure password+session handling, and role-based access enforcement. Items aligning with this goal: US-001 (5 pts, backend-agent), US-002 (5 pts, backend-agent), US-003 (3 pts, security-agent), US-004 (5 pts, security-agent) -- total 18 of 20 points. Plan status: generated, version 1 (not yet marked approved).

**Related:** EPIC-001, US-001, US-002, US-003, US-004

### SPRINT-2 · draft · source: planning:Sprint 2

Build clinic master data -- specializations, doctor records, doctor weekly availability -- and lock in the DPDP encryption/in-country hosting baseline.

Sprint 2, capacity 20. Goal: build clinic master data (specializations, doctor records, doctor weekly availability) and lock in DPDP encryption/in-country hosting baseline. Items aligning with this goal: US-005 (3 pts, backend-agent), US-006 (5 pts, backend-agent), US-009 (5 pts, backend-agent), US-023 (5 pts, devops-agent) -- total 18 of 20 points. Plan status: generated, version 1.

**Related:** EPIC-002, US-005, US-006, US-009, US-023

### SPRINT-3 · draft · source: planning:Sprint 3

Add disease-to-specialization mappings, patient doctor search, doctor time-off handling, and the admin dashboard shell.

Sprint 3, capacity 20. Goal: add disease-to-specialization mappings, patient doctor search, doctor time-off handling, and the admin dashboard shell. Items aligning with this goal: US-007 (3 pts, backend-agent), US-008 (5 pts, backend-agent), US-010 (5 pts, backend-agent), US-020 (5 pts, frontend-agent) -- total 18 of 20 points. Plan status: generated, version 1.

**Related:** EPIC-003, US-007, US-008, US-010, US-020

### SPRINT-4 · draft · source: planning:Sprint 4

Deliver automatic slot generation and transactionally-locked appointment booking, plus cancellation.

Sprint 4, capacity 20. Goal: deliver automatic slot generation and transactionally-locked appointment booking, plus cancellation. Items aligning with this goal: US-011 (8 pts, backend-agent) with tasks US-011-T1 (slot-generation service), US-011-T2 (GET /doctors/{id}/slots endpoint), US-011-T3 (exclude booked slots), US-011-T4 (patient-facing slot picker, frontend-agent); US-012 (8 pts, backend-agent) with tasks US-012-T1 (transactional slot-locking), US-012-T2 (POST /appointments endpoint), US-012-T3 (booking confirmation UI, frontend-agent), US-012-T4 (concurrency tests, qa-agent); US-015 (3 pts, backend-agent, cancellation). Story points alone (19) exceed capacity 20 once task effort is added, which is not itemized in the plan input. Plan status: generated, version 1.

**Related:** EPIC-004, EPIC-005, US-011, US-011-T1, US-011-T2, US-011-T3, US-011-T4, US-012, US-012-T1, US-012-T2, US-012-T3, US-012-T4, US-015

### SPRINT-5 · draft · source: planning:Sprint 5

Harden double-booking prevention, add reschedule, doctor appointment views and status updates, and admin-initiated reschedule/cancel.

Sprint 5, capacity 20. Goal: harden double-booking prevention, add reschedule, doctor appointment views and status updates, and admin-initiated reschedule/cancel. Items aligning with this goal: US-013 (5 pts, backend-agent), US-014 (5 pts, backend-agent), US-016 (3 pts, frontend-agent), US-017 (3 pts, backend-agent), US-022 (3 pts, backend-agent) -- total 19 of 20 points. Plan status: generated, version 1.

**Related:** EPIC-005, EPIC-006, EPIC-008, US-013, US-014, US-016, US-017, US-022

### SPRINT-6 · draft · source: planning:Sprint 6

Ship consultation records, patient record viewing, admin create-and-book-on-behalf, the audit trail, and in-app confirmations.

Sprint 6, capacity 20. Goal: ship consultation records, patient record viewing, admin create-and-book-on-behalf, the audit trail, and in-app confirmations. Items aligning with this goal: US-018 (5 pts, backend-agent), US-019 (3 pts, frontend-agent), US-021 (5 pts, backend-agent), US-024 (5 pts, security-agent), US-025 (2 pts, frontend-agent) -- total 20 of 20 points. Plan status: generated, version 1.

**Related:** EPIC-007, EPIC-008, EPIC-009, US-018, US-019, US-021, US-024, US-025
<!-- sdlc:auto:end narrative -->
