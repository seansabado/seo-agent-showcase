# Case Study: Offline-First SEO Operations Queue for Multi-Tenant Workspaces

## The Business Problem

An SEO operations team running a cloud-based execution console loses momentum every time the internet drops. Proposals cannot be queued, runner actions are not recorded, and campaign timelines drift unless work is reconstructed manually. In a high-volume workspace, even short outages can cause missed updates and delivery delays.

The problem is not "the internet went down." The problem is **the system wasn't designed to tolerate it**.

---

## The Engineering Challenge

Building offline-first for multi-tenant SaaS is harder than it sounds:

1. **Tenant isolation must survive connectivity loss.** An offline queue that replays against the wrong tenant context when it reconnects is a data integrity failure, not just a bug.
2. **Silent data loss is worse than an error.** A system that appears to succeed but discards data is worse than one that shows an honest failure state.
3. **Retry without idempotency causes duplicate actions.** A naive retry approach creates duplicate tasks without a deterministic action ID scheme.
4. **Observability disappears offline.** You can't debug what you can't see — async queue operations need an event trace.

---

## What I Built (Showcase Version)

A safe, non-proprietary implementation of the core patterns:

| Pattern           | Implementation                                                                   |
| ----------------- | -------------------------------------------------------------------------------- |
| Offline queue     | `useOfflineQueue` — explicit `queued → syncing → synced / failed` lifecycle      |
| Failure-mode demo | `simulateFailure` toggle lets you inject failure mid-sync and watch retry        |
| Trace log         | Every state transition logged with timestamp, action ID, and note                |
| Tenant isolation  | Every queue replay carries `tenantId`; guard rejects mismatched context          |
| Idempotency       | Each action gets a deterministic `actionId` — safe to replay without duplication |

---

## Constraints (By Design)

- No production code reused
- No real schema, identifiers, or tenant data
- No credentials or environment secrets
- All patterns rebuilt from first principles

---

## Measurable Outcomes

- Runnable in under 2 minutes (`npm install && npm run dev`)
- CI quality gate: typecheck + 7 tests + coverage + build on every push
- 7 unit tests covering queue lifecycle, failure path, retry, trace events, and clearLog
- 4 ADRs documenting key design decisions with tradeoffs
- Production-hardening doc describing what real deployment adds

---

## What I'd Do Differently

**1. Persist the queue to IndexedDB, not just memory.**
The current in-memory queue is fine for a demo but would lose unsynced actions on page refresh. In production I'd use a thin `IDBKeyVal` wrapper so the queue survives app restarts.

**2. Add an explicit `dead-letter` state with a max retry limit.**
Right now a `failed` item can be retried indefinitely. A real system needs a `dead` state after N failures, with alerting. Infinite retry without a dead-letter queue means silent accumulation of unfixable items.

**3. Queue conflict resolution is a documented gap.**
If the same record is modified server-side while a client was offline, the current design replays the client's version without merging. In production this requires a defined merge or reject policy per operation type. I've documented this as a pending ADR.

**4. The guard pattern is the right call, but I'd add per-callable rate limiting.**
The composable guard is clean. What it's missing in production: per-tenant rate limits on callable execution to prevent one tenant from affecting others through burst traffic.

---

## Future Work

1. Add IndexedDB-persisted queue (cross-session durability)
2. Add `dead-letter` state + max retry limit test
3. Add sync conflict resolution ADR with concrete merge strategy
4. Add integration test for full action lifecycle (create → queue → sync → verified)
