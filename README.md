# NullBreach

> Open-source AppSec guidance and code analysis for developers who need context before remediation.

NullBreach is an MIT-licensed application-security assistant. Its public, bilingual landing is a static Astro subproject; the authenticated product is a Next.js application with Prisma Postgres, NextAuth, and OpenAI.

## Table of contents

- [Product](#product)
  - [Public landing](#public-landing)
  - [Authenticated product](#authenticated-product)
- [Architecture](#architecture)
- [Public resources](#public-resources)
- [Discoverability](#discoverability)
- [Case study](#case-study)
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

The shared public contract is `https://www.wavival.dev/nullbreach`. The build publishes the Astro output as static files in the Next.js deployment, which serves the exact landing paths (`/nullbreach`, `/nullbreach/en`, sitemap, and robots) and preserves `/nullbreach/:path*` for product routes.

## Public resources

- Product: [www.wavival.dev/nullbreach](https://www.wavival.dev/nullbreach)
- English landing: [www.wavival.dev/nullbreach/en](https://www.wavival.dev/nullbreach/en)
- Sign in: [www.wavival.dev/nullbreach/login](https://www.wavival.dev/nullbreach/login)
- Spanish sign in: [www.wavival.dev/nullbreach/en/login](https://www.wavival.dev/nullbreach/en/login)
- Swagger UI: [production](https://www.wavival.dev/nullbreach/swagger) and [local](http://localhost:3000/nullbreach/swagger)
- OpenAPI document: [production](https://www.wavival.dev/nullbreach/api/openapi) and [local](http://localhost:3000/nullbreach/api/openapi)
- API reference: [docs/api.md](docs/api.md)
- Case study: [docs/case-study.md](docs/case-study.md)
- Repository: [github.com/wavival/nullbreach](https://github.com/wavival/nullbreach)
- Crawler guidance: [robots.txt](https://www.wavival.dev/nullbreach/robots.txt), [sitemap](https://www.wavival.dev/nullbreach/sitemap-index.xml), and [llms.txt](https://www.wavival.dev/nullbreach/llms.txt)

The source includes Swagger and OpenAPI routes. The current production deployment returns `404` for them until it is redeployed with the current source.

## Discoverability

The public landing is the indexable surface. It has localized canonical and alternate URLs, Open Graph and Twitter metadata, JSON-LD software and website data, a sitemap, `robots.txt`, and `llms.txt`.

The authenticated product, API, and Swagger routes are `noindex`. This keeps indexed content focused on the public explanation of the project while preserving navigable technical documentation for people who need it.

The landing uses semantic landmarks, a skip link, labeled navigation, visible keyboard focus, descriptive image alternative text, image dimensions, lazy loading, and reduced-motion behavior. It is static and contains no runtime secrets or client-side application data fetches.

## Case study

Read the [NullBreach case study](docs/case-study.md) for the problem scope, architecture, security boundaries, and public technical resources.

## Quick start

### Requirements

- Node.js 24.x
- npm 11 or newer
- PostgreSQL-compatible `DATABASE_URL`

Google sign-in is enabled only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are configured. See [.env.example](.env.example) for the OAuth callback URLs.

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
