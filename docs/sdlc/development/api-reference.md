# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /appointments | get_appointments | `backend/app/routers/api.py:329` | List appointments scoped by role: patient sees own, doctor sees own schedule, admin sees all; supports filters. |
| POST | /appointments | post_appointments | `backend/app/routers/api.py:323` | Book an available slot under transactional locking; patient or admin-on-behalf. |
| DELETE | /appointments/{id} | delete_appointments_by_id | `backend/app/routers/api.py:347` | Cancel an upcoming appointment, releasing the slot; completed/cancelled cannot be cancelled. |
| PATCH | /appointments/{id}/reschedule | patch_appointments_by_id_reschedule | `backend/app/routers/api.py:335` | Move appointment to a new available slot; old slot freed, new locked. |
| PATCH | /appointments/{id}/status | patch_appointments_by_id_status | `backend/app/routers/api.py:341` | Doctor updates status among booked/confirmed/completed/cancelled/no-show; cancel releases slot. |
| GET | /audit-logs | get_audit_logs | `backend/app/routers/api.py:383` | Admin reviews access and change entries for consultation records, newest first. |
| POST | /auth/login | post_auth_login | `backend/app/routers/api.py:101` | — |
| POST | /auth/logout | post_auth_logout | `backend/app/routers/api.py:145` | Revoke the current session server-side. |
| GET | /auth/me | get_auth_me | `backend/app/routers/api.py:153` | Return the current user profile and role. |
| POST | /auth/register | post_auth_register | `backend/app/routers/api.py:69` | Patient self-registration with name and unique email or phone and a password meeting strength rules. |
| POST | /consultation-records | post_consultation_records | `backend/app/routers/api.py:359` | Treating doctor creates a text-only consultation record linked to an appointment; change audited. |
| GET | /consultation-records/{id} | get_consultation_records_by_id | `backend/app/routers/api.py:371` | View a record; access audited. Patient sees only own, treating doctor and admin permitted. |
| PATCH | /consultation-records/{id} | patch_consultation_records_by_id | `backend/app/routers/api.py:365` | Edit consultation record text; change captured in audit trail. |
| GET | /disease-mappings | get_disease_mappings | `backend/app/routers/api.py:270` | List disease/symptom-to-specialization mappings. |
| POST | /disease-mappings | post_disease_mappings | `backend/app/routers/api.py:276` | Map a disease/symptom term to one or more specializations. |
| PATCH | /disease-mappings/{id} | patch_disease_mappings_by_id | `backend/app/routers/api.py:282` | Edit or remove a mapping; reflected in subsequent searches. |
| POST | /doctors | post_doctors | `backend/app/routers/api.py:194` | Create a doctor with name, contact and at least one specialization, and the |
| GET | /doctors/search | get_doctors_search | `backend/app/routers/api.py:264` | Search active doctors by disease, symptom or specialization via the static lookup. |
| PATCH | /doctors/{id} | patch_doctors_by_id | `backend/app/routers/api.py:233` | — |
| PUT | /doctors/{id}/availability | put_doctors_by_id_availability | `backend/app/routers/api.py:288` | Set recurring weekly working hours; overlapping/invalid ranges rejected. |
| GET | /doctors/{id}/slots | get_doctors_by_id_slots | `backend/app/routers/api.py:317` | Bookable fixed-duration slots computed from rules minus time off minus booked appointments. |
| POST | /doctors/{id}/time-off | post_doctors_by_id_time_off | `backend/app/routers/api.py:311` | Add time off/exception range; warns if it overlaps booked appointments. |
| GET | /health | health | `backend/app/main.py:87` | Liveness probe, and the only route here that is not a stub. |
| GET | /me/consultation-records | get_me_consultation_records | `backend/app/routers/api.py:377` | Patient lists only their own consultation records. |
| POST | /patients | post_patients | `backend/app/routers/api.py:353` | Admin/front-desk creates a patient record (no login) with name and email or phone. |
| GET | /specializations | get_specializations | `backend/app/routers/api.py:159` | List specializations (active for selection flows). |
| POST | /specializations | post_specializations | `backend/app/routers/api.py:165` | — |
| PATCH | /specializations/{id} | patch_specializations_by_id | `backend/app/routers/api.py:188` | Edit or deactivate a specialization; existing links preserved. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
_Code matches the designed API._
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `30c6162`
<!-- sdlc:auto:end source -->
