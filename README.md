# NullBreach

Full-stack Next.js App Router migration from Django REST + React, backed by Prisma/Supabase, NextAuth, and the OpenAI API.

## Local development

1. Copy `.env.example` to `.env.local` and configure `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `OPENAI_API_KEY`, and `OPENAI_MODEL`.
2. Run `npm install` and `npm run prepare` to install the repository Git hooks.
3. After connecting Supabase, run `npx prisma migrate deploy`.
4. Run `npm run dev`.

Useful checks are `npm run lint`, `npm run test`, `npm run test:coverage`, `npm run test:e2e`, and `npm run build`.

## Development workflow

Create a `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`, `test/*`, `ci/*`, or `security/*` branch. Use conventional commits such as `feat(auth): add registration`. Open a PR into `dev`; automation promotes `dev` to `stg`, then `stg` to `main`. Direct commits to these three branches are prohibited.

Staging is configured for `stg.nullbreach.vercel.app`, and production for `nullbreach.vercel.app`. Configure the Vercel repository secrets and GitHub branch rules described in `CLAUDE.md` before enabling deployments or auto-merge.

Never commit secrets. `.env.local` is ignored by Git.
