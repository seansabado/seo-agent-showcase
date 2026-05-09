# ADR 0002: Offline Queue for POS-Like Reliability

## Status

Accepted

## Context

POS workflows must tolerate intermittent connectivity without blocking operators.

## Decision

Capture actions locally, store them in a queue, and replay when online with explicit sync status transitions.

## Consequences

- Better user continuity in weak network conditions
- Requires idempotency and retry design
- Adds queue monitoring responsibilities
