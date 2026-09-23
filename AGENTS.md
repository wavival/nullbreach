# NullBreach Delivery Rules

## Promotion gate - mandatory

Never create, merge, push, or otherwise promote changes to the next environment branch while any required check for the current source commit is pending, failing, cancelled, skipped because of a failure, or unavailable.

The only valid direction is `feature/* -> dev -> stg -> main`. A source commit may advance only after all required quality, security, test, review, and applicable deployment checks have concluded successfully. A deployment that was not configured or was skipped is not evidence that the source is eligible for promotion.

When a check fails, stop the promotion flow. Diagnose and correct the failure on a permitted source branch, re-run the full check set, and verify every required check is green before proceeding.

## Branch model

- `main` is production.
- `stg` is staging.
- `dev` is the integration base for every `feature/*`, `fix/*`, and `chore/*` branch.
- Every work PR targets `dev`.
- `dev` to `stg` and `stg` to `main` are promotion PRs, never direct pushes.
- `dev` PRs may auto-merge only after every required check is green.
- `stg` and `main` promotions are manually merged by Valentina until she explicitly changes this policy.

## Commit convention

Use Conventional Commits in English:

```text
type(scope): message
```

Allowed types: `feature`, `fix`, `chore`.

Allowed scopes: `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, `core`.

Commit messages and generated docs must not include em dashes.

## Required checks

Branch protection for `dev`, `stg`, and `main` must require:

- branch flow validation
- commitlint
- lint, format, unit coverage, and Next.js build
- Playwright E2E tests
- automated static review
- secret and dependency scanning

This app is a Next.js App Router, React, TypeScript, Prisma, PostgreSQL/Supabase, NextAuth, Jest, Playwright, GitHub Actions, and Vercel project. Use Node.js 20 or newer locally. CI currently uses Node.js 20 for quality checks and Node.js 22 for Vercel deploy jobs.

## Cleanup after merge - mandatory

When a work branch has been successfully merged into `dev` and the merge is confirmed, delete that branch from both the remote and the local checkout. Perform cleanup only after the successful merge; never delete a branch with an open PR, pending checks, unmerged work, or one of the permanent environment branches.

The permanent branches are `dev`, `stg`, and `main`. At the end of a completed delivery flow, no `feature/*`, `fix/*`, or `chore/*` branch may remain locally or remotely.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
