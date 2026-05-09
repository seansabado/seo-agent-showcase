# Changelog

All notable changes to this showcase repository are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

- IndexedDB-persisted queue (cross-session durability)
- Dead-letter state for max-retry exhaustion
- Sync conflict resolution ADR + test

---

## [1.2.0] — 2026-05-08

### Added

- **Failure-mode demo** — `Simulate Fail` toggle in POS module lets you inject sync failures mid-process and observe the full retry lifecycle
- **Observability Telemetry Log panel** — real-time trace of every queue state transition (`queued → syncing → synced / failed`) with timestamp, action ID, and event note
- **`docs/hiring-manager.md`** — one-pager summarising what the repo demonstrates, what production problems it addresses, and where to look
- **`docs/demo-script.md`** — 90-second guided demo walkthrough with exact DevTools instructions for Steps 1–4
- **`docs/decisions-index.md`** — ADR summary index with tradeoff rationale and "What I'd Change" section
- **`docs/feature-role-walkthrough.md`** — feature-to-role access matrix, guard mechanics, UI vs data layer distinction
- **`docs/production-hardening.md`** — production patterns beyond the showcase (IndexedDB, backoff, App Check, rate limiting, structured audit log)
- **`docs/index.md`** — full docs navigation index
- **ADR-0004** — queue persistence revised decision documenting the in-memory → IndexedDB transition reasoning
- **4 new unit tests** — failure path, retry count, trace event sequence, clearLog

### Changed

- `useOfflineQueue` accepts `simulateFailure: boolean` parameter; emits `TraceEvent[]` on every lifecycle transition
- `README.md` rewritten with outcomes-first table, 90-second demo path, ADR table, and "Why Safe to Share" section
- CI workflow adds coverage step + artifact upload

---

## [1.1.0] — 2026-05-07

### Added

- Dark marketing-aligned UI theme (violet/cyan accents, glassy cards matching laundromatai.app)
- `hero-card`, `module`, `panel`, `row-card`, `status-pill`, `btn` CSS component classes
- GitHub Pages deployment via `deploy-pages.yml` workflow
- Live demo at [seansabado.github.io/laundromatai-showcase](https://seansabado.github.io/laundromatai-showcase/)

### Fixed

- Vite base path uses `mode`-based config (no `process.env` in CI)

---

## [1.0.0] — 2026-05-01

### Added

- Initial scaffold: React 19 + TypeScript + Vite
- `useOfflineQueue` — offline queue with `queued → syncing → synced / failed` lifecycle
- `useMachineState` — machine state management (idle / in_use / maintenance)
- `tenantGuard` — tenant isolation enforcement
- `callableGuard` — composable auth + tenant + audit wrapper
- Example POS module with fake line items, orders, machines
- Example tenant switcher
- Unit tests for queue lifecycle and tenant guard
- CI quality gate: typecheck + test + build
- ADR-0001, ADR-0002, ADR-0003
- Full docs suite: architecture, offline-mode, multi-tenant-design, firestore-patterns, cloud-functions-patterns, security-boundaries, case-study, interview-walkthrough
