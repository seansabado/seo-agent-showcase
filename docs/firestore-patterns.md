# Firestore-Like Patterns (Safe Showcase)

## Summary

This document explains a generic document-database access style inspired by Firestore patterns, with strict tenant-first filtering and minimal client-side assumptions.

## Rules Philosophy (Generic)

1. Deny by default.
2. Allow read/write only when user identity is present.
3. Enforce tenantId match at document boundaries.
4. Restrict privileged operations by role claims.
5. Keep rules simple, predictable, and testable.

## Safe Example Rules (Pseudo)

```text
match /tenants/{tenantId}/records/{recordId} {
  allow read, write: if isSignedIn() && userTenantId() == tenantId;
}

match /platform/audit/{entryId} {
  allow read: if isPlatformAdmin();
  allow write: if isSystemProcess();
}
```

## Data Access Patterns

- Always include tenant path segment in collection design.
- Avoid global collections for tenant business records.
- Use server-side function for privileged writes.
- Keep client writes scoped to low-risk entities when possible.

## Query Practices

- Query by tenant segment first.
- Add time window filters for dashboards.
- Avoid broad scans across tenants.
- Use pagination consistently.

## Testing Strategy

- Unit tests for hook behavior using fake adapters
- Rule tests for allow/deny matrix
- Regression tests for role/tenant boundary checks

## Non-Proprietary Constraint

All examples here are intentionally abstract and not tied to any production schema.
