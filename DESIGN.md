# NullBreach Design

## Goals

NullBreach provides a focused AppSec workspace where authenticated users can ask secure-development questions, analyze code, and review recent chat history. The design prioritizes a small operational surface, server-side secret handling, and a gated delivery path.

## System context

The browser communicates only with the Next.js application. Route handlers call PostgreSQL through Prisma and OpenAI through the official server SDK. No database credential, session secret, or OpenAI key is exposed to client bundles.

```text
Browser
  -> Public landing (`features/landing/`)
  -> Next.js frontend (`app/`, `components/`)
  -> Next.js backend (`app/api/`, `lib/`, `prisma/`)
     -> NextAuth session validation
     -> Prisma ORM -> Prisma Postgres
     -> OpenAI Responses API
     -> Brevo SMTP API for password resets
```

## Product boundaries

The repository is intentionally monorepo-ready but deploys as one Next.js application:

- Landing: public, bilingual, indexable, lightweight, and independent from authenticated state.
- Frontend: authentication screens and the protected chat and analysis workspace.
- Backend: route handlers, authentication callbacks, validation, provider clients, persistence, and migrations.

The boundaries are folders and runtime responsibilities, not separate packages. A future extraction into workspace packages must preserve the `/nullbreach` public base path and the same environment separation.

## Runtime boundaries

- Client components own forms, navigation, and rendering state.
- Server components protect authenticated pages and load session state.
- Route handlers validate untrusted JSON before database or AI operations.
- `proxy.ts` rejects unauthenticated access to private API paths before route execution.
- Route handlers repeat authorization checks as defense in depth.
- `lib/openai.ts` is the only OpenAI client boundary.
- `lib/prisma.ts` owns the shared Prisma client lifecycle.
- Vercel Web Analytics is mounted once in the root layout.
- Public metadata, sitemap, robots rules, and localized alternates are defined at the route layer. Authentication and protected layouts are explicitly `noindex`.
- The landing uses semantic landmarks, one primary heading, associated labels, keyboard focus styles, a skip link, optimized local imagery, and reduced-motion behavior.
- `app/template.tsx` provides a short navigation transition and `app/loading.tsx` provides the pending state without adding a client-side routing library. Both are disabled effectively for users who request reduced motion.

Production uses the Vercel Marketplace Prisma Postgres resource `prisma-postgres-amber-crystal`; staging uses the independent `nullbreach-stg-postgres` resource. The application consumes the active environment's server-side `DATABASE_URL`. Integration-managed `STORAGE_*` variables are deployment metadata and are not application API contracts.

## Data model

- `User` stores a unique normalized email and a bcrypt password hash.
- Google accounts use an empty password hash and are linked by normalized email in the NextAuth sign-in callback.
- `PasswordResetToken` stores only a SHA-256 token hash, expiration, consumption timestamp, and owning user.
- `ChatHistory` stores each question, generated response, model identifier, and timestamp.
- `CodeAnalysis` stores submitted code, generated vulnerability guidance, and timestamp.
- User deletion cascades to chat and analysis records.
- User and creation-time indexes support recent-history queries.

## API design

The application uses same-origin JSON route handlers. Private routes require a valid NextAuth session cookie. Input limits are enforced before invoking paid services or writing persistent data. Responses use explicit HTTP status codes and a stable `{ "error": "..." }` error shape.

The complete contract is in [docs/api.md](docs/api.md).

## Security controls

- Passwords use bcrypt with cost factor 12.
- Sessions use signed JWTs stored in HTTP-only cookies.
- Credentials remain server-only environment variables.
- Framing, MIME sniffing, referrer leakage, and unused browser permissions are restricted with response headers.
- Chat questions and code submissions have explicit size limits.
- Password reset tokens are single-use and expire after one hour. Brevo credentials remain server-only.
- CI runs linting, type checks, coverage, builds, E2E tests, dependency auditing, static review, and secret scanning.
- Deployment health checks verify database connectivity without returning internal error details.

## Environments and delivery

Only two Vercel deployment targets exist:

- `preview`, used only by the `stg` branch.
- `production`, bound to `main`.

Vercel Microfrontends routes `wavival.dev/nullbreach/:path*` to this independent project. `microfrontends.json` records the contract, while Next.js rewrites the public prefix to the application's internal routes. Browser navigation, API calls, and NextAuth all use `/nullbreach` as their public base path.

Vercel automatic Git deployments are disabled. GitHub Actions requests a remote build for the selected target. Vercel injects that target's sensitive values, applies Prisma migrations, builds the application, publishes the artifact, and returns the deployment URL. GitHub Actions then calls `/nullbreach/api/health` and runs Playwright against the deployed URL.

The branch path is `work branch -> dev -> stg -> main`. Every promotion uses a pull request and stops when any required check is incomplete or unsuccessful.

## Operational constraints

- PostgreSQL and OpenAI are external availability dependencies.
- The health endpoint verifies the application and database boundary, but does not make a paid OpenAI request.
- AI output is guidance, not a substitute for expert review or dedicated security tooling.
- Vercel sensitive values cannot be downloaded after creation. Local development requires separate local credentials.
