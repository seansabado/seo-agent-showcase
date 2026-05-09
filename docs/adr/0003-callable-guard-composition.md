# ADR 0003: Composable Callable Guards

## Status

Accepted

## Context

Duplicated auth checks across callable handlers leads to drift and security gaps.

## Decision

Use shared wrappers/helpers: `requireAuth`, `verifyTenantAccess`, and `logAudit` in a standard handler flow.

## Consequences

- Consistent enforcement path
- Easier review and testing
- Cleaner handler implementations
