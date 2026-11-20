# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Patient self-registration by email or phone, login, and role-based access for patients, doctors and administrators, with sessions and credentials handled as checkable security outcomes.

Assumption: email/password plus role-based auth, hosted in an India region to keep data in-country.

**Related:** US-001, US-002, US-003, US-004

### EPIC-002 · approved · source: planning:EPIC-002

Admins maintain the clinic's doctors and the list of specializations; all doctors are internal staff of the single clinic.

**Related:** US-005, US-006

### EPIC-003 · approved · source: planning:EPIC-003

A predefined, admin-maintained static lookup maps diseases/symptoms to specializations (explicitly no AI/ML); patients search for doctors by disease, symptom or specialization.

**Related:** US-007, US-008

### EPIC-004 · approved · source: planning:EPIC-004

Doctors define recurring weekly working hours plus time off/exceptions; the system generates bookable slots of a fixed default duration and hides already-booked slots. Availability reflects current bookings on page load/refresh (no live push).

**Related:** US-009, US-010, US-011

### EPIC-005 · approved · source: planning:EPIC-005

Patients book, reschedule and cancel their own in-person appointments. Server-side transactional slot locking prevents double booking. Statuses include booked, confirmed, completed, cancelled, no-show.

**Related:** US-012, US-013, US-014, US-015

### EPIC-006 · approved · source: planning:EPIC-006

Doctors view their scheduled appointments and update appointment status through booked/confirmed/completed/cancelled/no-show.

**Related:** US-016, US-017

### EPIC-007 · approved · source: planning:EPIC-007

Doctors maintain consultation records holding visit notes, diagnosis and prescription text, linked to the patient and appointment.

Assumption: optional file attachments described in the understanding depend on a file-storage service that is out of scope at this MVP tier, so attachments are excluded in this version; records hold text content only.

**Related:** US-018, US-019

### EPIC-008 · approved · source: planning:EPIC-008

A basic admin dashboard to manage doctors, specializations, disease mappings and appointments, and to create patients and book on their behalf (front-desk flow).

**Related:** US-020, US-021, US-022

### EPIC-009 · approved · source: planning:EPIC-009

Health data is treated as sensitive under India's DPDP Act 2023: role-restricted access, encryption in transit and at rest, an audit trail on record access/changes, and no cross-border data transfer.

Assumption: appointment confirmations/reminders/change notices described in the understanding depend on email and SMS providers that are out of scope at this MVP tier; at this version these are surfaced in-app (on-screen appointment status and confirmations) rather than sent by email or SMS.

**Related:** US-023, US-024, US-025
<!-- sdlc:auto:end narrative -->
