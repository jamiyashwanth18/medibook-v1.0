<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Angular

## Decision Outcome

Chosen option: React 19, because A single responsive React 19 SPA serves all three roles — patients on phones, doctors on a daily schedule, admins on a dashboard — including the interactive slot picker and availability calendar. It stores the opaque session token and sends it as Authorization: Bearer, reading the API base URL from VITE_API_BASE_URL.

## Consequences

A client-rendered SPA needs explicit route guards and token handling; acceptable for a single-clinic internal tool and cheaper to operate than SSR.
<!-- sdlc:auto:end adr -->