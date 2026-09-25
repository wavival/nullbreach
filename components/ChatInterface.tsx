"use client";

import { FormEvent, useState } from "react";
import { appPath } from "@/lib/paths";

export type ChatEntry = {
  id: string;
  question: string;
  response: string;
  created_at: string;
};

export default function ChatInterface({
  onCreated,
}: {
  onCreated: (entry: ChatEntry) => void;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const response = await fetch(appPath("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "Unable to send the message.");
      setAnswer(data.response);
      setQuestion("");
      onCreated({
        id: data.id,
        question,
        response: data.response,
        created_at: data.timestamp,
      });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to send the message.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="terminal-panel rounded-lg border border-border bg-surface/80 p-5 shadow-large">
      <p className="font-mono text-body-sm text-primary">$ nullbreach chat</p>
      <h1 className="mt-2 font-mono text-h3">Security chat</h1>
      <p className="mt-1 text-body text-foreground-muted">
        Ask about vulnerabilities, security controls, or secure coding.
      </p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <label className="block text-sm font-medium" htmlFor="question">
          Your question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={6}
          className="w-full rounded border border-border bg-surface-alt p-3 outline-none focus:border-primary"
          placeholder="How should I prevent SQL injection?"
        />
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {answer && (
          <article className="whitespace-pre-wrap rounded border border-primary/30 bg-surface-alt p-4 text-foreground">
            {answer}
          </article>
        )}
        <button
          disabled={loading}
          className="primary-btn px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Thinking…" : "Ask NullBreach"}
        </button>
      </form>
    </section>
  );
}
