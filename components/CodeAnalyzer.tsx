"use client";

import { FormEvent, useState } from "react";
import { appPath } from "@/lib/paths";

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
      const response = await fetch(appPath("/api/analyze"), {
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
    <section className="terminal-panel mx-auto max-w-4xl rounded-lg border border-border bg-surface/80 p-5 shadow-large">
      <p className="font-mono text-body-sm text-primary">
        $ nullbreach scan ./src
      </p>
      <h1 className="mt-2 font-mono text-h3">OWASP code analyzer</h1>
      <p className="mt-1 text-body text-foreground-muted">
        Paste a snippet for an AI-assisted security review.
      </p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          rows={16}
          spellCheck={false}
          className="w-full rounded border border-border bg-surface-alt p-3 font-mono text-sm outline-none focus:border-primary"
          placeholder="// Paste code here"
        />
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {result && (
          <article className="whitespace-pre-wrap rounded border border-primary/30 bg-surface-alt p-4">
            {result}
          </article>
        )}
        <button
          disabled={loading}
          className="primary-btn px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Analyzing…" : "Analyze code"}
        </button>
      </form>
    </section>
  );
}
