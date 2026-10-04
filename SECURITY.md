# Security Policy

**Last updated:** October 4, 2026

## Supported surfaces

| Surface                   | Status    |
| ------------------------- | --------- |
| Astro landing             | Supported |
| Next.js product and API   | Supported |
| Current `main` deployment | Supported |

## Reporting a vulnerability

Do not create a public issue with credentials, personal data, production URLs that expose a weakness, or exploit instructions.

Use GitHub private vulnerability reporting for this repository. If private reporting is unavailable, contact `wavival.dev@luminaw.co` with:

1. A concise description and impact.
2. Reproduction steps that do not expose third-party data.
3. Affected route, version, or commit when known.
4. A safe remediation suggestion when available.

## Response

Reports are triaged privately. Please allow time for confirmation and remediation before disclosure. Do not access, modify, or retain data that is not yours while validating a report.

## Security controls

- Server-only credentials for database, NextAuth, email, and OpenAI.
- HTTP-only authentication sessions.
- Input limits before paid or persistent operations.
- Dependency audit, secret scan, static review, tests, and build gates in CI.
- Security headers for framing, MIME sniffing, referrer policy, and browser permissions.

The AI output is development guidance, not a security guarantee or a substitute for an independent review.
