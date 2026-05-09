# Hiring Manager One-Pager

**Repository:** [seo-agent-showcase](https://github.com/seansabado/seo-agent-showcase)  
**Live demo:** [seansabado.github.io/seo-agent-showcase](https://seansabado.github.io/seo-agent-showcase/)  
**Author:** Sean Sabado

---

## What This Repo Demonstrates

This is a runnable, testable engineering showcase built to demonstrate the _judgment and craft_ behind KaOten SEO Agent — an SEO operations system with explicit workflow, validation, queueing, and observability.

### Core Competencies Evidenced

| Area                              | What you'll see                                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Multi-tenant safety**           | Every domain operation scopes to `tenantId` before execution. Switching tenants resets all state — zero bleed.                               |
| **Offline-first architecture**    | Proposal actions created offline are enqueued, not dropped. Sync lifecycle is explicit: `queued → syncing → synced / failed`.                |
| **Failure handling**              | Failure-mode demo lets you inject a sync failure and observe the retry path. No silent data loss.                                            |
| **Composable guards**             | Auth check, tenant membership check, and audit log are composed via wrapper — not duplicated per function.                                   |
| **TypeScript discipline**         | Strict TypeScript throughout. Zero `any`. Types defined at domain boundaries, not inlined.                                                   |
| **Testability**                   | Unit tests cover queue lifecycle state transitions and tenant guard allow/deny behavior. CI enforces typecheck + test + build on every push. |
| **Documentation as architecture** | KaOten reference docs, ADRs, and workflow docs explain _why_ decisions were made, not just what was built.                                   |

---

## What Problems This Addresses

These are real production-grade concerns for SEO operations systems and adjacent multi-tenant products:

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

1. **[docs/kaoten-seo-agent.md](kaoten-seo-agent.md)** — full public-safe KaOten system reference
2. **[docs/kaoten-overview.md](kaoten-overview.md)** — product context and module map
3. **[docs/demo-script.md](demo-script.md)** — 90-second guided demo path
4. **`src/example-queue/index.tsx`** — current proposal queue module with failure-mode demo and trace log
5. **`src/shared/guards/tenantGuard.ts`** — tenant isolation implementation
6. **`src/example-queue/useOfflineQueue.ts`** — offline queue with explicit status lifecycle
7. **[docs/adr/](adr/)** — ADRs explaining key architectural decisions

## KaOten Documentation Depth

For detailed product and system documentation, review:

1. **[kaoten-overview.md](kaoten-overview.md)** — product context, personas, and value proposition
2. **[kaoten-seo-agent.md](kaoten-seo-agent.md)** — detailed workflow, surfaces, rules, and API categories
3. **[kaoten-architecture-deep-dive.md](kaoten-architecture-deep-dive.md)** — isolation model, queue lifecycle, and reliability controls
4. **[kaoten-module-catalog.md](kaoten-module-catalog.md)** — module-by-module behavior and expected outputs
5. **[kaoten-api-contracts.md](kaoten-api-contracts.md)** — representative request/response contracts and error model
6. **[kaoten-ops-runbook.md](kaoten-ops-runbook.md)** — incident triage and recovery procedures
7. **[kaoten-roadmap.md](kaoten-roadmap.md)** — staged maturity path to production readiness
8. **[kaoten-saas-roadmap.md](kaoten-saas-roadmap.md)** — standalone product extraction and graduation path

---

## Relevant Experience Context

This showcase reflects patterns applied when building:

- Multi-tenant SaaS operations systems
- Multi-workspace operations with role-based access control
- Firebase + Firestore backend with tenant-isolated data paths
- Offline-first execution queue management
- Real-time runner state tracking

The code here is a safe, generic, first-principles reconstruction of those patterns — suitable for public review.
