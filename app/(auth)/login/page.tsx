"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { appPath } from "@/lib/paths";
import PasswordInput from "@/components/PasswordInput";
import GoogleMark from "@/components/GoogleMark";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) setError("Invalid email or password.");
    else router.push(appPath("/dashboard"));
  }
  async function googleLogin() {
    await signIn("google", { callbackUrl: appPath("/dashboard") });
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
          root@nullbreach:~$ auth login
        </p>
        <h1 className="font-mono text-h2">Welcome back</h1>
        <label className="block text-sm" htmlFor="login-email">
          Email
          <input
            id="login-email"
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
        <Link
          className="block text-right text-body-sm text-primary"
          href={appPath("/forgot-password")}
        >
          Forgot your password?
        </Link>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          disabled={loading}
          className="primary-btn w-full justify-center p-2 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={googleLogin}
          className="flex w-full items-center justify-center gap-sm rounded border border-border p-2 font-mono text-body-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <GoogleMark /> Continue with Google
        </button>
        <p className="text-body-sm text-foreground-muted">
          New here?{" "}
          <Link className="text-primary" href={appPath("/register")}>
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
