"use client";

import { SessionProvider } from "next-auth/react";
import { appPath } from "@/lib/paths";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath={appPath("/api/auth")}>
      {children}
    </SessionProvider>
  );
}
