# Architecture Decisions Index

This is a summary index of all Architecture Decision Records (ADRs) in this repository. Each ADR explains a key engineering decision — the context, the chosen approach, and the tradeoffs accepted.

---

## Why ADRs?

Architecture decisions made under time pressure tend to be forgotten or re-litigated. ADRs create a permanent record of _why_ a pattern was chosen, which is as important as _what_ was chosen. In code review, I reference ADRs to give reviewers the rationale — not just the diff.

---

## Decision Index

### [ADR-0001 — Tenant Isolation as a First-Class Constraint](adr/0001-tenant-isolation.md)

**Status:** Accepted  
**Problem:** Multi-tenant SaaS systems risk cross-tenant data leakage if isolation is treated as a secondary concern or bolted on at the route layer.  
**Decision:** Require `tenantId` in all domain access paths. Verify tenant membership at the guard layer before any privileged action executes.  
**Tradeoff accepted:** Slightly more boilerplate in request contracts. Worth it because the alternative (hoping no function forgets to check) has historically been the source of the worst class of SaaS security incidents.

---

### [ADR-0002 — Optimistic Offline Queue with Explicit Status Lifecycle](adr/0002-offline-queue-strategy.md)

**Status:** Accepted  
**Problem:** POS and order management in field environments must tolerate connectivity loss without dropping data or presenting false success states to users.  
**Decision:** Use an optimistic offline queue with explicit per-item status: `queued → syncing → synced / failed`. Never drop a queued item silently.  
**Tradeoff accepted:** UI must handle "pending" state explicitly. Users see items in queue rather than assuming instant success. This is the right tradeoff — user trust depends on accuracy, not false confidence.

---

### [ADR-0003 — Composable Callable Guards Over Per-Function Checks](adr/0003-callable-guard-composition.md)

**Status:** Accepted  
**Problem:** Duplicating auth + tenant check + audit log in every callable function creates inconsistency. One function that forgets a check creates a security gap.  
**Decision:** Compose a callable guard wrapper that enforces auth, tenant scope, and audit logging in one place. All callables are wrapped; none implement these checks ad-hoc.  
**Tradeoff accepted:** Slight indirection — callables look like wrappers rather than raw functions. Worth it because the alternative is eventually a function that was added in a hurry and skipped the auth check.

---

### [ADR-0004 — Queue Persistence: Revised Decision (In-memory → IndexedDB)](adr/0004-queue-persistence-reversal.md)

**Status:** Accepted with documented gap  
**Original decision:** Use `useState` for the offline queue — simple, testable, readable.  
**What changed:** In-memory queue silently loses unsynced orders on tab close. That's a user-trust failure mode more serious than the implementation simplicity gain.  
**Revised decision:** Production should use IndexedDB as persistent write store, React state as read cache.  
**Why the original stands in this repo:** Showcase readability + test simplicity; in-memory is explicitly documented as a gap, not a finished design.

---

## What I Look For When Writing an ADR

1. **What problem triggers this decision?** If I can't articulate the problem, I don't have enough context to make the decision yet.
2. **What alternatives exist?** At least two alternatives are considered — one of which is "do nothing" or "leave the current approach."
3. **What is accepted as a consequence?** Every decision involves a tradeoff. If there's no tradeoff, it probably wasn't a real decision.
4. **Who needs to know about this?** ADRs exist for future teammates, not for personal reference.

---

## Pending Decisions (not yet written)

- Role resolution order when a user holds multiple roles across branches
- Client-side vs server-side tenant validation (current: both — belt-and-suspenders)
- Queue persistence strategy: in-memory (current) vs. localStorage for cross-session durability

---

## What I'd Change (Intellectual Honesty Section)

These are decisions I made that I would revisit if building this for real production — not because they're wrong in context, but because I've thought about them more since.

### 1. In-memory queue was the right starting point, but not the right ending point

**Original decision:** Use React state (`useState`) for the offline queue — simple, testable, no external dependencies.

**What I'd change:** Switch to IndexedDB-backed persistence before shipping to any real user. The risk is not complexity — it's trust. A user who creates 10 offline orders, closes the tab, and reopens to find them gone will never trust the system again. That trust cost is much higher than the IndexedDB implementation cost.

**Why I didn't do it here:** Adds a browser storage dependency and complicates the showcase's readability. It's documented as a gap in [production-hardening.md](production-hardening.md).

---

### 2. I'd add a `dead-letter` state sooner than I did

**Original decision:** `failed` items stay in the queue indefinitely and can be retried.

**What I'd change:** Add a `dead` state after 3 consecutive failures, move the item out of the active queue, and surface it in a separate "needs attention" list. Infinite retry without a dead-letter queue is a silent accumulation problem — items that will never succeed keep appearing as "pending."

**What this taught me:** The failure path is a feature, not an edge case. Designing it later means retrofitting. I should have written the `dead` state first.

---

### 3. The composable guard is right, but I'd extract the audit log write to a separate concern

**Original decision:** Audit log write is part of the guard composition chain — every wrapped callable logs automatically.

**What I'd change:** Separate the audit log into its own middleware/observer layer rather than baking it into the guard. The guard's job is access control; logging is a side effect. Mixing them makes the guard harder to unit test in isolation (you need to mock the log write in every guard test).

**What this reinforces:** Single responsibility matters even in "helper" abstractions. A guard that also logs is two things, not one.
