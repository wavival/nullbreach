# Guía de ingeniería de NullBreach

## Producto y arquitectura

NullBreach es una aplicación Next.js App Router consolidada desde un frontend Vite/React y una API Django REST. La raíz del repositorio contiene la única aplicación desplegable.

- UI y rutas: `app/` y `components/`.
- Autenticación: NextAuth Credentials con sesiones JWT en cookies `httpOnly`.
- Datos: Prisma y PostgreSQL/Supabase; esquema en `prisma/schema.prisma`.
- IA: OpenAI SDK solo en `lib/openai.ts` y rutas de servidor.
- Pruebas: Jest en `__tests__/unit`, Playwright en `__tests__/e2e`.

No reintroducir clientes Django, Vite/Astro, claves de IA en cliente ni tokens de autenticación en almacenamiento del navegador.

## Convenciones

- Ramas: `feat|fix|chore|docs|refactor|test|ci|security/descripcion-corta`.
- Commits: `tipo(scope): descripcion`.
- Scopes: `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps`, `core`.
- No usar em dash en el asunto de un commit.
- Ejecutar `npm run prepare` después de clonar para instalar hooks.
- Ejecutar `npm run lint`, `npm run test:coverage`, `npm run format:check` y `npm run build` antes de abrir un PR.

## Flujo obligatorio

Solo se permite `feature/* → dev → stg → main`. No hacer commits directos a ramas de entorno.

- Feature a `dev`: squash merge tras checks verdes.
- `dev` a `stg`: únicamente tras deploy de staging exitoso y real.
- `stg` a `main`: merge regular tras checks, revisión y validación de staging.
- Si un check falla, está pendiente, cancelado o no disponible, detener el flujo y corregir en una rama permitida. Nunca ignorar un fallo para promocionar.
- Tras fusionar una rama de trabajo en `dev`, eliminarla local y remotamente. No borrar `dev`, `stg` ni `main`.

`AGENTS.md` es la fuente obligatoria de estas reglas para automatización.

## Datos y secretos

- Nunca versionar `.env.local`, `DATABASE_URL`, `NEXTAUTH_SECRET` u `OPENAI_API_KEY`.
- Usar `.env.example` como plantilla sin valores sensibles.
- Crear cambios de esquema mediante migraciones Prisma; no modificar migraciones aplicadas.
- Los despliegues Vercel requieren secretos GitHub y variables Vercel. Sin configuración real, no promover a staging.

## Revisión de cambios

Priorizar autenticación, autorización de rutas API, entradas no confiables, secretos, esquema Prisma, compatibilidad de migraciones y efectos en CI/CD. Mantener código y documentación para colaboradores en español.
