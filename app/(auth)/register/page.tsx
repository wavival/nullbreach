"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { appPath } from "@/lib/paths";

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
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-6"
      >
        <h1 className="text-2xl font-bold">Create account</h1>
        <label className="block text-sm">
          Email
          <input
            required
            name="email"
            type="email"
            className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2"
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            required
            name="password"
            type="password"
            minLength={8}
            className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2"
          />
        </label>
        <label className="block text-sm">
          Confirm password
          <input
            required
            name="confirmPassword"
            type="password"
            minLength={8}
            className="mt-1 w-full rounded border border-slate-600 bg-slate-950 p-2"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded bg-cyan-500 p-2 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create account"}
        </button>
        <p className="text-sm text-slate-400">
          Already registered?{" "}
          <Link className="text-cyan-400" href={appPath("/login")}>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
