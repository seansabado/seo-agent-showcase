# KaOten SEO Agent Reference (Public-Safe)

## Summary

KaOten is an AI-native SEO intelligence and execution system designed to turn SEO work into a visible, reviewable, operations workflow.

In the public showcase context, KaOten demonstrates how an SEO platform can combine:

- keyword research
- proposal generation
- approval and queue management
- execution logging
- ranking checks
- page-health scoring

This document keeps the substance of the system while removing secrets, private infrastructure details, and internal-only identifiers.

## Core Purpose

KaOten exists to solve a scaling problem: manual SEO planning does not keep up once a team must continuously identify opportunities, propose content, approve work, execute changes, and audit outcomes across many pages.

KaOten addresses that with a structured flow:

1. gather search and page-health signals
2. generate proposals from those signals
3. route proposals through human approval
4. execute approved work into content artifacts
5. monitor resulting quality and ranking outcomes

## System Layers

```text
KaOten Dashboard UI
  -> Signal / Research / Queue / Ranks / Activity surfaces
  -> Server-side actions and session logic
  -> SEO API routes
  -> Libraries (health scoring, proposal engine, ranking, AI integration)
  -> External providers (search data, AI, indexing, auth, data store)
```

### Primary surfaces

| Surface  | Purpose                                                 |
| -------- | ------------------------------------------------------- |
| Signal   | Show system health, page scores, and suggestion batches |
| Research | Analyze keyword opportunities and competitive context   |
| Queue    | Review, approve, reject, and execute proposal items     |
| Ranks    | Check and interpret ranking performance                 |
| Activity | Preserve an audit-friendly execution history            |

## Configuration Model

KaOten follows a single-source-of-truth configuration pattern through a central config file. In practice, that config governs:

- title and description length constraints
- keyword-list sizing and uniqueness rules
- CTA policy
- minimum section depth
- locale and market defaults
- paths for logs, proposal storage, and content outputs

The key design rule is simple: policy belongs in configuration, not scattered across routes and components.

## SEO Quality Commandments

KaOten applies a policy layer before content is accepted for execution. In public-safe form, the most important rules are:

1. title length limits
2. description length limits
3. early keyword placement
4. keyword-list boundaries
5. approved CTA endings only
6. clean title formatting
7. no orphan-page creation
8. no duplicate keywords
9. introduction requirement
10. minimum section count
11. market and locale consistency

These are enforced as validation rules, not just editorial suggestions.

## Complete Workflow

### Step 0: access and session

- user enters the dashboard
- auth/session checks gate access
- approved users receive a live dashboard session

### Step 1: initialization

- health data loads
- research and queue history loads
- suggestion batches load
- the Signal surface becomes the default overview

### Step 2: research

- user submits a keyword or opportunity prompt
- search context and AI analysis are combined
- KaOten returns metrics, competitor context, and suggested directions
- user may add an item to the queue

### Step 3: proposal creation

Proposal items may come from:

- automatically generated suggestion batches
- manual queue entry
- research-driven recommendation flows

Each proposal typically contains:

- action type
- target path or content destination
- summary
- rationale
- effort estimate
- metadata and section guidance

### Step 4: queue review

Queue items move through explicit states:

- proposed
- approved
- executed
- rejected

Reviewers can inspect proposal details before approval and can choose between delayed execution and immediate execution.

### Step 5: execution

Execution performs the following conceptual steps:

1. validate proposal metadata against configured rules
2. generate content using model-assisted logic
3. write output to the proper content destination
4. wire it into discovery/navigation structures
5. log the execution event
6. trigger indexing submission through a safe integration path

### Step 6: health re-scoring

After execution, KaOten re-evaluates page health based on factors such as:

- metadata completeness
- schema presence
- content depth
- internal linking strength

### Step 7: rank monitoring

KaOten performs on-demand or scheduled ranking checks and returns:

- current position or unranked state
- cache-aware freshness indicators
- priority-tier summaries
- direct review links for local/live/search inspection

### Step 8: activity and audit trail

Every significant queue or execution action is reflected in activity history so the system remains explainable and reviewable.

## Representative API Surface

The real system uses multiple SEO-oriented routes. In public-safe form, the representative categories are:

- execute proposal
- update queue status
- rank check
- save proposal
- search context retrieval
- indexing submission
- health or research option marking

API expectations:

- validated payloads
- explicit error messaging
- idempotent writes when applicable
- audit logging on sensitive transitions

## Tabs and Feature Behavior

### Signal

- health score overview
- key stats and trend cards
- suggestion panels
- page health table

### Research

- query input
- competitor/snippet context
- AI recommendation output
- queue handoff path

### Queue

- grouped/sorted status view
- expandable entries
- approve, reject, and execute actions

### Ranks

- ranking summary cards
- freshness/cost-aware checks
- inspection links and trend badges

### Activity

- chronological feed
- actor/action/result summary
- batch and history context

## Rules Engine and Validation

KaOten validation happens across three layers:

1. metadata validation before execution
2. generated-content validation after model output
3. health scoring after the result is written or registered

Typical failure classes include:

- validation failure
- model timeout or generation failure
- write failure
- external-rate-limit or cache fallback behavior

## Security and Safe-Share Rules

This document excludes:

- API keys and secrets
- verification tokens
- internal-only routes and identifiers
- customer-identifying data
- private infrastructure topology

If adapting the pattern, all sensitive values should be stored in environment-specific secret managers and never in repository docs.

## Rationale

KaOten is strongest when it behaves like an operations system, not a black-box content toy. The emphasis on policy, queue states, auditability, and health scoring is what makes it product-grade.

## Risks

- over-sanitization can make the system seem simpler than it is
- stale documentation can drift from configuration and code behavior
- public documentation can accidentally expose internals if not reviewed carefully

## Next Steps

1. Pair this document with `kaoten-saas-roadmap.md` for product graduation strategy.
2. Pair it with `kaoten-architecture-deep-dive.md` for lower-level reliability details.
3. Extend public docs with schema examples and non-sensitive sample payloads.
