import type { ChatEntry } from "./ChatInterface";

export default function HistorySidebar({ history }: { history: ChatEntry[] }) {
  return (
    <aside className="terminal-panel rounded-lg border border-border bg-surface/80 p-5 shadow-large">
      <p className="font-mono text-body-sm text-primary">$ history --recent</p>
      <h2 className="mt-2 font-mono text-h4">Recent questions</h2>
      {history.length === 0 ? (
        <p className="mt-3 text-body text-foreground-muted">
          Your last ten questions will appear here.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {history.map((item) => (
            <li
              key={item.id}
              className="border-b border-border pb-3 last:border-0"
            >
              <p className="text-sm font-medium">{item.question}</p>
              <time className="text-body-sm text-neutral">
                {new Date(item.created_at).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
