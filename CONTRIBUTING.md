# Contributing to NullBreach

Thank you for contributing. This process keeps changes secure, traceable, and deployable.

## Prerequisites

- Node.js 24.x
- npm 11 or newer
- Access to the existing Prisma Postgres resource, or a compatible local PostgreSQL database
- An OpenAI API key for live AI flows

## Setup

```bash
git clone git@github.com:wavival/nullbreach.git
cd nullbreach
nvm use
npm ci
npm run prepare
cp .env.example .env.local
npm run db:migrate:deploy
```

Replace the safe placeholders in `.env.local` with local-only credentials. Never commit that file.

## Branches

Create every work branch from an up-to-date `dev` branch:

```bash
git switch dev
git pull --ff-only
git switch -c feature/short-description
```

Valid prefixes are `feature`, `fix`, and `chore`. Dependabot branches are accepted only when GitHub creates them.

## Commits

Use strict Conventional Commits:

```text
feature(auth): add registration validation
fix(api): reject oversized chat questions
chore(docs): document the health endpoint
```

Allowed types are `feature`, `fix`, and `chore`.

Allowed scopes are `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, and `core`.

Do not use em dashes in commit headers or generated documentation. Local hooks and CI enforce branch names, commit format, and common secret patterns.

## Verification

Run the complete local gate before opening a pull request:

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=high
```

Review the full diff for accidental credentials, generated files, dead code, stale documentation, and unrelated changes.

## Pull requests

1. Open work PRs only against `dev`.
2. Wait for branch validation, commitlint, quality, coverage, build, E2E, static review, dependency audit, and secret scanning. Commitlint validates all work commits and the title of promotion PRs.
3. Merge only after every required check succeeds.
4. Promote with `dev -> stg`, then `stg -> main`.
5. Do not merge a promotion while any check or applicable deployment is incomplete.
6. Delete the merged work branch locally and remotely after the merge into `dev` is confirmed.

The `stg` and `main` branches are permanent and must never be deleted.

## Database changes

Create a new migration for every schema change:

```bash
npx prisma migrate dev --name short-description
npm run db:validate
```

Never rewrite an applied migration. Deployment workflows run `prisma migrate deploy` before publishing the new artifact.

## API changes

Update [docs/api.md](docs/api.md) whenever a route, method, authentication rule, request body, response body, limit, or status code changes. Update `.env.example`, README, CLAUDE, AGENTS, and DESIGN when their documented contract changes.

## Security reports

Do not open a public issue containing secrets, personal data, private URLs, or actionable exploit details. Use GitHub's private vulnerability reporting for suspected security issues.

## License

By contributing, you agree that your contribution is licensed under the repository's [MIT License](LICENSE).
