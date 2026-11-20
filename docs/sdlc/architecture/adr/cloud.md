<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because AWS runs the ap-south-1 (Mumbai) region, keeping the database, application and all health data in India to satisfy the DPDP Act's no-cross-border rule, and provides managed PostgreSQL (RDS), encryption at rest via KMS, and audit-friendly logging off the shelf (NFR-007, NFR-008).

## Consequences

Pinning every service to one region is required for compliance and removes multi-region redundancy, which is not needed for a single clinic (NFR-013).
<!-- sdlc:auto:end adr -->