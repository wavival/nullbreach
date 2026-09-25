"use client";

import { signOut } from "next-auth/react";
import { appPath } from "@/lib/paths";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: appPath("/login") })}
      className="terminal-link rounded border border-border px-3 py-1.5 text-body-sm hover:border-primary"
    >
      Sign out
    </button>
  );
}
