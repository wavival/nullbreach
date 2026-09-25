# NullBreach Checkpoint

Date: 2026-09-23

## Done

- Re-audited branches, workflows, hooks, tests, deploy configuration, and protection state.
- Confirmed `dev`, `stg`, and `main` already exist locally and remotely.
- Confirmed GitHub currently reports `dev` as the default branch, and a fresh clone now points local `origin/HEAD` to `origin/dev`.
- Confirmed the actual stack is Next.js, React, TypeScript, Prisma, PostgreSQL/Supabase, NextAuth, Jest, Playwright, GitHub Actions, and Vercel.
- Confirmed `dev`, `stg`, and `main` branch protection already enforces admins, requires 0 approving reviews, blocks force-pushes and branch deletion, and requires `validate-source`, `commitlint`, `quality`, `scan`, `test`, and `static-review`.
- Added commitlint configuration with the approved NullBreach scopes.
- Wired the existing local commit message hook to commitlint.
- Added a commitlint CI job for pull request commit ranges.
- Restricted accepted work branch names to `feature/*`, `fix/*`, and `chore/*`.
- Kept auto-merge only for PRs into `dev`, using `PROMOTE_TOKEN`.
- Removed automated merge workflows for `stg` and `main`.
- Added scheduled cleanup for merged work branches every 12 hours.
- Added Dependabot for npm and GitHub Actions.
- Updated branch source validation so Dependabot PR branches can target `dev`.
- Passed the org-level `GITLEAKS_LICENSE` secret to the gitleaks action.
- Updated README, CONTRIBUTING, AGENTS, and CHANGELOG.
- Applied GitHub branch protection to `dev`, `stg`, and `main`.

## Still pending

- Push this audit branch and open a PR into `dev`.
- Wait for all required checks to conclude successfully before allowing the PR into `dev`.
- After merge to `dev`, delete `chore/nullbreach-delivery-audit` locally and remotely.
- Review high-severity npm audit findings below the current critical CI threshold: Prisma transitive advisories and PostCSS advisories.

## Findings for Valentina

- The pasted brief expected Django, DRF, Railway, and possible Docker checks. This repository is now a Next.js Vercel app, and no Railway or Docker configuration is present.
- Staging uses the Vercel Preview environment for the same `nullbreach` project. No separate Railway staging service exists or is needed unless Valentina decides to move deploys back to Railway.
- The scheduled branch cleanup workflow currently deletes merged `feature/*`, `fix/*`, and `chore/*` branches using `PROMOTE_TOKEN`. Keep this only if Valentina explicitly accepts scheduled deletion as the cleanup mechanism.
