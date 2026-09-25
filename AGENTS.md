# NullBreach Delivery Rules

## Promotion gate

Never create, merge, push, or otherwise promote changes to the next environment branch while a required check for the current source commit is pending, failing, cancelled, skipped after a failure, or unavailable.

The only valid direction is `feature/* -> dev -> stg -> main`. A source commit may advance only after all required quality, security, test, review, and applicable deployment checks finish successfully.

When a check fails, stop the promotion flow. Correct the failure on a permitted source branch, rerun the complete check set, and verify every required check before continuing.

## Branch model

- `main` is production.
- `stg` is staging.
- `dev` is the integration base for `feature/*`, `fix/*`, and `chore/*`.
- Every work PR targets `dev`.
- `dev -> stg` and `stg -> main` are promotion PRs, never direct pushes.
- Work PRs may auto-merge into `dev` only after every required check passes.
- Promotion PRs are merged only after their complete check set passes.

## Vercel environments

Only two deployable environments are permitted:

- `preview`: Vercel Preview environment, used only by the `stg` branch.
- `production`: Vercel production environment, branch `main`.

Automatic Git deployments are disabled. GitHub Actions is the only deployment path. Never deploy `dev`, work branches, Dependabot branches, or Preview deployments from branches other than `stg`.

Staging and production must never share a Prisma Postgres resource, session secret, or OpenAI API key. Production uses `prisma-postgres-amber-crystal`; staging uses `nullbreach-stg-postgres`.

The application is mounted at `/nullbreach` as a Vercel child microfrontend of `wavival-dev`. Keep `microfrontends.json`, `lib/paths.ts`, Next.js rewrites, NextAuth configuration, browser links, and API calls aligned with that public base path.

## Commit convention

Use Conventional Commits in English:

```text
type(scope): message
```

Allowed types: `feature`, `fix`, `chore`.

Allowed scopes: `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, `core`.

Commit headers and generated documentation must not contain em dashes.

## Required checks

Branch protection for `dev`, `stg`, and `main` must require:

- branch flow validation
- commitlint for every work commit and each promotion PR title
- lint, format, TypeScript, Prisma validation, unit coverage, and Next.js build
- Playwright E2E tests
- automated static review
- secret and dependency scanning
- successful staging deployment before production promotion

Use Node.js 24.x and npm 11 or newer. The stack is Next.js App Router, React, TypeScript, Prisma ORM, Prisma Postgres, NextAuth, Jest, Playwright, GitHub Actions, and Vercel.

## Documentation

Keep `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `DESIGN.md`, `docs/api.md`, and `.env.example` in English and synchronized with behavior. Remove stale instructions in the same change that invalidates them.

## Cleanup after merge

After a work branch merges successfully into `dev`, delete it from the remote and local checkout. Never delete a branch with an open PR, pending checks, unmerged work, or one of the permanent branches.

The permanent branches are `dev`, `stg`, and `main`. At the end of a completed delivery flow, no merged `feature/*`, `fix/*`, or `chore/*` branch may remain locally or remotely.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
