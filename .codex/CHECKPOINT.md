# NullBreach Codex Context

- Read `AGENTS.md` before changing or promoting code.
- Use Node.js 24.x and npm 11 or newer.
- Start work from `dev` in a `feature/*`, `fix/*`, or `chore/*` branch.
- Run `npm run verify`, `npm run test:e2e`, and `npm audit --audit-level=high` before opening a PR.
- Promote only through `work branch -> dev -> stg -> main`.
- Vercel deploys only the custom `stg` environment and `production`.
- API contracts are in `docs/api.md`.
- Architecture and trust boundaries are in `DESIGN.md`.
- Local secrets belong only in the ignored `.env.local` file.
