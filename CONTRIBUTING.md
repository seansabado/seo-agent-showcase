# Contributing

## Purpose

This repository is a safe portfolio showcase. Contributions are welcome as long as they preserve the non-proprietary constraint.

## Ground Rules

- Do not add proprietary code, private schemas, credentials, or customer data.
- Keep examples generic, educational, and vendor-safe.
- Prefer small pull requests with clear scope.

## Development Workflow

1. Fork and create a feature branch.
2. Install dependencies: `npm install`.
3. Run quality checks:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
4. Open a pull request with:
   - Summary
   - Rationale
   - Test evidence

## Pull Request Checklist

- [ ] Feature is safe and non-proprietary
- [ ] Tests added/updated where applicable
- [ ] README/docs updated if behavior changed
- [ ] No secrets, tokens, or private identifiers introduced
