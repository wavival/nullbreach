# NullBreach

> Open-source AppSec guidance and code analysis for developers who need context before remediation.

**Last updated:** October 4, 2026

NullBreach is an MIT-licensed application-security assistant. Its public, bilingual landing is a static Astro subproject; the authenticated product is a Next.js application with Prisma Postgres, NextAuth, and OpenAI.

## Table of contents

- [Product](#product)
  - [Public landing](#public-landing)
  - [Authenticated product](#authenticated-product)
- [Architecture](#architecture)
- [URLs](#urls)
- [Quick start](#quick-start)
- [Quality and security](#quality-and-security)
- [Contributing and license](#contributing-and-license)

## Product

### Public landing

`apps/landing/` is a static Astro site for the public `/nullbreach` and `/nullbreach/en` routes. It contains the product overview, technical limits, author information, contact details, structured data, canonical URLs, robots directives, and sitemap.

### Authenticated product

The root Next.js application owns sign-in, registration, password recovery, chat, code analysis, history, Swagger, health, API routes, authentication, and persistence. It is not indexable.

## Architecture

| Surface                       | Technology         | Responsibility                        |
| ----------------------------- | ------------------ | ------------------------------------- |
| `apps/landing/`               | Astro              | Static, indexable product landing     |
| `app/`, `components/`         | Next.js App Router | Authenticated product interface       |
| `app/api/`, `lib/`, `prisma/` | Next.js, Prisma    | API boundary, auth, AI, persistence   |
| `.github/workflows/`          | GitHub Actions     | Quality, security, and delivery gates |

The shared public contract is `https://www.wavival.dev/nullbreach`. The parent `wavival-dev` microfrontend must route the exact landing paths (`/nullbreach`, `/nullbreach/en`, sitemap, and robots) to the Astro deployment and preserve `/nullbreach/:path*` for the Next.js product deployment.

## URLs

- Product: [www.wavival.dev/nullbreach](https://www.wavival.dev/nullbreach)
- Sign in: [www.wavival.dev/nullbreach/login](https://www.wavival.dev/nullbreach/login)
- Sign in, Spanish: [www.wavival.dev/nullbreach/en/login](https://www.wavival.dev/nullbreach/en/login)
- Swagger: [www.wavival.dev/nullbreach/swagger](https://www.wavival.dev/nullbreach/swagger)
- OpenAPI: [www.wavival.dev/nullbreach/api/openapi](https://www.wavival.dev/nullbreach/api/openapi)
- Health: [www.wavival.dev/nullbreach/api/health](https://www.wavival.dev/nullbreach/api/health)
- API reference: [docs/api.md](docs/api.md)

## Quick start

### Requirements

- Node.js 24.x
- npm 11 or newer
- PostgreSQL-compatible `DATABASE_URL`
- OpenAI API key for live chat and analysis

### Install and run the product

```bash
git clone git@github.com:wavival/nullbreach.git
cd nullbreach
npm ci
cp .env.example .env.local
npm run db:migrate:deploy
npm run dev
```

Open `http://localhost:3000/nullbreach`.

### Run the landing

```bash
npm run landing:dev
```

Open `http://localhost:4321/nullbreach`.

## Quality and security

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=critical
```

`npm run verify` includes Astro checks and build, Next.js validation and build, Prisma validation, TypeScript, formatting, linting, and unit coverage. Playwright tests the authenticated product separately.

Read [SECURITY.md](SECURITY.md) before reporting a vulnerability. The landing must remain static and free of secrets; the product reads runtime secrets only from server-side environment variables documented in [.env.example](.env.example).

## Contributing and license

Fork, clone, study, modify, and distribute NullBreach under the [MIT License](LICENSE). Contributions follow [CONTRIBUTING.md](CONTRIBUTING.md); work branches target `dev` and advance only after all required checks pass.
