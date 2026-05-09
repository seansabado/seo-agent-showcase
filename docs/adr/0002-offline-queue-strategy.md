# ADR 0002: Offline Queue for SEO Operations Reliability

## Status

Accepted

## Context

SEO operations workflows must tolerate intermittent connectivity without blocking operators.

## Decision

Capture actions locally, store them in a queue, and replay when online with explicit sync status transitions.

## Consequences

- Better user continuity in weak network conditions
- Requires idempotency and retry design
- Adds queue monitoring responsibilities
