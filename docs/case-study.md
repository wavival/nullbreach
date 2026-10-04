# NullBreach Case Study

## Table of contents

- [Context](#context)
- [Product scope](#product-scope)
- [Architecture](#architecture)
- [Security boundaries](#security-boundaries)
- [Public resources](#public-resources)

## Context

NullBreach is Valentina Ramírez's open-source AppSec portfolio project. It demonstrates a product workflow for discussing secure-development questions, analyzing source code, and preserving user-scoped chat history.

## Product scope

The public Astro landing explains the project in Spanish and English. The Next.js product provides registration, credential and optional Google sign-in, password recovery, an AI-assisted security chat, and code analysis with OWASP-oriented guidance.

NullBreach is not a commercial security service. Its output is guidance and does not replace security reviews, penetration testing, or dedicated security tooling.

## Architecture

- Astro serves the static, indexable landing at `/nullbreach` and `/nullbreach/en`.
- Next.js serves the authenticated product, Swagger UI, and same-origin API routes.
- Prisma connects server-side route handlers to PostgreSQL.
- NextAuth manages browser sessions.
- OpenAI is called only from server-side code for chat and code-analysis flows.

## Security boundaries

- Secrets, database credentials, provider keys, and session secrets stay server-side.
- Protected pages and private API routes require an authenticated session.
- Route handlers validate input before persistence or AI calls.
- Passwords use bcrypt hashes and password-reset tokens are stored as hashes.
- The public landing is static and contains no runtime secrets.

## Public resources

- [Public site](https://www.wavival.dev/nullbreach)
- [English site](https://www.wavival.dev/nullbreach/en)
- [Repository](https://github.com/wavival/nullbreach)
- [API reference](api.md)
- [Swagger UI](https://www.wavival.dev/nullbreach/swagger)
- [OpenAPI document](https://www.wavival.dev/nullbreach/api/openapi)
