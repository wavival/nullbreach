"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { appPath } from "@/lib/paths";
import { signIn } from "next-auth/react";
import PasswordInput from "@/components/PasswordInput";
import GoogleMark from "@/components/GoogleMark";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password !== form.get("confirmPassword"))
      return setError("Passwords do not match.");
    setLoading(true);
    setError(null);
    const response = await fetch(appPath("/api/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) setError(data.error ?? "Unable to create account.");
    else router.push(appPath("/login"));
  }
  async function googleRegister() {
    await signIn("google", { callbackUrl: appPath("/dashboard") });
  }
  return (
    <main className="landing grid min-h-screen place-items-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-lg border border-border bg-surface/90 p-6 shadow-large"
      >
        <p className="font-mono text-body-sm text-primary">
          root@nullbreach:~$ auth register
        </p>
        <h1 className="font-mono text-h2">Create account</h1>
        <label className="block text-sm">
          Email
          <input
            required
            name="email"
            type="email"
            className="mt-1 w-full rounded border border-border bg-surface-alt p-2 text-foreground outline-none focus:border-primary"
          />
        </label>
        <PasswordInput
          required
          name="password"
          label="Password"
          minLength={8}
        />
        <PasswordInput
          required
          name="confirmPassword"
          label="Confirm password"
          minLength={8}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          disabled={loading}
          className="primary-btn w-full justify-center p-2 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create account"}
        </button>
        <button
          type="button"
          onClick={googleRegister}
          className="w-full rounded border border-border p-2 font-mono text-body-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <GoogleMark /> Continue with Google
        </button>
        <p className="text-body-sm text-foreground-muted">
          Already registered?{" "}
          <Link className="text-primary" href={appPath("/login")}>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
