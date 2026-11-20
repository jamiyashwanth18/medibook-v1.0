# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Patient self-registration | US-001 | 1 | POST /auth/register, api, db, patients, spa, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Login and logout | US-002 | 1 | GET /auth/me, POST /auth/login, POST /auth/logout, api, db, sessions, spa, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Password stored and sessions expire safely | US-003 | 1 | api, db, sessions, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-001 | Role-based access enforcement | US-004 | 1 | api, spa, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | Manage specializations | US-005 | 2 | GET /specializations, PATCH /specializations/{id}, POST /specializations, api, db, spa, specializations | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | Manage doctor records | US-006 | 2 | PATCH /doctors/{id}, POST /doctors, api, db, doctor_specializations, doctors, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-007 | EPIC-003 | Maintain disease-to-specialization mappings | US-007 | 3 | GET /disease-mappings, PATCH /disease-mappings/{id}, POST /disease-mappings, api, db, disease_mapping_specializations, disease_mappings, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-003 | Search doctors by disease, symptom or specialization | US-008 | 3 | GET /doctors/search, api, db, disease_mappings, doctors, spa, specializations | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-004 | Set recurring weekly availability | US-009 | 2 | PUT /doctors/{id}/availability, api, availability_rules, db, doctors, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-004 | Add time off and exceptions | US-010 | 3 | POST /doctors/{id}/time-off, api, appointments, db, spa, time_off | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-004 | Automatic bookable slot generation | US-011, US-011-T1, US-011-T2, US-011-T3, US-011-T4 | 4 | GET /doctors/{id}/slots, api, appointments, availability_rules, db, spa, time_off | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-012 | EPIC-005 | Book an appointment | US-012, US-012-T1, US-012-T2, US-012-T3, US-012-T4 | 4 | GET /appointments, POST /appointments, api, appointments, db, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-005 | Prevent double booking | US-013 | 5 | POST /appointments, api, appointments, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-005 | Reschedule own appointment | US-014 | 5 | PATCH /appointments/{id}/reschedule, api, appointments, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-015 | EPIC-005 | Cancel own appointment | US-015 | 4 | DELETE /appointments/{id}, api, appointments, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-006 | View scheduled appointments | US-016 | 5 | GET /appointments, api, appointments, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-006 | Update appointment status | US-017 | 5 | PATCH /appointments/{id}/status, api, appointments, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-018 | EPIC-007 | Create and update a consultation record | US-018 | 6 | GET /consultation-records/{id}, PATCH /consultation-records/{id}, POST /consultation-records, api, consultation_records, db, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-019 | EPIC-007 | Patient views own consultation records | US-019 | 6 | GET /me/consultation-records, api, consultation_records, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-020 | EPIC-008 | Admin dashboard overview | US-020 | 3 | GET /appointments, api, appointments, disease_mappings, doctors, spa, specializations | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-021 | EPIC-008 | Create patient and book on their behalf | US-021 | 6 | POST /appointments, POST /patients, api, appointments, db, patients, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-022 | EPIC-008 | Admin manage any appointment | US-022 | 5 | DELETE /appointments/{id}, PATCH /appointments/{id}/reschedule, api, appointments, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-023 | EPIC-009 | Encryption and in-country storage | US-023 | 2 | api, db | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-024 | EPIC-009 | Audit trail on record access and changes | US-024 | 6 | GET /audit-logs, api, audit_logs, consultation_records, db, spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-025 | EPIC-009 | In-app appointment confirmation and status visibility | US-025 | 6 | appointments, spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
