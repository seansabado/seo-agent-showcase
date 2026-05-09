# Example: Self-Review PR Description

> This is an example of how I write a pull request description for a feature branch.  
> It demonstrates the communication habits I bring to a team: context, decision rationale, test coverage, and explicit callouts for reviewers.  
> See the [live PR example](https://github.com/seansabado/seo-agent-showcase/pulls) for a real version.

---

## PR Title

`feat: offline queue failure-mode demo with trace log observability`

---

## PR Description

### What

Adds a failure-mode demo to the Proposal Queue module and a real-time telemetry log panel so engineers (and interviewers) can observe the full queue lifecycle — including failure, retry, and recovery — not just the happy path.

### Why

The original queue demo only showed the success path (`queued → syncing → synced`). That's not representative of production reliability work. The most important thing an offline queue needs to do is _not lose data on failure_ — and there was no way to demonstrate or verify that behavior without being able to trigger a failure.

This change adds:

- A `Simulate Fail` toggle so you can inject failures at will
- A trace log that records every state transition with timestamp and note
- Tests that cover the failure path, retry increment, clearLog, and skip-already-synced

### Changes

**`useOfflineQueue.ts`**

- Added `simulateFailure: boolean` parameter (no breaking change to the interface structure, just adds a required param — tests updated accordingly)
- Added `TraceEvent` type and `traceLog: TraceEvent[]` state
- Added `clearLog()` callback
- `markStatus` now takes `from` + `to` instead of just `to` — gives the trace log full transition context
- `retryCount` increments on retry (was always 0 before)

**`index.tsx` (Proposal Queue module)**

- Adds `simulateFailure` state wired to the toggle
- Adds Telemetry Log panel with trace rows
- Adds `statusColor()` helper for per-status CSS class
- "Pending Actions" label shortened to "Pending" (fits better in status bar)

**`useOfflineQueue.test.tsx`**

- 4 new tests added: `clearLog`, `retryCount` on retry, skip-already-synced, trace note content on failure
- 8 tests total, all passing

**`styles.css`**

- Trace log styles: `.trace-log`, `.trace-row`, `.trace-state`, per-status color variants
- Toggle styles: `.toggle-label`, `.toggle-text`, `.is-warn`
- New utility classes: `.muted-badge`, `.muted-ts`, `.btn-sm`

### Testing

```bash
npm run typecheck   # 0 errors
npm run test        # 8/8 pass
npm run build       # succeeds
```

All new tests are in `useOfflineQueue.test.tsx`. The failure path and retry count tests use `renderHook` with `rerender` to switch `simulateFailure` mid-test — this exercises the real hook behavior rather than mocking the internals.

### What I Considered But Didn't Do

- **`dead` state after max retries** — I documented this as a gap in [production-hardening.md](../docs/production-hardening.md) and [ADR-0004](../docs/adr/0004-queue-persistence-reversal.md). Adding it to the hook would require a `maxRetries` parameter and a `dead` status — a clean addition, but out of scope for this change.
- **Persisting the trace log to sessionStorage** — decided against it. The trace log is a demo observability tool, not a durable audit log. Persisting it would imply it's the source of truth, which it isn't.

### Reviewer Focus Areas

1. `useOfflineQueue.ts` lines 65–95 — the `markStatus` signature change and `retryCount` increment logic
2. `useOfflineQueue.test.tsx` — the `rerender` test for retry count — confirm this tests the hook correctly under changing props
3. The `Simulate Fail` toggle is a demo-only control. Confirm it's obvious from the UI that it's not a real production mode.
