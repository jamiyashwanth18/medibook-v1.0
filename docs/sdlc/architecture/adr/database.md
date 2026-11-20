<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- MariaDB

## Decision Outcome

Chosen option: PostgreSQL 16, because PostgreSQL 16 makes double-booking impossible through SELECT FOR UPDATE plus a partial unique index on active appointments, stores all structured clinic records, supports encryption at rest, and holds the audit trail (US-013, US-023, US-024). Term matching for disease/specialization search runs inside PostgreSQL, so no separate search service is added.

## Consequences

Transactional locking serialises concurrent bookings on the same slot, which is exactly the intended behaviour and inconsequential at single-clinic volume.
<!-- sdlc:auto:end adr -->