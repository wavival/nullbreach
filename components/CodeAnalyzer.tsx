"use client";

import { FormEvent, useState } from "react";

export default function CodeAnalyzer() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "Unable to analyze code.");
      setResult(data.vulnerabilities);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to analyze code.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="mx-auto max-w-4xl rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
      <h1 className="text-xl font-semibold">OWASP code analyzer</h1>
      <p className="mt-1 text-sm text-slate-400">
        Paste a snippet for an AI-assisted security review.
      </p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          rows={16}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-600 bg-slate-950 p-3 font-mono text-sm outline-none focus:border-cyan-400"
          placeholder="// Paste code here"
        />
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {result && (
          <article className="whitespace-pre-wrap rounded-lg border border-cyan-900 bg-slate-950 p-4">
            {result}
          </article>
        )}
        <button
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Analyzing…" : "Analyze code"}
        </button>
      </form>
    </section>
  );
}
