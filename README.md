# NullBreach

NullBreach is an open-source AppSec assistant for authenticated users. It answers secure-development questions and analyzes code for OWASP-aligned risks, impact, and remediation guidance.

The application is a single Next.js deployment containing the UI, authentication, API routes, Prisma data layer, and OpenAI integration. Vercel Microfrontends mounts it under the existing `wavival.dev` domain without coupling its deployment lifecycle to the portfolio.

## Live services

- Production: [wavival.dev/nullbreach](https://wavival.dev/nullbreach)
- Direct production project URL: [null-breach.vercel.app/nullbreach](https://null-breach.vercel.app/nullbreach)
- Staging: [nullbreach-git-stg-wavivals-projects.vercel.app/nullbreach](https://nullbreach-git-stg-wavivals-projects.vercel.app/nullbreach)
- Production deployments: [deployment workflow](https://github.com/wavival/nullbreach/actions/workflows/deploy-production.yml)
- Vercel project: [wavivals-projects/nullbreach](https://vercel.com/wavivals-projects/nullbreach)
- API reference: [docs/api.md](docs/api.md)
- Production health: [`/nullbreach/api/health`](https://wavival.dev/nullbreach/api/health)

Staging uses the Vercel `preview` environment with variables scoped to the `stg` branch. Production uses the Vercel `production` environment and the `main` branch. They use separate Prisma Postgres resources and separate secrets. Automatic Git deployments are disabled, so other branches do not create Vercel deployments.

## Architecture

| Layer          | Technology                                     | Responsibility                           |
| -------------- | ---------------------------------------------- | ---------------------------------------- |
| Application    | Next.js App Router                             | UI, server rendering, and route handlers |
| Authentication | NextAuth Credentials                           | JWT sessions in HTTP-only cookies        |
| Persistence    | Prisma ORM and Prisma Postgres                 | Users, chat history, and code analyses   |
| AI             | OpenAI Responses API                           | Security chat and code analysis          |
| Observability  | Vercel Web Analytics                           | Privacy-aware traffic measurement        |
| Styling        | Tailwind CSS                                   | Responsive interface                     |
| Quality        | Jest, Playwright, ESLint, Prettier, TypeScript | Automated verification                   |
| Delivery       | GitHub Actions and Vercel                      | Gated promotion and deployment           |

See [DESIGN.md](DESIGN.md) for system boundaries and design decisions.

## Repository structure

```text
app/                    Next.js pages, layouts, and API route handlers
components/             Reusable React components
lib/                    Authentication, Prisma, OpenAI, and validation
prisma/                 Database schema and migrations
__tests__/unit/         Jest unit tests
__tests__/e2e/          Playwright end-to-end tests
docs/api.md             HTTP API reference
.github/workflows/      CI, security, promotion gates, and deployments
.githooks/              Local branch, commit, and secret checks
microfrontends.json     Shared-domain routing contract with wavival.dev
```

## Requirements

- Node.js 24.x
- npm 11 or newer
- Access to the existing Prisma Postgres resource, or a compatible local PostgreSQL database
- An OpenAI API key for chat and analysis
- Vercel CLI access only when managing deployments or remote environment variables

## Local development

```bash
nvm use
npm ci
npm run prepare
cp .env.example .env.local
npm run db:migrate:deploy
npm run dev
```

Open [http://localhost:3000/nullbreach](http://localhost:3000/nullbreach).

The committed `.env.example` documents every application variable. `.env.local` is ignored by Git and must contain local-only values. Vercel sensitive variables cannot be downloaded after creation, so replace local placeholders with your own PostgreSQL and OpenAI credentials.

## Environment variables

| Variable          | Classification | Required | Source                                   |
| ----------------- | -------------- | -------- | ---------------------------------------- |
| `DATABASE_URL`    | Secret         | Yes      | Prisma Postgres connection URI           |
| `NEXTAUTH_SECRET` | Secret         | Yes      | `openssl rand -base64 32`                |
| `NEXTAUTH_URL`    | Normal         | Yes      | Full `/nullbreach/api/auth` endpoint URL |
| `OPENAI_API_KEY`  | Secret         | Yes      | OpenAI API key dashboard                 |
| `OPENAI_MODEL`    | Normal         | Yes      | Supported OpenAI model identifier        |

Vercel injects `DATABASE_URL`, `STORAGE_DATABASE_URL`, `STORAGE_PRISMA_DATABASE_URL`, and `STORAGE_POSTGRES_URL` from the connected Prisma Postgres resource. Production uses `prisma-postgres-amber-crystal`; staging uses `nullbreach-stg-postgres`. Application code reads only `DATABASE_URL`; the `STORAGE_*` names remain managed by the integration and must not be copied into client-side variables.

## Database

The Prisma schema defines `User`, `ChatHistory`, and `CodeAnalysis`. Apply committed migrations with:

```bash
npm run db:migrate:deploy
```

Create schema changes with `npx prisma migrate dev --name <description>`. Never edit a migration that has already run in a shared environment.

## API

The API includes registration, NextAuth, authenticated chat, authenticated code analysis, history, and public health checks. Request bodies, response schemas, limits, authentication requirements, and error statuses are documented in [docs/api.md](docs/api.md).

Production API base URL: [https://wavival.dev/nullbreach/api](https://wavival.dev/nullbreach/api)

## Quality checks

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=high
```

`npm run verify` runs linting, formatting checks, Next.js route type generation, TypeScript, Prisma validation, Jest coverage, and the production Webpack build. Playwright runs separately because it starts the application or targets a deployed environment.

## Delivery flow

The only permitted promotion path is:

```text
feature/* | fix/* | chore/*
           -> dev
           -> stg
           -> main
```

- Work PRs target `dev`.
- `dev -> stg` and `stg -> main` are regular promotion PRs.
- No branch advances while a required check is pending, failing, cancelled, skipped after failure, or unavailable.
- A merge into `stg` deploys the Vercel `preview` environment, applies Prisma migrations during the remote build, checks `/nullbreach/api/health`, and runs Playwright.
- A merge into `main` deploys production, applies migrations during the remote build, checks health, and runs Playwright again.
- Work branches are deleted locally and remotely after their successful merge into `dev`.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for the complete contribution and automation rules.

## Security

- Passwords are hashed with bcrypt.
- NextAuth sessions use HTTP-only cookies.
- Database and OpenAI credentials remain server-side.
- API input lengths are bounded before paid or persistent operations.
- CI scans dependencies and Git history for high-severity vulnerabilities and secrets.
- Security headers deny framing, MIME sniffing, and unnecessary browser permissions.
- Vulnerabilities must be reported privately without publishing credentials or exploit details.

## License

NullBreach is released under the [MIT License](LICENSE).
