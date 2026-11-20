<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django REST Framework
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because FastAPI 0.115 holds the booking logic, generating slots and holding each slot for exactly one appointment via PostgreSQL transactional locking, and its dependency system makes per-request role-based access and audit logging straightforward (US-004, US-024).

## Consequences

Fewer batteries-included admin tools than Django, so the admin dashboard is built explicitly — a reasonable cost for a lean, fast API.
<!-- sdlc:auto:end adr -->