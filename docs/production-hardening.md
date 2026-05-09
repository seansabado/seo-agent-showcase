# Production Hardening

This document describes the production-hardening patterns that go beyond the showcase implementation. It serves two purposes:

1. Explain what a real deployment of these patterns would require
2. Document the decisions I would make (and have made) when moving from prototype to production

---

## 1. Tenant Isolation Hardening

### In the Showcase (Tenant Isolation)

- `tenantId` is checked at the guard layer before any operation
- Switching tenants resets all state — no cross-tenant bleed in UI

### Production Additions (Tenant Isolation)

- **Firestore security rules** enforce tenant scoping at the database level — even if a client-side bug bypasses the guard, the DB rejects the write
- **App Check** enforces that only the registered app binary can make API calls — not curl or Postman without attestation
- **Server-side tenant verification** in Cloud Functions — every callable verifies `auth.token.tenantId` matches the document path
- **Audit trail** for all cross-tenant admin operations (support staff access, tenant migrations)

### Example Firestore Rule Pattern (not in showcase — documented here)

```text
match /tenants/{tenantId}/{document=**} {
  allow read, write: if request.auth != null
    && request.auth.token.tenantId == tenantId;
}
```

---

## 2. Offline Queue Hardening

### In the Showcase (Offline Queue)

- In-memory queue with explicit lifecycle: `queued → syncing → synced / failed`
- Retry works on re-calling `processQueue`

### Production Additions (Offline Queue)

- **IndexedDB persistence** — queue survives page refresh, app crash, device restart
- **Exponential backoff** — retries use jitter + exponential delay, not immediate retry on failure
- **Max retry limit** — after N failures, item moves to `dead-letter` state for manual review
- **Idempotency keys** — every queue item carries a deterministic ID so server-side deduplication prevents double-processing if a sync partially succeeds before a crash
- **Conflict resolution strategy** — if the same record was modified server-side while the client was offline, a defined merge or reject rule applies (not silently overwritten)

### Queue State Machine (Production)

```text
queued
  → syncing        (on sync start)
    → synced       (on success)
    → failed       (on error, retryCount < MAX)
      → syncing    (on retry)
      → dead       (on retryCount >= MAX)
```

---

## 3. Guard Composition Hardening

### In the Showcase (Guard Composition)

- Composable guard wrapper: auth → tenant → role → audit → execute

### Production Additions (Guard Composition)

- **Rate limiting** per tenant per callable (prevent abuse by one tenant affecting others)
- **Request signing** for high-value operations (financial writes, role changes)
- **Structured audit log** written to immutable append-only collection with:
  - `actorId`, `tenantId`, `operation`, `resourceId`, `timestamp`, `ipHash`
- **Guard unit tests** for every guard combination (auth-only, auth+tenant, auth+tenant+role)

---

## 4. Observability Hardening

### In the Showcase (Observability)

- Telemetry log panel in the Proposal Queue demo — timestamped event trace for queue operations

### Production Additions (Observability)

- **Cloud Logging** integration — every guard execution, queue event, and sync result written to structured log
- **Trace IDs** propagated from client request through Cloud Function through Firestore write — full request lineage in one log query
- **Error rate alerting** — if `failed` queue items exceed threshold per tenant per hour, alert fires
- **Dashboard** for per-tenant queue depth, sync lag, error rate

---

## 5. CI/CD Pipeline Hardening

### In the Showcase

- CI runs typecheck + test + build on every push

### Production Additions

- **Coverage gate** — minimum 80% branch coverage required; build fails below threshold
- **Dependency audit** — `npm audit` runs on every CI build; critical CVEs block merge
- **Preview deploys** — every PR gets a preview URL for review before merge
- **Staging promotion** — staging deploy requires passing CI + manual approval; production deploy requires passing staging verification
- **Rollback automation** — if error rate spikes within 15 minutes of deploy, rollback triggers automatically

---

## 6. Security Boundaries in Production

These are patterns applied in production but excluded from this showcase for safety:

| Pattern                          | Why excluded                                    |
| -------------------------------- | ----------------------------------------------- |
| Real Firestore schema paths      | Would reveal production data model              |
| Real Cloud Function export names | Would reveal surface area for targeted requests |
| Real environment config          | Obviously                                       |
| Pricing / business rule logic    | Proprietary                                     |
| Real tenant IDs or customer data | Obviously                                       |

Everything in the showcase is fake data, generic patterns, or first-principles reconstructions of common SaaS concerns.
