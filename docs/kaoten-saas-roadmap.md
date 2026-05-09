# KaOten Standalone SaaS Roadmap (Public-Safe)

## Summary

This roadmap describes how KaOten can evolve from an embedded/internal SEO operations tool into a standalone multi-tenant SaaS product.

The public-safe version preserves product direction and execution phases while excluding private repos, internal project identifiers, and secret-bearing deployment details.

## Strategic Direction

Recommended target:

- independent product repo
- independent CI/CD and release cadence
- independent tenant and billing model

### Repo strategy

The long-term recommendation is to graduate KaOten into its own repository and product boundary rather than leaving it permanently coupled to a host application.

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
- host-brand assumptions -> white-label or product-neutral surfaces
- single-site workflow assumptions -> per-workspace orchestration model

## Phase Plan

### Phase 1: Extract and decouple

- isolate reusable SEO core package
- replace hardcoded vertical references with tenant config
- add unit tests for proposal, health, and keyword analysis engines
- separate brand-neutral UI tokens from host-app styling
- document a product-neutral `SiteConfig` contract

### Phase 2: SaaS shell

- multi-tenant auth and workspace model
- domain onboarding and verification flow
- plan tiers and usage metering
- role system for owner/editor/viewer workflows
- tenant-scoped queue, activity, and health history

### Phase 3: Universal crawler

- sitemap ingestion
- scheduled health scans
- orphan and broken-link detection
- content-depth and metadata extraction
- crawl budget and exclude-pattern controls

### Phase 4: Search data integration

- search console integration
- per-page impression/click/CTR tracking
- keyword gap and quick-win suggestions
- cached rank-check strategy with freshness controls

### Phase 5: Installation options

- script install for low-friction onboarding
- framework package support
- CMS integration path
- passive observer mode for zero-install reporting

### Phase 6: AI content engine

- draft generation from approved queue items
- metadata and schema assistance
- model-provider abstraction
- brief exports and structured content handoff

### Phase 7: Agency and enterprise layer

- multi-client agency workspaces
- white-label controls
- reporting and webhook integrations
- team permissions and client-facing status surfaces

## Tech Stack Guidance

- Frontend: Next.js + TypeScript + Tailwind
- Backend: serverless functions + tenant-scoped data store
- AI: provider abstraction with safe fallback behavior
- Billing: subscription and metered usage support
- Search data: search console and ranking provider integrations
- Crawler: lightweight parsing plus scheduled rescans

## Governance and Security

- strict tenant isolation in all reads/writes
- secret management via secure runtime configuration
- audit trails for privileged operations
- no secrets in repository docs or examples

## Immediate Extraction Checklist

1. define host-independent configuration contracts
2. identify all hardcoded domain/market assumptions
3. move execution history and queue storage to tenant-aware persistence
4. isolate reusable proposal, ranking, and health libraries
5. validate extraction with a second site/workspace scenario

## Success Criteria

- onboarding from empty account to first SEO run in minutes
- deterministic queue lifecycle and transparent failure handling
- measurable SEO signal improvements at tenant level
- a clean separation between product core and any single reference customer

## Rationale

This staged roadmap minimizes migration risk while preserving KaOten's strongest capabilities: policy-driven quality, queue reliability, and explainable operations.

## Risks

- extraction effort can expand if coupling is deeper than expected
- billing and multi-tenant concerns can delay productization if introduced late

## Next Steps

1. Define a product-neutral `SiteConfig` contract.
2. Build extraction checklist and test gates.
3. Timebox Phase 1 and review go/no-go for standalone repo launch.
4. Use `kaoten-seo-agent.md` as the product behavior baseline during extraction.
