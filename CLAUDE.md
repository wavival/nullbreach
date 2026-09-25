# NullBreach Engineering Guide

## Product and architecture

NullBreach is a single Next.js App Router application. The repository root contains the only deployable application.

- UI and routes: `app/` and `components/`.
- Authentication: NextAuth Credentials with JWT sessions in HTTP-only cookies.
- Data: Prisma ORM with separate Vercel Marketplace Prisma Postgres resources for production (`prisma-postgres-amber-crystal`) and staging (`nullbreach-stg-postgres`), with the schema in `prisma/schema.prisma`.
- AI: the OpenAI SDK is used only by server-side modules and route handlers.
- Tests: Jest in `__tests__/unit` and Playwright in `__tests__/e2e`.
- API contract: `docs/api.md`.
- Design decisions: `DESIGN.md`.

Do not reintroduce Django, Vite, Astro, client-side AI keys, or browser-managed authentication tokens.

## Runtime and commands

Use Node.js 24.x and npm 11 or newer.

```bash
npm ci
npm run prepare
npm run verify
npm run test:e2e
```

Use `npm run db:migrate:deploy` for committed migrations. Create schema changes with a new Prisma migration and never edit a migration already applied to a shared environment.

## Conventions

- Work branches: `feature/*`, `fix/*`, or `chore/*`.
- Commits: `type(scope): message`.
- Allowed types: `feature`, `fix`, and `chore`.
- Allowed scopes: `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, and `core`.
- Commit headers and generated documentation must not contain em dashes.
- Remove unused dependencies, variables, imports, routes, and documentation in the same change that makes them obsolete.

## Mandatory delivery flow

Only `feature/* -> dev -> stg -> main` is permitted. Never commit directly to an environment branch.

- Work PRs target `dev` and may use squash merge after every required check passes.
- `dev -> stg` and `stg -> main` use promotion PRs.
- Commitlint validates every work commit and the Conventional Commit title of each promotion PR, so historical commits do not block environment synchronization.
- A source commit cannot advance while any required check is pending, failing, cancelled, skipped after failure, or unavailable.
- `stg` must deploy successfully before a `stg -> main` promotion.
- Delete merged work branches locally and remotely after confirming the merge into `dev`.

## Vercel environments

Only two deployable environments are used:

- `preview`: the Vercel Preview environment used only by the `stg` branch.
- `production`: the Vercel production environment bound to `main`.

Automatic Git deployments are disabled in `vercel.json`. GitHub Actions performs all builds, migrations, deployments, health checks, and deployed E2E tests. Do not deploy `dev`, feature branches, Dependabot branches, or previews from branches other than `stg`.

The Vercel project is a child microfrontend of `wavival-dev`. Its public base path is `/nullbreach`; keep `microfrontends.json`, `lib/paths.ts`, Next.js rewrites, NextAuth `basePath`, browser links, and API requests synchronized. The default application repository owns the production routing source of truth.

## Secrets and data

- Never commit `.env.local`, `DATABASE_URL`, `NEXTAUTH_SECRET`, `OPENAI_API_KEY`, Vercel tokens, or database credentials.
- Keep `.env.example` explanatory and free of real credentials.
- Variables prefixed with `NEXT_PUBLIC_` are browser-visible and must never contain secrets.
- Treat authentication, authorization, untrusted input, migrations, and CI/CD as security-sensitive changes.

`AGENTS.md` is the authoritative delivery policy for automated agents.
