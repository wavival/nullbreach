# NullBreach

NullBreach is a full-stack cybersecurity assistant built with Next.js App Router, Prisma/Supabase, NextAuth, and the OpenAI API.

## Migration overview

The previous codebase was a two-application monorepo:

- `apps/frontend`: a standalone Vite + React client responsible for the user interface and API calls.
- `apps/backend`: a Django REST API responsible for authentication, chat, code analysis, rate limiting, and persistence.

That split required separate builds, runtimes, deployment configuration, authentication boundaries, and duplicated operational documentation. It also left the frontend and API with different release paths.

The repository now contains one Next.js application at its root. The migration consolidated the system to:

- Next.js App Router for UI, server routes, and deployment unit.
- NextAuth credentials sessions with secure httpOnly cookies.
- Prisma as the database access layer and a PostgreSQL/Supabase-ready initial migration.
- OpenAI's server-side SDK for chat and code analysis endpoints.
- Jest, Playwright, local Git hooks, GitHub Actions, and Vercel deployment workflows.

The Django and legacy Vite/Astro code was intentionally removed after its behavior was represented in the new application. The initial Prisma migration remains unapplied until a Supabase `DATABASE_URL` is configured.

## Local development

1. Copy `.env.example` to `.env.local` and configure `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `OPENAI_API_KEY`, and `OPENAI_MODEL`.
2. Run `npm install` and `npm run prepare` to install the repository Git hooks.
3. After connecting Supabase, run `npx prisma migrate deploy`.
4. Start the application with `npm run dev`.

Useful checks are `npm run lint`, `npm run test`, `npm run test:coverage`, `npm run test:e2e`, and `npm run build`.

## Development workflow

The only allowed promotion path is:

```text
feat/* | fix/* | chore/* | docs/* | refactor/* | test/* | ci/* | security/*
                                  ↓
                                 dev
                                  ↓
                                 stg
                                  ↓
                                main
```

Create a feature branch and use conventional commits such as `feat(auth): add registration`. Open a PR into `dev`; promote only `dev → stg`, then only `stg → main`. Do not commit, merge, or open promotion PRs that bypass that sequence. The feature-to-`dev` merge uses squash; the `stg`-to-`main` promotion uses a regular merge.

Staging is configured for `stg.nullbreach.vercel.app`, and production for `nullbreach.vercel.app`. Configure the Vercel repository secrets and GitHub branch rules described in `CLAUDE.md` before enabling deployments or auto-merge.

Never commit secrets. `.env.local` is ignored by Git.

## Vercel authentication URLs

Set `NEXTAUTH_URL` to the canonical HTTPS URL for each deployment environment,
or remove it to let NextAuth use Vercel's automatic `VERCEL_URL`. Leave
`NEXTAUTH_URL_INTERNAL` unset unless a separate internal authentication URL is
needed. Do not save these variables as empty strings: NextAuth attempts to parse
them when `SessionProvider` is imported, which can fail prerendering even on
`/_not-found`. The Next.js configuration removes blank URL values before loading
the application so the normal NextAuth fallbacks can apply.
