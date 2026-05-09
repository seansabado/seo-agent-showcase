# Demo Script — 90-Second Guided Walkthrough

**Live:** [seansabado.github.io/seo-agent-showcase](https://seansabado.github.io/seo-agent-showcase/)

This script walks through the four key demos in the app. You can run through all four in under 90 seconds.

---

## Step 1 — Tenant Isolation (15 sec)

**What to do:**

1. Open the app
2. Look at the top-right **Tenant Switcher** — it defaults to `Tenant A`
3. Create a fake proposal by clicking **Create Fake Proposal** in the Proposal Queue module
4. Switch to `Tenant B` using the switcher

**What to observe:**

- All proposals, runners, and queue state **reset completely** on tenant switch
- No state leaks between tenants
- The tenant context propagates to every domain operation

**What it proves:**

- Tenant isolation is enforced at the data path level, not just the UI level
- See `src/shared/guards/tenantGuard.ts` for the guard implementation

---

## Step 2 — Offline Queue (30 sec)

**What to do:**

1. Open DevTools → Network tab → select **Offline** from the throttle dropdown
2. The **Online** status pill turns **Offline**
3. Click **Create Fake Proposal** 2–3 times
4. Observe proposals appear with status `queued`
5. Observe the **Pending Actions** counter increment in the Offline Queue panel

**What to observe:**

- Proposals are NOT dropped when offline — they are enqueued
- Each item in the queue shows `actionId`, `type`, `status`, and `createdAt`
- The **Sync Queue** button is disabled while offline (no false confidence)

**Come back online:**

1. Switch DevTools back to **No throttling**
2. Status pill returns to **Online**
3. Click **Sync Queue**
4. Watch each item transition: `queued → syncing → synced`

**What it proves:**

- Offline-first behavior with explicit status lifecycle
- No silent data loss under connectivity failure
- See `src/example-pos/useOfflineQueue.ts` for queue implementation

---

## Step 3 — Failure-Mode Demo (30 sec)

**What to do:**

1. Make sure you are **Online**
2. Create 2–3 proposals while online (they appear with status `created`)
3. Toggle the **Simulate Fail** switch ON (in the POS module action row)
4. Click **Sync Queue** (or go offline first to queue some actions, then come back online)
5. Watch the sync attempt → items move to `failed`
6. Toggle **Simulate Fail** OFF
7. Click **Sync Queue** again
8. Watch items retry and resolve to `synced`

**What to observe:**

- Failed items are retained in the queue — not discarded
- Retry works without re-queueing
- The **Telemetry Log** panel shows timestamped events for each lifecycle transition

**What it proves:**

- Explicit error handling with no silent drops
- Retryable failure model — safe for production async ops
- Observability via trace log shows exactly what happened and when

---

## Step 4 — Role Access Guard (15 sec)

**What to do:**

1. Find the **Tenant Switcher** — observe it shows the current role
2. Switch role between `owner`, `manager`, `staff`
3. Observe UI visibility changes

**What to observe:**

- Higher-privilege modules are hidden for lower roles
- Role context propagates without page reload
- No "just hide it" approach — access is checked before render, not after

**What it proves:**

- Role-based access is a first-class concern, not a cosmetic filter
- See `src/example-tenant/` for role guard implementation

---

## What To Mention in an Interview

- "The queue status is explicit — `queued`, `syncing`, `synced`, `failed` — because implicit state is where bugs hide."
- "Tenant isolation is enforced at the guard layer, not just the route layer. You can't accidentally call a function in the wrong tenant context."
- "The failure demo exists specifically to show that failure handling is designed, not assumed away."
- "Every ADR explains a tradeoff. I write them to justify architectural decisions in code review, not just implement features."
