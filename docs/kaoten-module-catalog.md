# KaOten Module Catalog

## Summary

This catalog defines KaOten's major modules, responsibilities, and expected operational behavior in the showcase.

## Module Matrix

| Module           | Responsibility                       | Inputs                                       | Outputs                               |
| ---------------- | ------------------------------------ | -------------------------------------------- | ------------------------------------- |
| Dashboard        | Operational snapshot                 | queue state, runner state, workspace context | KPI cards, activity table, alerts     |
| Proposal Queue   | Stage and sync SEO actions           | proposal line items, online status           | queued actions, sync outcomes         |
| Execution Engine | Manage runner availability and state | runner commands, maintenance events          | state transitions, runner utilization |
| SEO Analytics    | Expose gated insight layer           | tenant plan, telemetry aggregates            | unlocked/locked analytics widgets     |
| Settings         | Context and governance controls      | tenant, workspace, preview role              | visible permissions, feature chips    |

## Dashboard

- Purpose: first-stop decision surface for operators
- Core indicators: proposal volume, active runners, pending queue, failed actions
- Expected behavior: updates reflect current tenant/workspace context only

## Proposal Queue

- Purpose: translate SEO intent into replayable actions
- States: `created`, `queued`, `syncing`, `synced`, `failed`
- Required behavior:
  - actions created offline are retained
  - sync is disabled when offline
  - retries produce observable telemetry

## Execution Engine

- Purpose: control runner fleet for SEO task execution
- Runner states: `idle`, `in_use`, `maintenance`
- Expected behavior:
  - state toggles are explicit and traceable
  - operators can quickly identify capacity constraints

## SEO Analytics

- Purpose: provide plan-aware reporting surfaces
- Visibility model:
  - eligible plans: analytics unlocked
  - non-eligible plans: upgrade gate + preview widgets
- Expected behavior: guard messaging is clear and non-destructive

## Settings

- Purpose: reveal context, boundaries, and preview permissions
- Required behavior:
  - role preview affects UI only
  - tenant and workspace metadata remain visible
  - omitted modules are explicitly documented

## Rationale

A clear module catalog improves onboarding, implementation consistency, and review clarity for engineering and product stakeholders.

## Risks

- Module terms can drift from code unless updated alongside UI changes
- Catalog may over-promise capabilities if not linked to current milestone state

## Next Steps

1. Add a "status" field per module (`implemented`, `partial`, `planned`).
2. Link each module section to concrete component files.
3. Add example screenshots per module in `docs/assets`.
