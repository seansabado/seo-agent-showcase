# KaOten SEO Agent Showcase

[![CI](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml)
[![Coverage](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml/badge.svg?branch=main&label=coverage)](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml)
[![Last Commit](https://img.shields.io/github/last-commit/seansabado/seo-agent-showcase?label=last%20commit)](https://github.com/seansabado/seo-agent-showcase/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Stack: React 19, TypeScript, Vite, Vitest, Firebase patterns, multi-workspace SEO operations, offline-first execution queue.

Safe to share: no proprietary source, no real campaign data, and no credentials.

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

This repository is intentionally maintained as a standalone KaOten showcase artifact, separate from production runtime code.

## Author

Sean Sabado  
Founder & CTO - KaOten SEO Agent  
[https://www.linkedin.com/in/seanraynon/](https://www.linkedin.com/in/seanraynon/)
