# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
114 tests · Passed 105 · Failed 8 · Skipped 1 · Not run 0

Acceptance criteria covered: 12/64 · passing: 4/64
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-001: Patient self-registration

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-008 | RequireAuth > [AC-008] redirects an unauthenticated visitor to login | Unit | Passed | `frontend/src/lib/auth.test.tsx` |
| AC-010 | RequireAuth > [AC-010] lets a patient into a patient-only route | Unit | Passed | `frontend/src/lib/auth.test.tsx` |
| AC-011 | RequireAuth > [AC-011] denies a patient reaching a doctor-only route | Unit | Passed | `frontend/src/lib/auth.test.tsx` |
| AC-012 | RequireAuth > [AC-012] a 401 on a protected call clears the token and sends the user back to login | Unit | Passed | `frontend/src/lib/auth.test.tsx` |
| AC-001 | Login screen > [AC-001] on 201 the registration form switches to sign-in | Unit | Passed | `frontend/src/screens/Login.test.tsx` |
| AC-002 | Login screen > [AC-002] a 409 on register keeps the entered data and shows an inline message | Unit | Passed | `frontend/src/screens/Login.test.tsx` |
| AC-003 | Login screen > [AC-003] a 422 renders the password rules returned by the API | Unit | Passed | `frontend/src/screens/Login.test.tsx` |
| AC-004 | Login screen > [AC-004] signs in and stores the returned token | Unit | Passed | `frontend/src/screens/Login.test.tsx` |
| AC-005 | Login screen > [AC-005] shows one generic message on a 401, with no field hint | Unit | Passed | `frontend/src/screens/Login.test.tsx` |
| AC-001 | test_ac001_login_with_correct_credentials_returns_a_token_and_profile | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-005, NFR-003 | test_ac005_nfr003_unknown_identifier_returns_generic_401 | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-005, NFR-003 | test_ac005_nfr003_wrong_password_returns_generic_401 | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-006 | test_ac006_a_token_reaches_auth_me_until_logout | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-006 | test_ac006_concurrent_logins_each_hold_an_independent_session | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-006 | test_ac006_logging_out_twice_with_the_same_token_is_401_the_second_time | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-008 | test_ac008_malformed_token_returns_401 | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-008 | test_ac008_missing_token_returns_401 | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-008, NFR-002 | test_ac008_nfr002_a_session_past_its_inactivity_or_absolute_limit_returns_401 | Integration | Skipped | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-008 | test_ac008_unknown_token_returns_401 | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-009 | test_ac009_deactivating_a_doctor_revokes_their_existing_sessions | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| NFR-001 | test_nfr001_login_and_profile_responses_never_echo_the_plaintext_password | Integration | Passed | `backend/tests/integration/test_auth_login_sessions.py` |
| AC-001 | test_ac001_ignores_a_role_sent_in_the_body | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-001 | test_ac001_registers_a_patient_and_returns_no_token | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-002 | test_ac002_duplicate_email_is_case_insensitive | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-002 | test_ac002_duplicate_email_is_rejected_with_409 | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-002 | test_ac002_duplicate_phone_is_rejected_with_409 | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-003, NFR-004 | test_ac003_nfr004_password_shorter_than_eight_characters_is_422 | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-003, NFR-004 | test_ac003_nfr004_password_without_a_digit_is_422_with_rules_in_message | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-003, NFR-004 | test_ac003_nfr004_password_without_a_letter_is_422 | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| — | test_neither_email_nor_phone_is_422 | Integration | Passed | `backend/tests/integration/test_auth_register.py` |
| AC-010, NFR-005 | test_ac010_nfr005_patient_gets_403_on_a_doctor_only_endpoint | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| AC-010, NFR-005 | test_ac010_nfr005_patient_gets_403_on_admin_only_endpoints | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| AC-011, NFR-005 | test_ac011_nfr005_doctor_gets_403_on_another_doctors_resource | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| AC-011, NFR-005 | test_ac011_nfr005_doctor_gets_403_on_the_admin_dashboard | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| AC-012, NFR-005 | test_ac012_nfr005_anonymous_calls_are_401_not_403 | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| NFR-005 | test_nfr005_role_checks_run_before_ownership_or_existence_checks | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| — | test_non_uuid_id_is_404 | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| — | test_unknown_id_is_404_for_an_authorized_caller | Integration | Passed | `backend/tests/integration/test_role_enforcement.py` |
| — | test_a_fresh_session_within_both_limits_is_accepted | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-001 | test_ac001_register_creates_a_patient_who_can_then_log_in | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-002 | test_ac002_duplicate_email_is_rejected_case_insensitively | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-002 | test_ac002_duplicate_phone_is_rejected | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-002 | test_ac002_neither_email_nor_phone_is_rejected | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-003 | test_ac003_a_weak_password_is_rejected_with_the_rules_spelled_out | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-003 | test_ac003_any_role_sent_at_registration_is_ignored | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-004 | test_ac004_login_returns_an_opaque_token_and_the_users_role | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-005 | test_ac005_inactive_account_returns_generic_401 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-005 | test_ac005_unknown_identifier_returns_generic_401 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-005 | test_ac005_wrong_password_returns_generic_401 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-006 | test_ac006_logging_in_again_creates_a_second_independent_session | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-006 | test_ac006_logout_revokes_the_session_and_reuse_is_rejected | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-007 | test_ac007_passwords_are_stored_only_as_a_bcrypt_hash | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-008 | test_ac008_a_session_idle_past_30_minutes_is_rejected | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-008 | test_ac008_a_session_past_its_absolute_lifetime_is_rejected | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-009 | test_ac009_admin_creates_a_doctor_and_deactivates_them | Integration | Failed | `backend/tests/unit/test_auth.py` |
| AC-009 | test_ac009_deactivating_a_user_revokes_every_existing_session_immediately | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-010 | test_ac010_malformed_token_returns_401 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-010 | test_ac010_missing_token_returns_401 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-010 | test_ac010_unknown_token_returns_401 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-011 | test_ac011_auth_me_returns_the_callers_profile | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-012 | test_ac012_a_non_uuid_doctor_id_gets_404 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-012 | test_ac012_a_role_the_endpoint_does_not_permit_gets_403 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-012 | test_ac012_an_unknown_doctor_id_gets_404 | Integration | Passed | `backend/tests/unit/test_auth.py` |
| — | test_verify_password_rejects_a_missing_hash | Integration | Passed | `backend/tests/unit/test_auth.py` |
| AC-005 | [AC-005] a wrong password shows one generic 'Invalid credentials' message | E2E | Passed | `frontend/e2e/auth-login-errors.spec.ts` |
| AC-001, AC-004 | [AC-001][AC-004] a new patient registers, signs in, and reaches the patient area | E2E | Failed | `frontend/e2e/auth-register-login.spec.ts` |
| AC-002 | [AC-002] registering with an email already in use shows the 'already in use' message | E2E | Failed | `frontend/e2e/auth-register-validation.spec.ts` |
| AC-003, NFR-004 | [AC-003][NFR-004] a password shorter than 8 characters shows the password rules | E2E | Failed | `frontend/e2e/auth-register-validation.spec.ts` |
| AC-003, NFR-004 | [AC-003][NFR-004] a password without a digit shows the password rules | E2E | Failed | `frontend/e2e/auth-register-validation.spec.ts` |
| AC-010 | [AC-010] a patient navigating to the admin URL is denied | E2E | Failed | `frontend/e2e/auth-roles.spec.ts` |
| AC-010 | [AC-010] signing in as the admin reaches the admin dashboard | E2E | Passed | `frontend/e2e/auth-roles.spec.ts` |
| AC-011 | [AC-011] a doctor cannot reach the admin dashboard | E2E | Failed | `frontend/e2e/auth-roles.spec.ts` |
| AC-011 | [AC-011] a patient navigating to the doctor schedule URL is denied | E2E | Failed | `frontend/e2e/auth-roles.spec.ts` |
| AC-006 | [AC-006] signing out returns the user to the sign-in screen | E2E | Passed | `frontend/e2e/auth-session.spec.ts` |
| AC-012 | [AC-012] opening a protected URL directly with no session redirects to login | E2E | Passed | `frontend/e2e/auth-session.spec.ts` |
| AC-012 | [AC-012] opening the admin console directly with no session redirects to login | E2E | Passed | `frontend/e2e/auth-session.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_nothing_is_seeded_without_the_variables | Unit | Passed | `backend/tests/unit/test_bootstrap.py` |
| — | test_seeding_twice_creates_nothing_new | Unit | Passed | `backend/tests/unit/test_bootstrap.py` |
| — | test_seeds_the_admin_and_the_smoke_user | Unit | Passed | `backend/tests/unit/test_bootstrap.py` |
| — | test_a_doctor_links_to_its_specializations | Unit | Passed | `backend/tests/unit/test_models.py` |
| — | test_cancelling_releases_the_slot | Unit | Passed | `backend/tests/unit/test_models.py` |
| — | test_two_live_appointments_cannot_share_a_slot | Unit | Passed | `backend/tests/unit/test_models.py` |
| AC-008 | App > [AC-008] renders a screen inside the app shell and shows its menu for an authenticated session | Unit | Passed | `frontend/src/App.test.tsx` |
| AC-012 | App > [AC-012] an unauthenticated visitor to a protected page is redirected to sign in, not shown the page | Unit | Passed | `frontend/src/App.test.tsx` |
| — | test_health_reports_ok | Integration | Passed | `backend/tests/integration/test_health.py` |
| — | test_the_openapi_document_builds | Integration | Passed | `backend/tests/integration/test_health.py` |
| — | test_the_spec_path_is_mounted[delete-/appointments/{id}] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/appointments] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/audit-logs] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/auth/me] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/consultation-records/{id}] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/disease-mappings] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/doctors/search] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/doctors/{id}/slots] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/me/consultation-records] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[get-/specializations] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[patch-/appointments/{id}/reschedule] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[patch-/appointments/{id}/status] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[patch-/consultation-records/{id}] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[patch-/disease-mappings/{id}] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[patch-/doctors/{id}] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[patch-/specializations/{id}] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/appointments] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/auth/login] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/auth/logout] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/auth/register] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/consultation-records] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/disease-mappings] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/doctors/{id}/time-off] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/doctors] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/patients] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[post-/specializations] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | test_the_spec_path_is_mounted[put-/doctors/{id}/availability] | Integration | Passed | `backend/tests/integration/test_routes.py` |
| — | the app loads | E2E | Passed | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
