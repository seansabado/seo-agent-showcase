# Interview Walkthrough Script

## 5-Minute Version

1. Context

- This repo is a safe showcase of my architecture style for multi-tenant SaaS.

1. Architecture

- I separate client, callable function, and data boundaries.
- Tenant isolation is enforced in both design and guard patterns.

1. Offline Strategy

- UI actions are captured immediately.
- Actions are queued and replayed when online.

1. Reliability + Security

- Auth and tenant guard wrappers are reusable.
- Audit logs are written for sensitive operations.

1. Engineering Quality

- Type-safe code, tests, and CI pipeline are included.

## 15-Minute Deep Dive

1. Start at `README.md` for goals and constraints.
2. Show `docs/architecture.md` and ADR decisions.
3. Walk through `src/example-pos/` proposal queue flow.
4. Walk through `src/example-functions/` guard composition.
5. Show test files and CI workflow.
6. Close with tradeoffs and future work from case study.

## Common Questions + Suggested Answers

Q: Why generic examples instead of real code?
A: To protect proprietary assets while still demonstrating implementation quality and decision process.

Q: How do you prevent cross-tenant leaks?
A: Tenant context on client + tenant guards on callable layer + deny-by-default access philosophy.

Q: What shows this is production-minded?
A: Reusable guard composition, offline queue pattern, typed contracts, tests, and CI enforcement.
