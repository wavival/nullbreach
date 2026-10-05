# NullBreach Roadmap

> Last updated: 2026-10-02

What is pending. The detail of each change lives in [CHANGELOG.md](../CHANGELOG.md).

## Needs a decision from the owner

- [x] Move the public landing to Astro under `apps/landing/`; keep the authenticated product in Next.js and preserve `/nullbreach` and `/nullbreach/en` as public landing routes.
- [ ] Decide whether a second registration of an existing email should answer `409` (today) or the same neutral answer as password recovery.
- [ ] Decide how a new account is verified before a Google sign-in can link to it by email.

## Security

- [ ] Rate limit chat and analysis per user. Both routes call a paid provider and today only bound the input size.
- [ ] Rate limit registration and password recovery per IP and per email.
- [ ] Verify the email of an account created with a password before Google can link to it.
- [ ] Invalidate open sessions when the password changes or is reset (JWT sessions are stateless today).
- [ ] Add a content security policy to `next.config.ts` (the other security headers exist).
- [ ] Review the `npm audit` high findings left below the CI threshold (Prisma transitive advisories and PostCSS), listed in `.codex/CHECKPOINT.md`.

## Product

- [ ] Show stored code analyses in the workspace. They are saved in `code_analyses` but no screen or endpoint reads them; only the last ten chat entries appear in the history.
- [ ] Let a user delete a chat entry, an analysis or the whole account. There is no delete endpoint today.
- [ ] Add a unit test for the `503` branch of `reset-password`.
- [ ] Run `npm run test:e2e` in CI against the deployed environments, and document what it needs.

## Portfolio

- [ ] `wavival.dev` `vercel.json` still rewrites `/api/*` to `nullbreach-api.wavival.dev`, and `tests/redirects.spec.ts` protects it as "legacy". The API now lives under `/nullbreach/api`. Decide whether to remove both.
