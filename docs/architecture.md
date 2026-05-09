# Architecture (Showcase)

## Summary

This document describes a generic multi-tenant SaaS architecture pattern for web clients + serverless backend. It is intentionally abstract and avoids any production-specific details.

## High-Level System View

```text
+-------------------+       +----------------------+       +----------------------+
| Web / PWA Client  | ----> | API / Callable Layer | ----> | Multi-tenant Data    |
| (React + TS)      | <---- | (Auth + Guard + Log) | <---- | Store (Document DB)  |
+-------------------+       +----------------------+       +----------------------+
         |                            |
         |                            v
         |                   +----------------------+
         +-----------------> | Async Workers/Jobs   |
                             | (events, retries)    |
                             +----------------------+
```

## Tenant Isolation Model

```text
Tenant A user ---> Auth identity ---> Tenant guard ---> Access Tenant A records only
Tenant B user ---> Auth identity ---> Tenant guard ---> Access Tenant B records only

No cross-tenant query path is allowed.
```

## Request Flow

```text
1) Client attaches identity token
2) Function validates identity
3) Function verifies tenant membership/role
4) Function executes business action
5) Function writes audit log
6) Function returns scoped response
```

## Layered Responsibilities

- Client layer:
  - UI state, optimistic updates, offline queue
  - Tenant context selection
  - Read-model hooks
- Function layer:
  - Authentication and authorization
  - Tenant boundary checks
  - Action orchestration and audit logging
- Data layer:
  - Tenant-scoped collections/documents
  - Query design optimized for tenant filtering

## Reliability Considerations

- Idempotent writes for retried calls
- Offline queue with deterministic replay order
- Explicit audit logs for privileged actions
- Time-based cleanup jobs for stale transient data

## Non-Goals in This Showcase

- Exact production schemas
- Vendor-specific secrets/config
- Real workload sizes and financial constraints
