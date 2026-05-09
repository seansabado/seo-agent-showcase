# KaOten SEO Agent Reference (Public-Safe)

## Summary

KaOten is an AI-native SEO operations system that helps teams discover opportunities, build content proposals, execute approved work, and track search outcomes.

This version is intentionally sanitized for portfolio sharing:

- no secret keys
- no private infrastructure identifiers
- no sensitive customer or tenant data

## Core Purpose

KaOten turns SEO work into a reliable operational flow:

1. Research high-intent keywords
2. Generate structured proposals
3. Route proposals through a human approval queue
4. Execute approved items into content artifacts
5. Track health and rank signals over time

## High-Level Architecture

```text
Dashboard UI
  -> Server Actions
  -> API Routes (/api/seo/*)
  -> Services (proposal engine, ranking, health scoring)
  -> External providers (search data, AI model, indexing APIs)
```

Key modules:

- Signal: health and suggestions
- Research: keyword intelligence
- Queue: approval + execution lifecycle
- Ranks: ranking checks with cache-aware refresh
- Activity: audit-oriented timeline

## Configuration Model

KaOten uses a central configuration file pattern (`kaoten.config.ts`) as single source of truth for:

- metadata limits
- keyword constraints
- CTA policy
- locale/market defaults
- runtime paths

Example policy groups:

- title and description length limits
- keyword list min/max
- intro and section requirements
- duplicate keyword restrictions

## SEO Quality Commandments (Policy Layer)

KaOten enforces strict content policy rules before execution, including:

- title/description length control
- early keyword placement
- minimum section depth
- duplicate-keyword prevention
- orphan-page prevention through routing/wiring
- locale consistency

These rules are validated before generation and before final write.

## Execution Workflow (Condensed)

```text
Authenticate -> Load dashboard data -> Research or select suggestion
-> Create queue item (proposed)
-> Approve (approved)
-> Execute
-> Validate + Generate + Write + Wire
-> Log activity
-> Re-score health
-> Monitor ranks
```

Lifecycle statuses:

- proposed
- approved
- executed
- rejected

## API Surface (Representative)

- `POST /api/seo/execute-proposal`
- `PATCH /api/seo/update-queue-status`
- `POST /api/seo/rank-check`
- `POST /api/seo/save-proposal`
- `POST /api/seo/indexnow`

Design expectations:

- schema-validated payloads
- explicit error responses
- idempotent execution paths
- audit logging for sensitive actions

## Security and Safe-Share Rules

This reference excludes:

- API keys and secrets
- private environment identifiers
- internal-only operations endpoints
- customer-identifying data

If adapting this template, store sensitive values in secret managers and inject via environment configuration.

## Rationale

A single, public-safe technical reference lets reviewers understand KaOten's architecture and operational flow without exposing confidential implementation details.

## Risks

- Over-sanitization can hide implementation nuance
- Policy drift can happen if config and docs are not updated together

## Next Steps

1. Pair this document with `kaoten-saas-roadmap.md` for product graduation strategy.
2. Add a schema appendix for API payload contracts.
3. Add an operations SLO table for queue and ranking checks.
