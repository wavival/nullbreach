"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { appPath } from "@/lib/paths";

export default function AppNavigation({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const dashboardPath = appPath("/dashboard");
  const analyzePath = appPath("/analyze");
  return (
    <nav
      aria-label="Application navigation"
      className="mx-auto flex max-w-6xl items-center gap-5 p-4 font-mono"
    >
      <Link className="font-bold text-primary" href={dashboardPath}>
        <span className="text-primary">[</span>nullbreach
        <span className="text-primary">]</span>
      </Link>
      <Link
        className="terminal-link text-body-sm"
        aria-current={pathname === dashboardPath ? "page" : undefined}
        href={dashboardPath}
      >
        ~/chat
      </Link>
      <Link
        className="terminal-link text-body-sm"
        aria-current={pathname === analyzePath ? "page" : undefined}
        href={analyzePath}
      >
        ~/analyze
      </Link>
      <span className="ml-auto hidden text-body-sm text-foreground-muted sm:block">
        {email}
      </span>
      <LogoutButton />
    </nav>
  );
}
