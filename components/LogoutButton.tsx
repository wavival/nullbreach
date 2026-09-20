"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded border border-slate-600 px-3 py-1.5 text-sm hover:border-cyan-400"
    >
      Sign out
    </button>
  );
}
