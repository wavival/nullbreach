import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import { appPath } from "@/lib/paths";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session?.user?.id) redirect(appPath("/login"));
  return (
    <div className="app-shell">
      <header className="border-b border-border bg-surface">
        <nav className="mx-auto flex max-w-6xl items-center gap-5 p-4 font-mono">
          <Link className="font-bold text-primary" href={appPath("/dashboard")}>
            <span className="text-primary">[</span>nullbreach
            <span className="text-primary">]</span>
          </Link>
          <Link
            className="terminal-link text-body-sm"
            aria-current="page"
            href={appPath("/dashboard")}
          >
            ~/chat
          </Link>
          <Link
            className="terminal-link text-body-sm"
            href={appPath("/analyze")}
          >
            ~/analyze
          </Link>
          <span className="ml-auto hidden text-body-sm text-foreground-muted sm:block">
            {session.user.email}
          </span>
          <LogoutButton />
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6 terminal-enter">{children}</main>
    </div>
  );
}
