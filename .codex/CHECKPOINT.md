# NullBreach Checkpoint

Date: 2026-09-23

## Done

- Audited branches, workflows, hooks, tests, deploy configuration, and protection state.
- Confirmed `dev`, `stg`, and `main` already exist locally and remotely.
- Confirmed GitHub currently reports `dev` as the default branch, while local `origin/HEAD` still points to `origin/main`.
- Confirmed the actual stack is Next.js, React, TypeScript, Prisma, PostgreSQL/Supabase, NextAuth, Jest, Playwright, GitHub Actions, and Vercel.
- Added commitlint configuration with the approved NullBreach scopes.
- Wired the existing local commit message hook to commitlint.
- Added a commitlint CI job for pull request commit ranges.
- Restricted accepted work branch names to `feature/*`, `fix/*`, and `chore/*`.
- Kept auto-merge only for PRs into `dev`, using `PROMOTE_TOKEN`.
- Removed automated merge workflows for `stg` and `main`.
- Added scheduled cleanup for merged work branches every 12 hours.
- Added Dependabot for npm and GitHub Actions.
- Updated README, CONTRIBUTING, AGENTS, and CHANGELOG.
- Applied GitHub branch protection to `dev`, `stg`, and `main`.

## Still pending

- Push this setup branch and open a PR into `dev`.
- Wait for all required checks to conclude successfully before allowing the PR into `dev`.
- After merge to `dev`, delete `chore/repo-delivery-guardrails` locally and remotely.

## Findings for Valentina

- The pasted brief expected Django, DRF, Railway, and possible Docker checks. This repository is now a Next.js Vercel app, and no Railway or Docker configuration is present.
- Staging uses the Vercel Preview environment for the same `nullbreach` project. No separate Railway staging service exists or is needed unless Valentina decides to move deploys back to Railway.
- The local Git remote `HEAD` points to `origin/main`, while GitHub's default branch is `dev`. Updating the remote symbolic HEAD would make fresh local clones less confusing.
