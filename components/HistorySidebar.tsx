import type { ChatEntry } from "./ChatInterface";

export default function HistorySidebar({ history }: { history: ChatEntry[] }) {
  return (
    <aside className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="font-semibold">Recent questions</h2>
      {history.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">
          Your last ten questions will appear here.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {history.map((item) => (
            <li
              key={item.id}
              className="border-b border-slate-700 pb-3 last:border-0"
            >
              <p className="text-sm font-medium">{item.question}</p>
              <time className="text-xs text-slate-500">
                {new Date(item.created_at).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
