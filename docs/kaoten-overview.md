# KaOten SEO Agent Overview

## Summary

KaOten SEO Agent is a multi-tenant SEO operations platform pattern that combines proposal generation, execution orchestration, role-aware visibility, and offline-safe task handling.

This showcase is intentionally safe-share: fake data, generic abstractions, and no tenant secrets.

## Product Intent

KaOten is designed for teams that need to ship SEO work consistently across many clients without losing operational control.

Core outcomes:

- Faster campaign setup with standardized proposal flows
- Lower execution risk via explicit queue states and retries
- Clear tenant/workspace isolation across all operations
- Better reviewability through telemetry and role-scoped visibility

## Primary Personas

| Persona            | Goals                                       | Typical Actions                                                          |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------ |
| Owner              | Scale delivery quality across accounts      | Set policy, monitor analytics, approve workflow boundaries               |
| Operations Manager | Keep work flowing and recover from failures | Manage queue throughput, assign runner priorities, triage failed actions |
| SEO Specialist     | Deliver tasks quickly and safely            | Create proposals, trigger execution, verify completion                   |

## Core Modules

| Module           | Purpose                                | Key Signals                                      |
| ---------------- | -------------------------------------- | ------------------------------------------------ |
| Dashboard        | At-a-glance operational health         | proposal volume, active runners, pending queue   |
| Proposal Queue   | Create and stage SEO actions           | created, queued, synced, failed status lifecycle |
| Execution Engine | Manage runner states and work dispatch | idle/in_use/maintenance runner distribution      |
| SEO Analytics    | Plan-gated insight surface             | trend readiness, workspace-level visibility      |
| Settings         | Context and policy controls            | preview role behavior, enabled capabilities      |

## Showcase Boundaries

- Included: architecture patterns, queue lifecycle, guard patterns, role-aware UI behavior
- Excluded: real client data, real ranking feeds, production integrations, secrets

## Rationale

The showcase prioritizes architectural judgment over domain confidentiality. The structure demonstrates how KaOten-like systems should be designed, operated, and reviewed.

## Risks

- Readers may assume all docs map 1:1 to production implementation details
- Generic naming may hide environment-specific complexity

## Next Steps

1. Pair this document with `kaoten-architecture-deep-dive.md` for system internals.
2. Review `kaoten-ops-runbook.md` for incident and recovery flows.
3. Use `kaoten-roadmap.md` to align delivery phases.
