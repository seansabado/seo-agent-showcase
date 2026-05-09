# Hiring Manager One-Pager

**Repository:** [seo-agent-showcase](https://github.com/seansabado/seo-agent-showcase)  
**Live demo:** [seansabado.github.io/seo-agent-showcase](https://seansabado.github.io/seo-agent-showcase/)  
**Author:** Sean Sabado

---

## What This Repo Demonstrates

This is a runnable, testable engineering showcase built to demonstrate the _judgment and craft_ behind multi-tenant SaaS systems — not just familiarity with frameworks.

### Core Competencies Evidenced

| Area                              | What you'll see                                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Multi-tenant safety**           | Every domain operation scopes to `tenantId` before execution. Switching tenants resets all state — zero bleed.                               |
| **Offline-first architecture**    | Orders created offline are enqueued, not dropped. Sync lifecycle is explicit: `queued → syncing → synced / failed`.                          |
| **Failure handling**              | Failure-mode demo lets you inject a sync failure and observe the retry path. No silent data loss.                                            |
| **Composable guards**             | Auth check, tenant membership check, and audit log are composed via wrapper — not duplicated per function.                                   |
| **TypeScript discipline**         | Strict TypeScript throughout. Zero `any`. Types defined at domain boundaries, not inlined.                                                   |
| **Testability**                   | Unit tests cover queue lifecycle state transitions and tenant guard allow/deny behavior. CI enforces typecheck + test + build on every push. |
| **Documentation as architecture** | ADRs explain _why_ decisions were made. Interview walkthrough shows thinking process, not just output.                                       |

---

## What Problems This Addresses

These are real production-grade concerns in multi-tenant SaaS systems:

1. **Cross-tenant data leakage** — the most critical security concern in any shared-infrastructure SaaS
2. **Offline resilience in operations tooling** — proposal and execution workflows must work without connectivity
3. **Observability of async operations** — queued operations must be traceable, not opaque
4. **Guard composition at scale** — ad-hoc per-function auth checks create inconsistency and gaps

---

## What This Repo Does NOT Claim

- It is not a full production system
- It does not contain any employer's proprietary code
- The fake data and hook signatures are written from first principles

---

## What To Look At (In Order)

1. **[docs/demo-script.md](demo-script.md)** — 90-second guided demo path
2. **`src/example-pos/index.tsx`** — proposal queue module with failure-mode demo and trace log
3. **`src/shared/guards/tenantGuard.ts`** — tenant isolation implementation
4. **`src/shared/guards/callableGuard.ts`** — composable guard pattern
5. **`src/example-pos/useOfflineQueue.ts`** — offline queue with explicit status lifecycle
6. **[docs/adr/](adr/)** — three ADRs explaining key architectural decisions
7. **[docs/interview-walkthrough.md](interview-walkthrough.md)** — how I'd explain this in a technical interview

---

## Relevant Experience Context

This showcase reflects patterns applied when building:

- Multi-tenant SaaS operations systems
- Multi-workspace operations with role-based access control
- Firebase + Firestore backend with tenant-isolated data paths
- Offline-first execution queue management
- Real-time runner state tracking

The code here is a safe, generic, first-principles reconstruction of those patterns — suitable for public review.
