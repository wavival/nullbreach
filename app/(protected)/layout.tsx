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
    <>
      <header className="border-b border-slate-800 bg-slate-950">
        <nav className="mx-auto flex max-w-6xl items-center gap-5 p-4">
          <Link
            className="font-bold text-cyan-400"
            href={appPath("/dashboard")}
          >
            NULLBREACH
          </Link>
          <Link
            className="text-sm text-slate-300 hover:text-white"
            href={appPath("/dashboard")}
          >
            Chat
          </Link>
          <Link
            className="text-sm text-slate-300 hover:text-white"
            href={appPath("/analyze")}
          >
            Analyze
          </Link>
          <span className="ml-auto hidden text-sm text-slate-400 sm:block">
            {session.user.email}
          </span>
          <LogoutButton />
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </>
  );
}
