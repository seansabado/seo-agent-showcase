# KaOten SEO Agent Showcase

[![CI](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml)
[![Coverage](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml/badge.svg?branch=main&label=coverage)](https://github.com/seansabado/seo-agent-showcase/actions/workflows/ci.yml)
[![Last Commit](https://img.shields.io/github/last-commit/seansabado/seo-agent-showcase?label=last%20commit)](https://github.com/seansabado/seo-agent-showcase/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

KaOten is an AI-native SEO intelligence system that helps teams identify, research, prioritize, and execute high-impact content opportunities through a controlled operations workflow.

This repository is the public-safe showcase build of KaOten. It demonstrates architecture, UX flow, queue reliability, and execution patterns without exposing production secrets or customer data.

Live showcase: [https://seansabado.github.io/seo-agent-showcase/](https://seansabado.github.io/seo-agent-showcase/)

## Product Summary

KaOten currently operates as an internal dashboard with five core surfaces:

- Signal: SEO health and opportunity overview
- Research: keyword and intent analysis
- Queue: proposal approvals and execution flow
- Ranks: position tracking and rank monitoring
- Activity: operation history and audit trail

The long-term direction is to graduate KaOten into a standalone multi-tenant SaaS product for any website owner, with LaundromatAI as the first reference tenant.

## Why This Exists

Manual SEO workflows do not scale. Teams need a repeatable operating system that can:

1. Continuously discover opportunities
2. Transform opportunities into structured proposals
3. Gate execution through review and approval
4. Execute content actions safely and consistently
5. Track outcomes over time

KaOten is designed to be that operating system.

## Core Capabilities

- Keyword intelligence and SERP-aware research
- Structured proposal generation and queue-based approvals
- Controlled execution pipeline (create/update content actions)
- Health scoring (metadata, schema, link depth, content depth)
- Rank tracking with cache-aware checks
- Activity logging for transparency and accountability

## Architecture Snapshot

KaOten is organized into layered boundaries:

- Dashboard UI layer (tabs and operational controls)
- Server actions layer (session and queue/research access)
- API routes layer (`/api/seo/**` for proposal actions, rank checks, IndexNow, etc.)
- Library/services layer (proposal engine, AI agent, health engine, rank adapters)
- External integrations (Gemini, Search Console, SerpAPI, IndexNow, Firebase)

For full architecture detail, see:

- [docs/kaoten-seo-agent.md](docs/kaoten-seo-agent.md)

## End-to-End Workflow (Condensed)

KaOten follows a clear operating lifecycle:

1. Access control and role validation
2. Dashboard initialization with parallel data loads
3. Keyword research and opportunity capture
4. Queue review, approvals, and execution decisions
5. Content execution and wiring (including sitemap/indexing path)
6. Health re-scoring and rank monitoring
7. Activity review and next-batch planning

The detailed Step 0 to Step 9 flow, including diagrams and execution behavior, is documented in:

- [docs/kaoten-seo-agent.md](docs/kaoten-seo-agent.md)

## Rule System

KaOten enforces non-negotiable SEO quality rules via configuration, including:

- title and description constraints
- keyword placement and list hygiene
- soft CTA policy
- duplicate keyword prevention
- intro/depth requirements
- geographic targeting controls

The commandment-level breakdown and route-level enforcement model are in:

- [docs/kaoten-seo-agent.md](docs/kaoten-seo-agent.md)

## Standalone SaaS Roadmap

KaOten is designed to evolve from internal tool to standalone SaaS in phases:

- Phase 1: Extract and decouple from LaundromatAI-specific assumptions
- Phase 2: Multi-tenant SaaS shell (auth, tenancy, onboarding, billing)
- Phase 3: Universal crawler and automated health scans
- Phase 4: Search Console data integration and quick-win surfaces
- Phase 5: Embeddable install methods (script, package, CMS plugins)
- Phase 6: AI content drafting and generation loops
- Phase 7: Agency and enterprise-grade controls

Full roadmap:

- [docs/kaoten-saas-roadmap.md](docs/kaoten-saas-roadmap.md)

## Repository Scope

This showcase demonstrates:

- role-aware dashboard behavior
- queue and execution UX patterns
- offline-first queue resilience patterns
- public-safe architecture storytelling

This showcase intentionally does not include:

- production credentials or infrastructure secrets
- real customer campaign data
- proprietary internal prompt packages
- private deployment internals

## Quick Start

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run test
npm run coverage
npm run build
```

## Suggested Demo Path (90 seconds)

1. Switch tenant/workspace context
2. Open Proposal Queue and add actions
3. Toggle offline mode and queue actions
4. Return online and sync
5. Trigger simulated failure and inspect retry behavior

## Key Documentation

- [docs/index.md](docs/index.md)
- [docs/kaoten-seo-agent.md](docs/kaoten-seo-agent.md)
- [docs/kaoten-overview.md](docs/kaoten-overview.md)
- [docs/kaoten-saas-roadmap.md](docs/kaoten-saas-roadmap.md)
- [docs/demo-script.md](docs/demo-script.md)
- [docs/hiring-manager.md](docs/hiring-manager.md)

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest
- Firebase-aligned patterns
- SEO operations modules and queue simulation components

## License

MIT

## Author

Sean Sabado  
Founder & CTO - KaOten SEO Agent  
[https://www.linkedin.com/in/seanraynon/](https://www.linkedin.com/in/seanraynon/)
