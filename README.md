# KaOten SEO Agent Showcase

[![CI](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml)
[![Coverage](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml/badge.svg?branch=main&label=coverage)](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml)
[![Last Commit](https://img.shields.io/github/last-commit/seansabado/seo-agent-showcase?label=last%20commit)](https://github.com/seansabado/seo-agent-showcase/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Stack: React 19, TypeScript, Vite, Vitest, Firebase patterns, multi-workspace SEO operations, offline-first execution queue.

Safe to share: no proprietary source, no real campaign data, and no credentials.

## What KaOten is

KaOten is an AI-native SEO operations system. It is designed to help teams research opportunities, generate structured proposals, approve work through a queue, execute content actions, and track health and ranking outcomes in a controlled workflow.

This repository is the public showcase version of that system: architecture-rich, operationally realistic, and stripped of secrets, customer data, and internal deployment details.

## What this proves quickly

This repo is a runnable engineering showcase for KaOten SEO Agent, focused on SEO operations workflows and queue reliability.

| Pattern                    | What it proves                                      |
| -------------------------- | --------------------------------------------------- |
| Tenant isolation guard     | Every operation scopes to tenantId before execution |
| Offline queue with retry   | Proposal actions survive connectivity loss          |
| Failure-mode demo          | Sync failure is observable and retryable            |
| Callable guard composition | Auth + tenant checks + audit wiring stay consistent |
| Firestore-style hooks      | UI data flow mirrors production query shape         |
| Role-aware rendering       | Capability visibility changes by preview role       |

## What this repo includes

- A KaOten-styled dashboard shell with role-aware visibility
- Proposal Queue workflow with offline-safe queue behavior
- Execution Engine view with runner-state transitions
- SEO Analytics plan-gating patterns
- Public-safe KaOten system documentation and roadmap

Live showcase demo: [seansabado.github.io/seo-agent-showcase](https://seansabado.github.io/seo-agent-showcase/)

## Quick start

```bash
npm install
npm run dev
```

Quality gate:

```bash
npm run typecheck
npm run test
npm run coverage
npm run build
```

## 90-second KaOten demo path

1. Switch tenant/workspace and confirm state resets cleanly.
2. Go offline and create proposals from the Proposal Queue module.
3. Return online and sync queued actions.
4. Toggle Simulate Fail and watch retry behavior in telemetry logs.

## Start here if you want the full KaOten story

1. `docs/kaoten-seo-agent.md` — detailed KaOten system reference
2. `docs/kaoten-overview.md` — product intent, personas, and module map
3. `docs/kaoten-saas-roadmap.md` — path from embedded tool to standalone SaaS
4. `docs/kaoten-architecture-deep-dive.md` — reliability and isolation model

## Docs map

- docs/index.md
- docs/demo-script.md
- docs/hiring-manager.md
- docs/architecture.md
- docs/decisions-index.md
- docs/case-study.md

## KaOten documentation set

- docs/kaoten-overview.md
- docs/kaoten-architecture-deep-dive.md
- docs/kaoten-module-catalog.md
- docs/kaoten-api-contracts.md
- docs/kaoten-ops-runbook.md
- docs/kaoten-roadmap.md
- docs/kaoten-seo-agent.md
- docs/kaoten-saas-roadmap.md

## Safe-share boundary

- No production schema, secrets, or integrations.
- No real keyword, ranking, or client data.
- No deployment credentials or infrastructure internals.
- No secret keys, verification tokens, or private infrastructure identifiers.

This repository is intentionally maintained as a standalone KaOten showcase artifact, separate from production runtime code.

## Author

Sean Sabado  
Founder & CTO - KaOten SEO Agent  
[https://www.linkedin.com/in/seanraynon/](https://www.linkedin.com/in/seanraynon/)
