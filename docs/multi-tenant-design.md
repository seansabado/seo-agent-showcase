# Multi-Tenant Design Patterns (Showcase)

## Summary

This document outlines generic multi-tenant patterns for SaaS applications. The emphasis is tenant isolation, safe defaults, and clear context propagation.

## Tenant Context Principles

- Resolve active tenant at session start.
- Store active tenant in a typed context provider.
- Pass tenant context to all data hooks and function calls.
- Never run tenant-unscoped queries for tenant-owned data.

## Fake Data Shape Example

```text
Tenant {
  id: string
  name: string
  plan: free | growth | enterprise
  enabledFeatures: string[]
}

UserTenantMembership {
  userId: string
  tenantId: string
  role: owner | manager | staff
}
```

## Access Pattern

```text
UI -> TenantContext.currentTenantId
   -> Hook/Function receives tenantId
   -> Guard validates membership
   -> Scoped data returned
```

## Switching Tenants

Tenant switching should:

1. Update current tenant context atomically.
2. Cancel stale in-flight data requests.
3. Rehydrate feature flags and permissions.
4. Persist last selected tenant locally for convenience.

## Common Mistakes to Avoid

- Hidden global state that bypasses tenant context
- Caching data without tenant-aware keys
- Reusing admin paths for tenant users
- Trusting client-only tenant IDs without server checks

## Security Baseline

- Server verifies tenant membership every privileged action
- Audit log includes tenantId, actorId, action, timestamp
- Platform-wide operations require elevated role
