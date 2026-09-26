# NullBreach API Reference

## Base URLs

- Production: `https://wavival.dev/nullbreach/api`
- Direct production project URL: `https://null-breach.vercel.app/nullbreach/api`
- Local: `http://localhost:3000/nullbreach/api`
- Staging: `https://nullbreach-git-stg-wavivals-projects.vercel.app/nullbreach/api`

All request and response bodies use JSON unless stated otherwise. Authentication uses the NextAuth session cookie issued by the same origin.

## Error format

Application errors use this shape:

```json
{
  "error": "Human-readable message"
}
```

Internal database and provider errors are logged on the server and are not returned to clients.

## Health

### `GET /nullbreach/api/health`

Public deployment and database health check. Responses include `Cache-Control: no-store`.

Success, `200`:

```json
{
  "status": "ok"
}
```

Database unavailable, `503`:

```json
{
  "status": "degraded"
}
```

## Registration

### `POST /nullbreach/api/auth/register`

Creates a user. No session is required.

Request:

```json
{
  "email": "user@example.com",
  "password": "minimum-eight-characters"
}
```

Rules:

- Email is trimmed, lowercased, and must have a basic valid email shape.
- Password length must be between 8 and 128 characters.

Created, `201`:

```json
{
  "id": "user_cuid",
  "email": "user@example.com"
}
```

Errors:

- `400`: invalid email or password length.
- `409`: an account already uses the email.
- `503`: registration persistence is unavailable.

## Authentication

### `GET|POST /nullbreach/api/auth/[...nextauth]`

NextAuth handler for credentials sign-in, sign-out, session, CSRF, and provider operations. The browser should use the NextAuth client rather than constructing these requests manually.

Supported sign-in methods:

- Credentials, using an email and password created through registration.
- Google OAuth, when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are configured. Google users are linked by normalized email.

## Password recovery

### `POST /nullbreach/api/auth/forgot-password`

Requests a password-reset email. The response intentionally does not reveal whether the email exists.

Request:

```json
{ "email": "user@example.com" }
```

The server stores only a SHA-256 hash of the one-hour token and sends the reset URL through Brevo when `BREVO_API_KEY` and `BREVO_SENDER_EMAIL` are configured. In non-production local development, the URL is logged when email delivery is not configured.

### `POST /nullbreach/api/auth/reset-password`

Consumes a valid, unexpired, single-use token and replaces the bcrypt password hash.

Request:

```json
{ "token": "reset-token", "password": "minimum-eight-characters" }
```

Errors:

- `400`: invalid token or password length.
- `200`: password updated successfully.

## Chat

### `POST /nullbreach/api/chat`

Requires a valid session. Sends a secure-development question to OpenAI and stores the result.

Request:

```json
{
  "question": "How should this authorization check be implemented?"
}
```

The trimmed question must contain 1 to 4,000 characters.

Success, `200`:

```json
{
  "response": "Generated security guidance",
  "id": "chat_cuid",
  "timestamp": "2026-09-23T12:00:00.000Z"
}
```

Errors:

- `400`: `question` is missing or blank.
- `401`: no valid session.
- `413`: question exceeds 4,000 characters.
- `502`: OpenAI or persistence failed while processing the request.

## Code analysis

### `POST /nullbreach/api/analyze`

Requires a valid session. Sends code to OpenAI for OWASP-aligned vulnerability analysis and stores the result.

Request:

```json
{
  "code": "const value = request.query.value;"
}
```

The trimmed code must contain 1 to 20,000 characters.

Success, `200`:

```json
{
  "vulnerabilities": "Generated findings and remediation guidance",
  "id": "analysis_cuid",
  "timestamp": "2026-09-23T12:00:00.000Z"
}
```

Errors:

- `400`: `code` is missing or blank.
- `401`: no valid session.
- `413`: code exceeds 20,000 characters.
- `502`: OpenAI or persistence failed while processing the request.

## Chat history

### `GET /nullbreach/api/history`

Requires a valid session. Returns the 10 most recent chat records for the current user, newest first.

Success, `200`:

```json
{
  "history": [
    {
      "id": "chat_cuid",
      "user_id": "user_cuid",
      "question": "Question text",
      "response": "Response text",
      "model": "gpt-5",
      "created_at": "2026-09-23T12:00:00.000Z"
    }
  ]
}
```

Errors:

- `401`: no valid session.
- `503`: history persistence is unavailable.
