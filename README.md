# NullBreach

NullBreach es un asistente de ciberseguridad full-stack. Permite a usuarios autenticados consultar dudas de desarrollo seguro y analizar fragmentos de código para identificar riesgos OWASP, impacto y medidas de remediación.

La aplicación se ejecuta como una única unidad Next.js: la interfaz, autenticación, rutas de API y capa de despliegue viven en este repositorio.

## Índice

- [Migración](#migración)
- [Arquitectura](#arquitectura)
- [Estructura](#estructura-del-repositorio)
- [Desarrollo local](#requisitos-y-desarrollo-local)
- [Variables de entorno](#variables-de-entorno)
- [Base de datos](#base-de-datos)
- [API](#api)
- [Calidad](#calidad-y-pruebas)
- [Flujo Git](#flujo-git-y-entregas)
- [CI/CD](#cicd-y-despliegue)
- [Seguridad](#seguridad)

## Migración

### Estructura anterior

El proyecto anterior era un monorepo dividido en dos aplicaciones independientes:

- `apps/frontend`: cliente Vite + React para la interfaz, navegación, almacenamiento de tokens y consumo de API.
- `apps/backend`: API Django REST para autenticación, chat, análisis de código, rate limiting y persistencia.

También existían proyectos separados para el frontend y la API. Esa distribución requería builds, dependencias, variables de entorno y despliegues distintos; la autenticación cruzaba una frontera cliente/API adicional y las pruebas y documentación se duplicaban.

### Por qué se migró

La migración reduce el coste operativo y unifica el modelo de seguridad:

- Un solo runtime y un despliegue para interfaz y endpoints.
- Sesiones NextAuth en cookies `httpOnly`, sin tokens de sesión gestionados por el navegador.
- Prisma como acceso tipado a PostgreSQL/Supabase y migraciones versionadas.
- OpenAI SDK solo en servidor, sin exponer la clave de IA.
- Un pipeline común de formato, lint, pruebas, build, escaneo de secretos y promoción de ramas.

El código Django, Vite y Astro fue retirado cuando sus responsabilidades quedaron cubiertas por la aplicación Next.js. La migración inicial de Prisma se incluye en el repositorio, pero no se aplica hasta configurar una `DATABASE_URL` real.

## Arquitectura

| Capa           | Tecnología                         | Responsabilidad                                       |
| -------------- | ---------------------------------- | ----------------------------------------------------- |
| Aplicación     | Next.js App Router                 | UI, rendering de servidor y rutas API                 |
| Autenticación  | NextAuth Credentials               | Sesión JWT en cookie `httpOnly` y protección de rutas |
| Persistencia   | Prisma + PostgreSQL/Supabase       | Usuarios, historial de chat y análisis                |
| IA             | OpenAI Responses API               | Chat y análisis de código                             |
| Estilos        | Tailwind CSS                       | Diseño responsive                                     |
| Calidad        | Jest, Playwright, ESLint, Prettier | Pruebas, cobertura, lint y formato                    |
| Automatización | GitHub Actions y Vercel            | CI, seguridad y despliegues                           |

## Estructura del repositorio

```text
app/
  (auth)/                 # Login y registro
  (protected)/            # Dashboard y analizador protegidos por sesión
  api/                    # Auth, chat, analyze e history
components/               # Componentes reutilizables
lib/                      # Auth, Prisma, OpenAI y validaciones
prisma/                   # Esquema y migración PostgreSQL inicial
__tests__/unit/           # Pruebas Jest
__tests__/e2e/            # Pruebas Playwright
.github/workflows/        # CI, seguridad, promoción y despliegue
.githooks/                # Validación local de ramas, commits y secretos
AGENTS.md                 # Reglas obligatorias para agentes
CLAUDE.md                 # Convenciones de ingeniería
```

## Requisitos y desarrollo local

- Node.js 20 o superior.
- PostgreSQL/Supabase para flujos que persisten datos.
- Clave de OpenAI para chat y análisis reales.

```bash
cp .env.example .env.local
npm install
npm run prepare
npx prisma migrate deploy
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Sin base de datos o clave de OpenAI, la UI renderiza, pero registro, historial, chat y análisis no estarán disponibles.

## Variables de entorno

| Variable              | Uso                                          |
| --------------------- | -------------------------------------------- |
| `DATABASE_URL`        | URL PostgreSQL de Supabase para Prisma       |
| `NEXTAUTH_SECRET`     | Secreto de firma de sesiones NextAuth        |
| `NEXTAUTH_URL`        | URL pública de la aplicación                 |
| `OPENAI_API_KEY`      | Clave usada únicamente por rutas de servidor |
| `OPENAI_MODEL`        | Modelo para Responses API                    |
| `NEXT_PUBLIC_API_URL` | URL pública opcional para clientes           |

No versionar `.env.local` ni secretos. `.env.example` es solo una plantilla sin valores reales.

## Base de datos

El esquema Prisma define `User`, `ChatHistory` y `CodeAnalysis`, con relaciones por usuario y borrado en cascada. Tras configurar `DATABASE_URL`, aplica migraciones con `npx prisma migrate deploy`. Para cambios de esquema usa `npx prisma migrate dev --name <descripcion>` y nunca modifiques una migración aplicada en un entorno compartido.

## API

| Ruta                      | Método        | Sesión   | Descripción                             |
| ------------------------- | ------------- | -------- | --------------------------------------- |
| `/api/auth/register`      | `POST`        | No       | Crea un usuario con contraseña hasheada |
| `/api/auth/[...nextauth]` | `GET`, `POST` | NextAuth | Login, logout y sesión                  |
| `/api/chat`               | `POST`        | Sí       | Consulta a OpenAI y guarda historial    |
| `/api/analyze`            | `POST`        | Sí       | Analiza código y persiste resultado     |
| `/api/history`            | `GET`         | Sí       | Obtiene historial del usuario actual    |

Las rutas privadas verifican la sesión en servidor. Los componentes cliente nunca reciben `OPENAI_API_KEY` ni `DATABASE_URL`.

## Calidad y pruebas

| Comando                 | Propósito                                   |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo                      |
| `npm run lint`          | ESLint                                      |
| `npm run format:check`  | Verifica Prettier                           |
| `npm run test`          | Pruebas unitarias Jest                      |
| `npm run test:coverage` | Jest y cobertura mínima del 70%             |
| `npm run test:e2e`      | Playwright; usa `E2E_BASE_URL` para staging |
| `npm run build`         | Build de producción Next.js                 |

En CI, Playwright ejecuta E2E remotos solo cuando `STAGING_URL` está configurada. Una omisión de E2E o deploy por falta de entorno nunca es evidencia para una promoción.

## Flujo Git y entregas

La única secuencia permitida es:

```text
feat/* | fix/* | chore/* | docs/* | refactor/* | test/* | ci/* | security/*
                                  ↓
                                 dev
                                  ↓
                                 stg
                                  ↓
                                main
```

- No se hacen commits o merges directos a `dev`, `stg` ni `main`.
- Las ramas usan `tipo/descripcion-corta`.
- Los commits usan `tipo(scope): descripcion`, por ejemplo `feat(auth): add registration`.
- Scopes permitidos: `api`, `ui`, `db`, `auth`, `ci`, `deploy`, `docs`, `config`, `tests`, `security`, `deps` y `core`.
- La entrada a `dev` usa squash merge; `stg → main` usa merge regular.
- No promociones con checks pendientes, fallidos, cancelados o no disponibles. Un staging no desplegado no habilita `dev → stg`.
- Tras un merge exitoso a `dev`, se elimina la rama de trabajo local y remota. Al acabar un flujo solo quedan `dev`, `stg` y `main`.

Los hooks se instalan con `npm run prepare`. Validan nombre de rama, Conventional Commits, em dash y patrones de secretos antes de push. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para el proceso completo.

## CI/CD y despliegue

GitHub Actions ejecuta CI, cobertura, revisión estática, análisis de dependencias y secretos, tests de integración, promoción y despliegue.

- Staging: `stg.nullbreach.vercel.app`, asociado al proyecto Vercel de staging.
- Producción: `nullbreach.vercel.app`, asociado al proyecto Vercel de producción.

Antes de activar despliegues reales, configura estos GitHub Secrets:

```text
VERCEL_ORG_ID
VERCEL_STAGING_PROJECT_ID
VERCEL_PRODUCTION_PROJECT_ID
VERCEL_TOKEN
```

Configura también las variables de aplicación en ambos proyectos Vercel. Sin esos secretos, el workflow no intenta desplegar y bloquea la promoción `dev → stg`.

### URLs de autenticación en Vercel

Configura `NEXTAUTH_URL` con la URL HTTPS canónica de cada entorno, o elimínala
para que NextAuth use automáticamente `VERCEL_URL`. Mantén
`NEXTAUTH_URL_INTERNAL` sin definir, salvo que exista una URL interna distinta.
No guardes estas variables como cadenas vacías: NextAuth intenta interpretarlas
al importar `SessionProvider`, lo que puede romper el prerenderizado incluso en
`/_not-found`. La configuración de Next.js elimina valores vacíos antes de cargar
la aplicación para que se apliquen los valores predeterminados de NextAuth.

## Seguridad

- Las contraseñas se hashean con bcrypt.
- NextAuth gestiona cookies de sesión que no se exponen al JavaScript cliente.
- OpenAI y Prisma solo se invocan desde servidor.
- Hooks y GitHub Actions detectan secretos; no sustituyen la revisión humana.
- `npm audit` y Gitleaks se ejecutan en CI.
- Reporta vulnerabilidades de manera privada y no publiques secretos ni detalles de explotación en issues públicos.

## Contribución y licencia

Lee [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir un cambio. El proyecto se distribuye bajo [MIT License](LICENSE).
