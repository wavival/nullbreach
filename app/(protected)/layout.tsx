import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentSession } from "@/lib/auth";
import AppNavigation from "@/components/AppNavigation";
import { appPath } from "@/lib/paths";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

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
        <AppNavigation email={session.user.email} />
      </header>
      <main id="main" className="mx-auto max-w-6xl p-6 terminal-enter">
        {children}
      </main>
    </div>
  );
}
