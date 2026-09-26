"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { appPath } from "@/lib/paths";
import PasswordInput from "@/components/PasswordInput";

export default function ResetPasswordPage() {
  const [token] = useState(() =>
    typeof window === "undefined"
      ? ""
      : (new URLSearchParams(window.location.search).get("token") ?? ""),
  );
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirm) return setMessage("Passwords do not match.");
    setLoading(true);
    const response = await fetch(appPath("/api/auth/reset-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    setMessage(data.message ?? data.error);
    setLoading(false);
  }
  return (
    <main
      id="main"
      className="landing grid min-h-screen place-items-center p-6"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-lg border border-border bg-surface/90 p-6 shadow-large"
      >
        <p className="font-mono text-body-sm text-primary">
          root@nullbreach:~$ auth reset --apply
        </p>
        <h1 className="font-mono text-h2">Choose a new password</h1>
        <PasswordInput
          required
          name="password"
          label="New password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
        />
        <PasswordInput
          required
          name="confirmPassword"
          label="Confirm password"
          minLength={8}
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          placeholder="Confirm password"
        />
        {message && (
          <p className="text-body-sm text-foreground-muted" role="status">
            {message}
          </p>
        )}
        <button
          disabled={loading || !token}
          className="primary-btn w-full justify-center p-2 disabled:opacity-50"
        >
          {loading ? "Updating…" : "Update password"}
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
