# Changelog

## Unreleased

- Added the Vercel custom `stg` environment and disabled automatic Git deployments.
- Limited deployable environments to `stg` and production from `main`.
- Added database migrations, health checks, and deployed E2E tests to both deployment workflows.
- Pinned runtime dependencies, removed unused Axios code, and resolved high-severity dependency advisories.
- Added input limits, security headers, a database health endpoint, and unit coverage.
- Added English architecture, API, setup, contribution, agent, and environment documentation.
- Added Vercel Microfrontends routing for `wavival.dev/nullbreach` with base-path-aware navigation, authentication, and API calls.
- Separated staging and production into independent Prisma Postgres resources and environment-specific secrets.
- Changed promotion commitlint to validate the Conventional Commit PR title while retaining full commit-range validation for work PRs.

## 2026-09-23

- Allowed Dependabot source branches in branch-flow validation for PRs into `dev`.
- Passed `GITLEAKS_LICENSE` to the gitleaks action.
- Refreshed `.codex/CHECKPOINT.md` after the delivery audit.
- Added commitlint with the NullBreach allowed types and scopes, plus local hook and CI enforcement.
- Restricted work branch naming to `feature/*`, `fix/*`, and `chore/*`.
- Kept auto-merge only for PRs into `dev`, using `PROMOTE_TOKEN`.
- Removed auto-merge workflows for `stg` and `main` so promotion PRs stay manual.
- Added scheduled merged branch cleanup for work branches.
- Added Dependabot configuration for npm and GitHub Actions.
- Updated delivery documentation for the actual Next.js, Prisma, Vercel stack.
- Added the Codex checkpoint for remaining operational findings.
