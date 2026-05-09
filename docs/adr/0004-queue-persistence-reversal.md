# ADR 0004: Queue Persistence — Revised Decision

## Status

Supersedes: Initial approach (in-memory only)  
Current status: **Accepted with documented gap**

---

## Context

When I first implemented `useOfflineQueue`, I used React `useState` for the queue. This made the initial implementation simple, easy to test, and readable — all valid goals for a showcase repo.

However, after using it interactively and thinking through production scenarios, I realized the in-memory approach has a user-trust failure mode that matters more than the implementation simplicity benefit.

---

## The Problem With the Original Decision

If a user:

1. Goes offline
2. Creates 5 orders (they queue correctly)
3. Closes the browser tab before coming back online
4. Reopens the app

...all 5 queued orders are **silently gone**. The queue was in React state, which lives in the JavaScript runtime, which is destroyed when the tab closes.

From a user's perspective, they did the right thing. The system acknowledged their orders. The system lied.

This is worse than showing an error. An error can be corrected. Silent data loss creates operational chaos: the staff thinks the orders went through, the manager reconciles the day and finds missing revenue, and no one knows what happened.

---

## The Decision I Should Have Made

Queue items should be persisted to **IndexedDB** (via a lightweight wrapper like `idb-keyval`) so they survive:

- Tab close and reopen
- Browser refresh
- App crash
- Device restart (within browser storage retention)

The queue in React state would then be a **view** of the IndexedDB store, not the source of truth.

### Why I Didn't Do It in This Showcase

1. **Adds a browser storage dependency** — `idb-keyval` (~1KB) is small, but it changes the architecture surface of a showcase repo that aims to be readable without setup
2. **Complicates the test setup** — testing IndexedDB in jsdom requires additional mocking, which would make the test file longer without adding conceptual value for the showcase's purpose
3. **The showcase is explicitly not production** — the in-memory approach is correct for the showcase's goal

### What I'd Do in Production

```ts
// On mount: load queue from IndexedDB into state
// On enqueue: write to IndexedDB AND update state
// On status change: update IndexedDB AND update state
// On clear: delete from IndexedDB AND update state
```

The React state becomes a read cache. IndexedDB is the persistent write store. Both are always in sync.

---

## What This Decision Taught Me

The original decision wasn't wrong for the context (showcase). But the instinct to reach for `useState` first without asking "what does this data need to survive?" is a pattern worth checking every time I design state that represents something the user cares about.

**Rule I now apply:** Any state that represents a user action that the user expects to persist across page load deserves a persistence question before the implementation question.

---

## Consequences

- In-memory queue documented as a known gap (see [production-hardening.md](../production-hardening.md))
- Production implementation path documented above
- Future ADR: sync conflict resolution when persisted items replay against a server that has diverged
