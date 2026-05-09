# ADR 0001: Tenant Isolation as a First-Class Constraint

## Status

Accepted

## Context

Multi-tenant SaaS systems risk cross-tenant data leakage if isolation is treated as an afterthought.

## Decision

Require tenant-scoped identifiers in all domain access paths and verify tenant membership before executing privileged actions.

## Consequences

- Better boundary safety
- Slightly more boilerplate in request contracts
- Stronger auditing and review clarity
