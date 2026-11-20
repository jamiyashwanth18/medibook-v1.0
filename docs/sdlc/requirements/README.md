# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:technology-stack

Technology stack approved by the product owner; design must use exactly these, no substitutions.

- Backend: FastAPI 0.115 — chosen so role-based access and an access audit trail are straightforward to enforce on every request, and it sits cleanly on PostgreSQL where transactional slot locking happens.
- Cloud: AWS (ap-south-1 Mumbai region) — keeps database, file storage and application in-country for DPDP Act compliance; provides managed PostgreSQL, encrypted storage and audit logging as managed services.
- Database: PostgreSQL 16 — transactional locking guarantees one slot holds one appointment under concurrent booking attempts; stores structured clinical records with encryption at rest and audit trail support; runs in AWS Mumbai region.
- Frontend: React 19 — single responsive codebase serving patients (phone), doctors (daily schedule) and admins (dashboard) with interactive screens (slot picker, availability calendar); native mobile apps were ruled out.

**Related:** NFR-005, NFR-007, NFR-008

### REQ-SERVICES · approved · source: requirements:services

AWS-managed services are used for the data and audit layer; previously suggested third-party messaging/storage/queue services were removed from the stack and are out of scope.

- In use (via AWS managed services): managed PostgreSQL, encrypted storage, audit logging — all within the ap-south-1 (Mumbai) region.
- Removed from stack / out of scope: Email (SendGrid was suggested, then removed), SMS (MSG91 was suggested, then removed), File storage (Amazon S3 was suggested, then removed), Queue (Redis as a queue was suggested, then removed).
- Consequence: no email/SMS notifications are dispatched (confirmations are in-app only, NFR-012), and no file attachments are supported on consultation records.

**Related:** NFR-007, NFR-008, NFR-012

### REQ-SCOPE · approved · source: requirements:scope

Delivery scope is lightweight (v1). In-scope capabilities cover accounts, search, booking, doctor schedules and a basic admin dashboard; several capabilities are explicitly excluded from this version.

In scope: Patient self-registration and login; doctor and specialization records; disease-to-specialization lookup; search doctors by disease/symptom/specialization; doctor availability setup (recurring weekly hours and time off); automatic bookable slot generation; appointment booking with booked slots hidden; view/reschedule/cancel own appointments; double-booking prevention via transactional slot locking; basic admin dashboard; patient self-registration by email or phone; fixed default appointment slot duration.
Out of scope — do not design or build: AI/LLM/ML-based symptom analysis or doctor recommendation; online payments/payment gateway; video/telehealth consultations (built-in or external links); native iOS/Android mobile apps; Email (SendGrid removed); SMS (MSG91 removed); File storage (Amazon S3 removed); Queue (Redis removed).

### REQ-FEAT-SIGNIN · approved · source: requirements:Sign-in & accounts

Covers patient self-registration, login/logout, and role-based access enforcement across patient, doctor and admin areas.

- Patient self-registration: prospective patients create an account with name, a unique email or phone number, and a password; rejected (with reason shown) if the identifier is already in use or the password fails strength rules.
- Log in and log out: patients, doctors and admins log in with email/phone and password and are routed to their role's area; can log out to end the session.
- Role-based access: each role can reach only pages/actions it is permitted; patients/doctors/admins confined to their own areas; anyone not logged in is directed to log in.

### REQ-FEAT-FINDING-DOCTOR · approved · source: requirements:Finding a doctor

Patients search for doctors by disease, symptom or specialization using an admin-maintained static lookup.

- Search for doctors: disease/symptom terms are matched via the admin-maintained lookup to specializations, showing active doctors in those specializations; direct specialization search also supported; a clear 'no matching doctors found' message appears when nothing matches.

### REQ-FEAT-BOOKING · approved · source: requirements:Booking appointments

Covers viewing available slots, booking, rescheduling, cancelling, and viewing one's own appointments with confirmations.

- View available slots: bookable slots of a fixed default duration are generated from a doctor's recurring hours and time off; already-booked slots are hidden; list reflects current bookings on load/refresh.
- Book an appointment: booking an available slot creates an appointment with status 'booked' and removes the slot from availability; transactional slot locking ensures only one appointment can hold a slot, preventing two patients booking the same slot.
- Reschedule an appointment: moves an upcoming appointment to another available slot, releasing the old slot and removing the new one from availability; rejected with a re-pick prompt if the chosen slot was just taken.
- Cancel an appointment: sets status to cancelled and releases the slot; already completed or cancelled appointments cannot be cancelled.
- My appointments and confirmations: patients see date, time, doctor and current status for their appointments, with an on-screen confirmation on every book/reschedule/cancel action.

### REQ-FEAT-DOCTOR-SCHEDULE · approved · source: requirements:Doctor's schedule

Covers doctor-side schedule management: weekly availability, time off, viewing appointments, status updates and consultation notes.

- Set weekly availability: doctors define recurring weekly working hours used to generate future slots; overlapping/invalid ranges rejected with a clear message; changes apply to future slots only, not already-booked appointments.
- Add time off and exceptions: doctors mark dates/ranges as time off so no slots are generated then; if time off overlaps existing booked appointments, the doctor is warned of conflicts.
- View scheduled appointments: doctors view upcoming/past appointments with patient, date, time, status; can filter by date or status.
- Update appointment status: doctors change status among booked, confirmed, completed, cancelled, no-show; new status visible to patient and admin; cancelling releases the slot.
- Record consultation notes: doctors record and later edit visit notes, diagnosis and prescription text linked to patient and appointment; text content only; changes captured in the audit trail.

### REQ-FEAT-HEALTH-RECORDS · approved · source: requirements:My health records

Patients can view their own consultation records only.

- View my consultation records: patients open their own consultation records to see notes, diagnosis and prescription text; cannot access any other patient's records.

### REQ-FEAT-ADMIN · approved · source: requirements:Admin dashboard

Covers the admin dashboard: managing specializations, doctors, disease mappings, appointments, front-desk booking and the audit trail review.

- Manage specializations: create/edit/deactivate with unique names; deactivated specializations stop appearing in new selections but existing links are preserved; duplicate names rejected.
- Manage doctor records: create/maintain profiles with name, contact details and at least one specialization; deactivating a doctor removes them from patient search and stops new bookings; specialization changes feed search/matching.
- Maintain disease mappings: maintain predefined lookup mapping disease/symptom terms to one or more specializations, used by patient search; static lookup only, no AI/LLM/ML.
- Dashboard overview: navigate to doctors, specializations, disease mappings and appointments; filter appointments by doctor, patient, date or status.
- Create patient and book on behalf: admins/front-desk create a patient record (name + email or phone) and book an available slot for them; rejected if slot was just taken.
- Manage any appointment: admins reschedule or cancel any patient's appointment, releasing the old slot and reserving the new one.
- Review audit trail: admins review who viewed, created or changed consultation records and when.

### NFR-001 · approved · source: requirements:NFR-001

[security] Passwords stored only as a salted hash.

Account passwords are stored only as a salted hash, never in plain text or any recoverable form.

### NFR-002 · approved · source: requirements:NFR-002

[security] Sessions expire and end on logout or deactivation.

A logged-in session ends when it passes its inactivity or maximum-lifetime limit, when the user logs out, or when an admin deactivates the account; after that, protected pages and APIs can no longer be reached and the user must log in again.

### NFR-003 · approved · source: requirements:NFR-003

[security] Login hides which credential was wrong.

When a login attempt fails, access is denied without indicating whether the identifier or the password was incorrect.

### NFR-004 · approved · source: requirements:NFR-004

[security] Minimum password strength at registration.

Registration is rejected if the chosen password does not meet the minimum strength rules, and those rules are shown to the user.

### NFR-005 · approved · source: requirements:NFR-005

[security] Role-based access on every protected page and API.

Every protected page and API enforces the user's role: patients cannot reach doctor-only or admin-only areas, doctors cannot reach the admin dashboard or another doctor's records, and users who are not logged in are denied access and sent to log in.

### NFR-006 · approved · source: requirements:NFR-006

[privacy] Consultation records visible only to authorised people.

A patient's consultation records are accessible only to that patient, their treating doctor and admins; a patient attempting to open another patient's records is denied.

### NFR-007 · approved · source: requirements:NFR-007

[security] Health data encrypted in transit and at rest.

Patient and consultation data is encrypted in transit between the browser and the server and encrypted at rest in the database.

### NFR-008 · approved · source: requirements:NFR-008

[compliance] Health data kept in-country with no cross-border transfer.

DPDP Act 2023: data residency control — all health data is stored and processed in an India region (AWS ap-south-1) with no cross-border transfer.

### NFR-009 · approved · source: requirements:NFR-009

[compliance] Audit trail on consultation record access and changes.

DPDP Act 2023: audit controls — each time a consultation record is viewed, created or changed, an audit entry records who did it, which record it was and when; admins can review these access and change entries.

### NFR-010 · approved · source: requirements:NFR-010

[compatibility] Responsive web app on phone and desktop.

The product is delivered as a single responsive web app that adapts from phone to desktop so patients booking on phones, doctors managing their day and admins on a dashboard can all use it.

### NFR-011 · approved · source: requirements:NFR-011

[usability] (accepted risk) Availability refreshes on load, not live push.

Shown availability reflects current bookings only when the page loads or is refreshed; live push updates of slot changes are not provided in this version.

### NFR-012 · approved · source: requirements:NFR-012

[usability] (accepted risk) Confirmations shown in-app only.

Appointment confirmations, reminders and change notices are surfaced in the app only; no email or SMS is dispatched in this version.

### NFR-013 · approved · source: requirements:NFR-013

[scalability] (accepted risk) Sized for a single clinic.

The system is built for a single clinic's volume; larger-scale or multi-clinic capacity is not a requirement for this version.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-20

**Capabilities in scope:** Patient self-registration and login, Doctor and specialization records, Disease-to-specialization lookup, Search doctors by disease, symptom or specialization, Doctor availability setup (recurring weekly hours and time off), Automatic bookable slot generation, Appointment booking with booked slots hidden, View, reschedule and cancel own appointments, Double-booking prevention via transactional slot locking, Basic admin dashboard, Patient self-registration by email or phone, Fixed default appointment slot duration

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The heart of this product is correct booking: generating slots from doctor availability and holding a slot for exactly one appointment under transactional locking. FastAPI sits cleanly on top of PostgreSQL where that locking happens, and its structure makes role-based access (patient vs doctor vs admin) and an access audit trail straightforward to enforce on every request — both DPDP requirements you named. It is quick to build with and fast enough many times over for a single clinic. |
| cloud | AWS | The one hard infrastructure requirement you set is that health data stays inside India, and AWS runs a Mumbai region (ap-south-1) that keeps the database, file storage and application all in-country, satisfying the DPDP Act's no-cross-border rule. It also provides managed PostgreSQL, encrypted file storage and audit logging as off-the-shelf services, so the clinic isn't maintaining servers by hand. |
| database | PostgreSQL | You explicitly need double-booking to be impossible, and PostgreSQL's transactional locking is precisely the mechanism that guarantees one slot holds one appointment even when two patients tap 'book' at the same instant. It also stores your structured records cleanly — doctors, specializations, disease mappings, appointments, consultation notes — supports encryption at rest for sensitive health data, and keeps an audit trail reliably. It runs in AWS's Mumbai region so your data stays in-country as the DPDP Act requires. |
| frontend | React | Your three audiences — patients booking on their phones, doctors managing a daily schedule, and admins running a dashboard — all live inside one responsive web app, and React handles exactly this: a single codebase that adapts from phone to desktop with rich, interactive screens like a live slot picker and an availability calendar. Because you ruled out native mobile apps, a responsive React site is the one place all three roles meet, and its large talent pool makes the clinic easy to support long term. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Accounts, Authentication and Role-Based Access

Patient self-registration by email or phone, login, and role-based access for patients, doctors and administrators. Sessions and credentials are handled as checkable security outcomes. Assumption: email/password plus role-based auth, hosted in an India region to keep data in-country.

### US-001: Patient self-registration

**Priority:** high

> As a prospective patient, I want to register for an account using my email or phone number, so that I can log in and book appointments myself.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the registration page | I submit a valid name, a unique email or phone number, and a password | my patient account is created and I can log in |
| AC-002 | I enter an email or phone number already registered | I submit the registration form | registration is rejected and I am told the identifier is already in use |
| AC-003 | I submit a password that does not meet the minimum strength rules | I submit the registration form | registration is rejected and the password rules are shown |

### US-002: Login and logout

**Priority:** high

> As a registered user (patient, doctor or admin), I want to log in with my credentials and log out when finished, so that my account and health data stay protected.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have a valid account | I log in with the correct email/phone and password | I am taken to the area for my role (patient, doctor or admin) |
| AC-005 | I enter an incorrect password | I attempt to log in | access is denied and no indication is given of which field was wrong |
| AC-006 | I am logged in | I choose to log out | my session ends and I must log in again to access any protected page |

### US-003: Password stored and sessions expire safely

**Priority:** high

> As a user, I want my password stored securely and my session to end when it should, so that a left-open or stolen session cannot be misused.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | an account exists | its password is stored | it is stored only as a salted hash and never in plain text or recoverable form |
| AC-008 | I am logged in | my session passes its inactivity or maximum lifetime limit | the session expires and I must authenticate again |
| AC-009 | my account is deactivated by an admin | the deactivation takes effect | any active sessions for that account can no longer access protected pages |

### US-004: Role-based access enforcement

**Priority:** critical

> As a clinic operator, I want each role to see and do only what its role permits, so that patient health data is not exposed to the wrong people.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am logged in as a patient | I attempt to open a doctor-only or admin-only page or API | access is denied |
| AC-011 | I am logged in as a doctor | I attempt to open the admin dashboard or another doctor's records | access is denied |
| AC-012 | a user is not logged in | they request any protected page or API | access is denied and they are directed to log in |

## EPIC-002: Doctor and Specialization Records

Admins maintain the clinic's doctors and the list of specializations. All doctors are internal staff of the single clinic.

### US-005: Manage specializations

**Priority:** high

> As a administrator, I want to create, edit and deactivate specializations, so that doctors and disease mappings can be tied to an accurate list.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I am on the admin specializations page | I add a specialization with a unique name | it is saved and available to assign to doctors and disease mappings |
| AC-014 | a specialization is in use by a doctor or mapping | I deactivate it | it stops appearing in new selections but existing links are preserved |
| AC-015 | I enter a specialization name that already exists | I save it | the save is rejected as a duplicate |

### US-006: Manage doctor records

**Priority:** high

> As a administrator, I want to create and maintain doctor profiles with their specialization, so that patients can find and book the right doctors.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am on the admin doctors page | I create a doctor with name, contact details and at least one specialization | the doctor record is saved and can be scheduled and searched |
| AC-017 | a doctor leaves the clinic | I deactivate their record | they no longer appear in patient search and no new slots are bookable for them |
| AC-018 | I edit a doctor's specialization | I save the change | the updated specialization is used in search and disease-to-specialization matching |

## EPIC-003: Disease-to-Specialization Lookup and Doctor Search

A predefined, admin-maintained static lookup maps diseases/symptoms to specializations (explicitly no AI/ML). Patients search for doctors by disease, symptom or specialization.

### US-007: Maintain disease-to-specialization mappings

**Priority:** high

> As a administrator, I want to maintain a predefined lookup from diseases/symptoms to specializations, so that patients are routed to the correct type of doctor without any AI/ML.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | I am on the admin mappings page | I map a disease or symptom term to one or more specializations | the mapping is saved and used by patient search |
| AC-020 | a mapping already exists for a disease/symptom term | I edit or remove it | the change is reflected in subsequent patient searches |
| AC-021 | the matching logic runs | a patient searches by disease or symptom | results are derived solely from the static lookup with no AI, LLM or ML involved |

### US-008: Search doctors by disease, symptom or specialization

**Priority:** high

> As a patient, I want to search for doctors by disease, symptom or specialization, so that I can find a relevant available doctor to book.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | I enter a disease or symptom that exists in the lookup | I search | I see active doctors in the mapped specialization(s) |
| AC-023 | I search directly by a specialization | I submit the search | I see active doctors in that specialization |
| AC-024 | I search a term with no mapping and no matching specialization | I submit the search | I see a clear 'no matching doctors found' message |

## EPIC-004: Doctor Availability and Slot Generation

Doctors define recurring weekly working hours plus time off/exceptions. The system generates bookable slots of a fixed default duration and hides already-booked slots. Availability reflects current bookings on page load/refresh (no live push).

### US-009: Set recurring weekly availability

**Priority:** high

> As a doctor, I want to define my recurring weekly working hours, so that the system can generate the slots patients can book.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | I am on my availability page | I set working hours for days of the week | my recurring availability is saved and used to generate future slots |
| AC-026 | I enter overlapping or invalid time ranges for a day | I save | the save is rejected with a clear validation message |
| AC-027 | I update my weekly hours | I save the change | future slot generation reflects the new hours without affecting already-booked appointments |

### US-010: Add time off and exceptions

**Priority:** high

> As a doctor, I want to add time off and exception dates to my schedule, so that patients cannot book me when I am unavailable.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I mark a date or range as time off | I save it | no bookable slots are generated for that period |
| AC-029 | I add time off that overlaps existing booked appointments | I save | I am warned about the conflicting booked appointments so they can be addressed |

### US-011: Automatic bookable slot generation

**Priority:** high

> As a patient, I want to see available time slots generated from a doctor's availability, so that I can pick a specific time to book.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | a doctor has recurring hours and no conflicting time off | I view that doctor's availability | I see bookable slots of the fixed default duration within their working hours |
| AC-031 | a slot is already booked | I view the doctor's availability | that slot is hidden from the bookable list |
| AC-032 | another patient books a slot and I refresh the page | availability reloads | the newly booked slot no longer appears as available |

## EPIC-005: Appointment Booking, Reschedule and Cancellation

Patients book, reschedule and cancel their own in-person appointments. Server-side transactional slot locking prevents double booking. Statuses include booked, confirmed, completed, cancelled, no-show.

### US-012: Book an appointment

**Priority:** critical

> As a patient, I want to book an available slot with a chosen doctor, so that I have a confirmed in-person appointment time.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | I have selected an available slot | I confirm the booking | an appointment is created with status 'booked' and the slot is removed from availability |
| AC-034 | I view my account after booking | I open my appointments list | the new appointment appears with its date, time, doctor and status |

### US-013: Prevent double booking

**Priority:** critical

> As a clinic operator, I want a slot to be held by only one appointment, so that two patients can never be booked into the same slot.

| ID | Given | When | Then |
|---|---|---|---|
| AC-035 | two patients attempt to book the same slot at the same time | the bookings are processed | server-side transactional slot locking lets only one succeed and the other is told the slot is no longer available |
| AC-036 | a slot has just been booked | any further booking attempt for that same slot is submitted | it is rejected because the slot is taken |

### US-014: Reschedule own appointment

**Priority:** high

> As a patient, I want to reschedule my appointment to another available slot, so that I can adjust to a time that suits me.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | I have an upcoming appointment | I select a different available slot and confirm | the appointment moves to the new slot, the old slot becomes available again, and the new slot is removed from availability |
| AC-038 | I try to reschedule into a slot that was just taken | I confirm | the reschedule is rejected and I am asked to pick another slot |

### US-015: Cancel own appointment

**Priority:** high

> As a patient, I want to cancel an appointment I no longer need, so that the slot is freed and my record is accurate.

| ID | Given | When | Then |
|---|---|---|---|
| AC-039 | I have an upcoming appointment | I cancel it | its status becomes 'cancelled' and the slot is released back to availability |
| AC-040 | an appointment is already completed or cancelled | I attempt to cancel it | the action is not permitted |

## EPIC-006: Doctor Appointment Management and Status

Doctors view their scheduled appointments and update appointment status through booked/confirmed/completed/cancelled/no-show.

### US-016: View scheduled appointments

**Priority:** high

> As a doctor, I want to view my scheduled appointments, so that I know who I am seeing and when.

| ID | Given | When | Then |
|---|---|---|---|
| AC-041 | I am logged in as a doctor | I open my appointments view | I see my upcoming and past appointments with patient, date, time and current status |
| AC-042 | I view my appointments | I filter by date or status | only matching appointments are shown |

### US-017: Update appointment status

**Priority:** high

> As a doctor, I want to update the status of an appointment, so that the record reflects what actually happened.

| ID | Given | When | Then |
|---|---|---|---|
| AC-043 | I have an appointment with status 'booked' | I change its status to confirmed, completed, cancelled or no-show | the new status is saved and visible to the patient and admin |
| AC-044 | an appointment is cancelled | I mark it so | its slot is released back to availability |

## EPIC-007: Consultation Records

Doctors maintain consultation records holding visit notes, diagnosis and prescription text, linked to the patient and appointment. Assumption: optional file attachments described in the understanding depend on a file-storage service that is out of scope at this MVP tier, so attachments are excluded in this version; records hold text content only.

### US-018: Create and update a consultation record

**Priority:** high

> As a doctor, I want to record notes, diagnosis and prescription text for a visit, so that there is an accurate clinical record linked to the appointment.

| ID | Given | When | Then |
|---|---|---|---|
| AC-045 | I am viewing one of my appointments | I enter notes, diagnosis and prescription text and save | a consultation record is created and linked to that patient and appointment |
| AC-046 | a consultation record exists | I edit its content and save | the updated content is stored and the change is captured in the access/change audit trail |
| AC-047 | I attempt to attach a file to a consultation record | I look for an attachment option | no file attachment is available because file storage is out of scope for this version (text content only) |

### US-019: Patient views own consultation records

**Priority:** medium

> As a patient, I want to view my own consultation records, so that I can see my diagnosis and prescription.

| ID | Given | When | Then |
|---|---|---|---|
| AC-048 | I am logged in as a patient | I open my records | I see only my own consultation records with notes, diagnosis and prescription text |
| AC-049 | I am a patient | I attempt to access another patient's records | access is denied |

## EPIC-008: Admin Dashboard and Booking on Behalf

A basic admin dashboard to manage doctors, specializations, disease mappings and appointments, and to create patients and book on their behalf (front-desk flow).

### US-020: Admin dashboard overview

**Priority:** high

> As a administrator, I want a dashboard to oversee doctors, specializations, mappings and appointments, so that I can run the clinic's scheduling from one place.

| ID | Given | When | Then |
|---|---|---|---|
| AC-050 | I am logged in as an admin | I open the dashboard | I can navigate to manage doctors, specializations, disease mappings and appointments |
| AC-051 | I am on the appointments view | I filter by doctor, patient, date or status | only matching appointments are shown |

### US-021: Create patient and book on their behalf

**Priority:** high

> As a administrator or front-desk user, I want to create a patient record and book an appointment for them, so that patients who call or walk in can be scheduled.

| ID | Given | When | Then |
|---|---|---|---|
| AC-052 | a patient has no account | I create their patient record with name and email or phone | the patient record is created and can be booked |
| AC-053 | I select an available slot for a patient | I confirm the booking on their behalf | an appointment is created for that patient and the slot is removed from availability |
| AC-054 | I book a slot that was just taken | I confirm | the booking is rejected because the slot is no longer available |

### US-022: Admin manage any appointment

**Priority:** medium

> As a administrator, I want to reschedule or cancel appointments on behalf of patients, so that the schedule can be corrected when patients contact the front desk.

| ID | Given | When | Then |
|---|---|---|---|
| AC-055 | an appointment exists | I reschedule it to another available slot | the appointment moves, the old slot is released and the new slot is removed from availability |
| AC-056 | an appointment exists | I cancel it | its status becomes 'cancelled' and the slot is released |

## EPIC-009: Data Protection, Audit and Residency (DPDP)

Health data is treated as sensitive under India's DPDP Act 2023: role-restricted access, encryption in transit and at rest, an audit trail on record access/changes, and no cross-border data transfer. Assumption: appointment confirmations/reminders/change notices described in the understanding depend on email and SMS providers that are out of scope at this MVP tier; at this version these are surfaced in-app (on-screen appointment status and confirmations) rather than sent by email or SMS.

### US-023: Encryption and in-country storage

**Priority:** critical

> As a clinic data controller, I want health data encrypted and kept in-country, so that we meet DPDP safeguards and avoid cross-border transfer.

| ID | Given | When | Then |
|---|---|---|---|
| AC-057 | patient and consultation data is stored | it is at rest in the database | it is encrypted at rest |
| AC-058 | data is transmitted between the browser and the server | any request is made | it is encrypted in transit |
| AC-059 | the application is hosted | data is stored or processed | it resides in an India region with no cross-border transfer |

### US-024: Audit trail on record access and changes

**Priority:** high

> As a administrator, I want an audit trail of access to and changes of consultation records, so that we can demonstrate who viewed or altered sensitive health data.

| ID | Given | When | Then |
|---|---|---|---|
| AC-060 | a user views a consultation record | the access occurs | an audit entry records who accessed which record and when |
| AC-061 | a consultation record is created or changed | the change is saved | an audit entry records who made the change and when |
| AC-062 | I am an admin | I review the audit trail | I can see access and change entries for records |

### US-025: In-app appointment confirmation and status visibility

**Priority:** medium

> As a patient, I want to see confirmation and current status of my appointments in the app, so that I know my booking, reschedule or cancellation took effect.

| ID | Given | When | Then |
|---|---|---|---|
| AC-063 | I book, reschedule or cancel an appointment | the action succeeds | an on-screen confirmation is shown and my appointments list reflects the new status |
| AC-064 | email and SMS providers are out of scope for this version | a confirmation, reminder or change notice would be sent | it is surfaced in-app only and no email or SMS is dispatched |
<!-- sdlc:auto:end epics -->
