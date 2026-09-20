# Contribuir a NullBreach

Gracias por contribuir. Este proceso mantiene la aplicación segura, trazable y desplegable.

## Antes de empezar

1. Lee [README.md](README.md), [CLAUDE.md](CLAUDE.md) y [AGENTS.md](AGENTS.md).
2. Configura `.env.local` desde `.env.example`; nunca copies secretos a archivos versionados.
3. Instala dependencias y hooks:

   ```bash
   npm install
   npm run prepare
   ```

4. Crea una rama desde `dev`:

   ```bash
   git switch dev
   git pull --ff-only
   git switch -c feat/descripcion-corta
   ```

Prefijos válidos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci` y `security`.

## Convenciones de commits

Usa Conventional Commits estricto: `tipo(scope): descripcion`.

```text
feat(auth): add registration validation
fix(api): reject empty chat questions
docs(core): explain prisma migration
```

Scopes: `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, `core`. No uses em dash (`—`) en asuntos. Los hooks bloquean formatos inválidos; `SKIP_HOOKS=true` es solo para mantenimiento excepcional y documentado.

## Validación local

```bash
npm run lint
npm run format:check
npm run test:coverage
npm run build
```

Para E2E locales instala el navegador Playwright cuando sea necesario y ejecuta `npm run test:e2e`. Las pruebas contra staging necesitan `E2E_BASE_URL` y una instancia configurada.

## Pull requests y promoción

1. Abre el PR solo hacia `dev`.
2. Espera calidad, seguridad, revisión estática, pruebas y despliegues aplicables en verde.
3. Fusiona por squash a `dev`.
4. El único siguiente PR es `dev → stg`; después `stg → main` con merge regular.

No hagas push directo, merge manual ni PRs que salten ramas. Si un check falla, corrígelo en una rama permitida y vuelve a validar. Un staging sin deploy real no habilita promoción.

## Cleanup obligatorio

Tras confirmar que una rama de trabajo se fusionó con éxito a `dev`, elimínala local y remotamente:

```bash
git push origin --delete tipo/descripcion-corta
git branch -d tipo/descripcion-corta
```

No elimines `dev`, `stg` ni `main`.

## Seguridad y datos

- No expongas secretos, credenciales, URLs privadas o datos de usuario en PRs, logs o issues.
- Reporta vulnerabilidades de manera privada.
- Para Prisma, crea una migración nueva y no modifiques migraciones aplicadas.
- Revisa con especial cuidado autenticación, autorización API, validación de entradas y cambios de CI/CD.
