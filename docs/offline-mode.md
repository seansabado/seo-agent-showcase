# Offline Mode Strategy (Showcase)

## Summary

This guide shows a generic offline-first PWA pattern for POS-like actions. The approach is: capture user intent immediately, store an action queue locally, and sync when connectivity returns.

## Core Pattern

```text
UI Action -> Validate -> Enqueue Locally -> Update UI Optimistically
                           |
                           v
                     Sync Engine (when online)
                           |
                           v
                 Server Acknowledgement / Retry
```

## Queue Model

Each queued action has:

- actionId
- type (example: ORDER_CREATE, PAYMENT_CAPTURE)
- payload (fake, minimal)
- createdAt
- retryCount
- status (queued, syncing, synced, failed)

## Sync Engine Rules

1. Process in FIFO order for predictability.
2. Retry with capped attempts.
3. Mark permanent failures for manual resolution.
4. Keep idempotency key to prevent duplicate writes.

## Fake POS Example Actions

- ORDER_CREATE: create an order with line items
- PAYMENT_MARK_PAID: mark order as paid
- MACHINE_SET_STATE: set machine to in_use or idle

## Pseudocode

```text
if online:
  while queue has items:
    item = nextQueuedItem()
    try sync(item)
      markSynced(item)
    catch temporaryError
      incrementRetry(item)
      stopLoopIfBackoffNeeded()
    catch permanentError
      markFailed(item)
else:
  keepCollectingActions()
```

## UX Expectations

- Show clear offline badge
- Confirm queued actions immediately
- Show queue count and last sync timestamp
- Provide manual retry button for failed items

## Safety Notes

This document and related source files use fake data and generic patterns only.
