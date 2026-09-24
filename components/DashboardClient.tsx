"use client";

import { useEffect, useState } from "react";
import { appPath } from "@/lib/paths";
import ChatInterface, { type ChatEntry } from "./ChatInterface";
import HistorySidebar from "./HistorySidebar";

export default function DashboardClient() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  useEffect(() => {
    fetch(appPath("/api/history"))
      .then(async (response) =>
        response.ok ? response.json() : { history: [] },
      )
      .then((data) => setHistory(data.history ?? []))
      .catch(() => setHistory([]));
  }, []);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <ChatInterface
        onCreated={(entry) =>
          setHistory((current) => [entry, ...current].slice(0, 10))
        }
      />
      <HistorySidebar history={history} />
    </div>
  );
}
