"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { appPath } from "@/lib/paths";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(appPath("/api/auth/forgot-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message ?? data.error);
    setLoading(false);
  }
  return (
    <main className="landing grid min-h-screen place-items-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-lg border border-border bg-surface/90 p-6 shadow-large"
      >
        <p className="font-mono text-body-sm text-primary">
          root@nullbreach:~$ auth reset
        </p>
        <h1 className="font-mono text-h2">Reset password</h1>
        <p className="text-body text-foreground-muted">
          Enter your email and we will send a reset link if the account exists.
        </p>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border border-border bg-surface-alt p-2 text-foreground outline-none focus:border-primary"
          placeholder="you@example.com"
        />
        {message && (
          <p className="text-body-sm text-foreground-muted" role="status">
            {message}
          </p>
        )}
        <button
          disabled={loading}
          className="primary-btn w-full justify-center p-2 disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
        <Link
          className="block text-center text-body-sm text-primary"
          href={appPath("/login")}
        >
          Back to sign in
        </Link>
      </form>
    </main>
  );
}
