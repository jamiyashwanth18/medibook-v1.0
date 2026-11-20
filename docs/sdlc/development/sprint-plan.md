# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up patient/doctor/admin accounts: registration, login/logout, secure password+session handling, and role-based access enforcement.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Patient self-registration | 5 | backend-agent | — |
| US-002 | Story | Login and logout | 5 | backend-agent | US-001 |
| US-003 | Story | Password stored and sessions expire safely | 3 | security-agent | US-002 |
| US-004 | Story | Role-based access enforcement | 5 | security-agent | US-002 |

## Sprint 2: Sprint 2

Build clinic master data -- specializations, doctor records, doctor weekly availability -- and lock in the DPDP encryption/in-country hosting baseline.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Manage specializations | 3 | backend-agent | US-004 |
| US-006 | Story | Manage doctor records | 5 | backend-agent | US-005 |
| US-009 | Story | Set recurring weekly availability | 5 | backend-agent | US-006 |
| US-023 | Story | Encryption and in-country storage | 5 | devops-agent | — |

## Sprint 3: Sprint 3

Add disease-to-specialization mappings, patient doctor search, doctor time-off handling, and the admin dashboard shell.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-007 | Story | Maintain disease-to-specialization mappings | 3 | backend-agent | US-005 |
| US-008 | Story | Search doctors by disease, symptom or specialization | 5 | backend-agent | US-006, US-007 |
| US-010 | Story | Add time off and exceptions | 5 | backend-agent | US-009 |
| US-020 | Story | Admin dashboard overview | 5 | frontend-agent | US-005, US-006, US-007 |

## Sprint 4: Sprint 4

Deliver automatic slot generation and transactionally-locked appointment booking, plus cancellation.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-011 | Story | Automatic bookable slot generation | 8 | backend-agent | US-009, US-010 |
| ↳ US-011-T1 | Task | Implement slot-generation service from availability rules and time off | — | backend-agent | — |
| ↳ US-011-T2 | Task | Wire GET /doctors/{id}/slots endpoint to the slot-generation service | — | backend-agent | — |
| ↳ US-011-T3 | Task | Exclude booked slots from generated availability | — | backend-agent | — |
| ↳ US-011-T4 | Task | Build patient-facing slot picker on doctor profile | — | frontend-agent | — |
| US-012 | Story | Book an appointment | 8 | backend-agent | US-011 |
| ↳ US-012-T1 | Task | Implement transactional slot-locking for appointment creation | — | backend-agent | — |
| ↳ US-012-T2 | Task | Implement POST /appointments endpoint with status 'booked' | — | backend-agent | — |
| ↳ US-012-T3 | Task | Build booking confirmation flow in patient UI | — | frontend-agent | — |
| ↳ US-012-T4 | Task | Write concurrency tests for simultaneous booking attempts | — | qa-agent | — |
| US-015 | Story | Cancel own appointment | 3 | backend-agent | US-012 |

## Sprint 5: Sprint 5

Harden double-booking prevention, add reschedule, doctor appointment views and status updates, and admin-initiated reschedule/cancel.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-013 | Story | Prevent double booking | 5 | backend-agent | US-012 |
| US-014 | Story | Reschedule own appointment | 5 | backend-agent | US-012, US-013 |
| US-016 | Story | View scheduled appointments | 3 | frontend-agent | US-012 |
| US-017 | Story | Update appointment status | 3 | backend-agent | US-012 |
| US-022 | Story | Admin manage any appointment | 3 | backend-agent | US-014, US-015 |

## Sprint 6: Sprint 6

Ship consultation records, patient record viewing, admin create-and-book-on-behalf, the audit trail, and in-app confirmations.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-018 | Story | Create and update a consultation record | 5 | backend-agent | US-012 |
| US-019 | Story | Patient views own consultation records | 3 | frontend-agent | US-018 |
| US-021 | Story | Create patient and book on their behalf | 5 | backend-agent | US-012 |
| US-024 | Story | Audit trail on record access and changes | 5 | security-agent | US-018 |
| US-025 | Story | In-app appointment confirmation and status visibility | 2 | frontend-agent | US-012, US-014, US-015 |

## Sprint 7: Fixes

Fix the findings SonarQube reported.

Capacity: 0 points · Committed: 0

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| FIX-SEC-githubactions-s7637-53fd1e3a | Story | Fix: Use full commit SHA hash for this dependency. (.github/workflows/deploy.yml) | — | devops-agent | — |
| FIX-SEC-githubactions-s6505-69f642a9 | Story | Fix: Omitting "--ignore-scripts" allows lifecycle scripts to run during package installation. (.github/workflows/deploy.yml) | — | devops-agent | — |
| FIX-SEC-githubactions-s8543-ca13026c | Story | Fix: Using dependencies without locking resolved versions is security-sensitive. (.github/workflows/deploy.yml) | — | devops-agent | — |
| FIX-SEC-docker-s8541-ea3951c1 | Story | Fix: Omitting "--only-binary :all:" can lead to the execution of setup scripts. Make sure it is safe here. (backend/Dockerfile) | — | — | — |
| FIX-SEC-docker-s8544-82cfea7f | Story | Fix: Using dependencies without locking resolved versions is security-sensitive. (backend/Dockerfile) | — | — | — |
| FIX-SEC-python-s7608-bce01fa0 | Story | Fix: Add the 'ExpectedBucketOwner' parameter to verify S3 bucket ownership. (backend/scripts/check_connections.py) | — | — | — |
| FIX-DAST-zap-10038-a3ec3827 | Story | Fix: Content Security Policy (CSP) Header Not Set | — | backend-agent | — |
| FIX-DAST-zap-10020-c96362a3 | Story | Fix: Missing Anti-clickjacking Header | — | backend-agent | — |
| FIX-A11Y-color-contrast-8d7ef0b7 | Story | Fix: Elements must meet minimum color contrast ratio thresholds | — | frontend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
