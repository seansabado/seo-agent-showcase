# KaOten Standalone SaaS Roadmap (Public-Safe)

## Summary

This roadmap describes how KaOten can evolve from an embedded/internal SEO operations tool into a standalone multi-tenant SaaS product.

## Strategic Direction

Recommended target:

- independent product repo
- independent CI/CD and release cadence
- independent tenant and billing model

Migration pattern:

```text
Embedded KaOten module
  -> Extraction branch (decouple domain assumptions)
  -> Standalone repo launch
```

## Decoupling Requirements

To become universal, KaOten must remove domain-specific assumptions:

- hardcoded page targets -> dynamic crawl/selection
- single-market defaults -> per-tenant market/locale config
- filesystem logs -> tenant-scoped durable storage
- single-tenant auth assumptions -> multi-tenant onboarding and RBAC

## Phase Plan

### Phase 1: Extract and decouple

- isolate reusable SEO core package
- replace hardcoded vertical references with tenant config
- add unit tests for proposal, health, and keyword analysis engines

### Phase 2: SaaS shell

- multi-tenant auth and workspace model
- domain onboarding and verification flow
- plan tiers and usage metering

### Phase 3: Universal crawler

- sitemap ingestion
- scheduled health scans
- orphan and broken-link detection

### Phase 4: Search data integration

- search console integration
- per-page impression/click/CTR tracking
- keyword gap and quick-win suggestions

### Phase 5: Installation options

- script install for low-friction onboarding
- framework package support
- CMS integration path

### Phase 6: AI content engine

- draft generation from approved queue items
- metadata and schema assistance
- model-provider abstraction

### Phase 7: Agency and enterprise layer

- multi-client agency workspaces
- white-label controls
- reporting and webhook integrations

## Tech Stack Guidance

- Frontend: Next.js + TypeScript + Tailwind
- Backend: serverless functions + tenant-scoped data store
- AI: provider abstraction with safe fallback behavior
- Billing: subscription and metered usage support

## Governance and Security

- strict tenant isolation in all reads/writes
- secret management via secure runtime configuration
- audit trails for privileged operations
- no secrets in repository docs or examples

## Success Criteria

- onboarding from empty account to first SEO run in minutes
- deterministic queue lifecycle and transparent failure handling
- measurable SEO signal improvements at tenant level

## Rationale

This staged roadmap minimizes migration risk while preserving KaOten's strongest capabilities: policy-driven quality, queue reliability, and explainable operations.

## Risks

- extraction effort can expand if coupling is deeper than expected
- billing and multi-tenant concerns can delay productization if introduced late

## Next Steps

1. Define a product-neutral `SiteConfig` contract.
2. Build extraction checklist and test gates.
3. Timebox Phase 1 and review go/no-go for standalone repo launch.
