# NullBreach engineering workflow

Work from a feature branch into `dev`, then promote `dev` to `stg`, and `stg` to `main`. Do not commit directly to `dev`, `stg`, or `main`.

- Branches use `tipo/descripcion-corta`, where tipo is `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, or `security`.
- Commits use `tipo(scope): descripcion`. Scopes are `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, and `core`.
- Never use an em dash in a commit subject.
- `dev` merges with squash; the `stg` to `main` promotion is a regular merge.
- Install local controls after cloning with `npm run prepare`. Hooks can only be bypassed for exceptional maintenance with `SKIP_HOOKS=true`.
- GitHub workflows validate branch flow, CI, tests, static review, promotion, deployment, and security. Repository branch rules must require these checks and disallow direct pushes.
