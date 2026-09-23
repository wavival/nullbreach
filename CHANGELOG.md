# Changelog

## 2026-09-23

- Added commitlint with the NullBreach allowed types and scopes, plus local hook and CI enforcement.
- Restricted work branch naming to `feature/*`, `fix/*`, and `chore/*`.
- Kept auto-merge only for PRs into `dev`, using `PROMOTE_TOKEN`.
- Removed auto-merge workflows for `stg` and `main` so promotion PRs stay manual.
- Added scheduled merged branch cleanup for work branches.
- Added Dependabot configuration for npm and GitHub Actions.
- Updated delivery documentation for the actual Next.js, Prisma, Vercel stack.
- Added the Codex checkpoint for remaining operational findings.
