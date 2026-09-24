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
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
      <h1 className="text-xl font-semibold">Security chat</h1>
      <p className="mt-1 text-sm text-slate-400">
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
          className="w-full rounded-lg border border-slate-600 bg-slate-950 p-3 outline-none focus:border-cyan-400"
          placeholder="How should I prevent SQL injection?"
        />
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {answer && (
          <article className="whitespace-pre-wrap rounded-lg border border-cyan-900 bg-slate-950 p-4 text-slate-200">
            {answer}
          </article>
        )}
        <button
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Thinking…" : "Ask NullBreach"}
        </button>
      </form>
    </section>
  );
}
