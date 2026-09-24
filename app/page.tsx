import Link from "next/link";
import { appPath } from "@/lib/paths";

export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#164e63,transparent_45%)] p-8">
      <section className="max-w-2xl text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          NULLBREACH
        </p>
        <h1 className="text-4xl font-bold sm:text-6xl">
          Security guidance, built for developers.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
          An AI-assisted workspace for cybersecurity questions and OWASP-focused
          code reviews.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Link
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950"
            href={appPath("/register")}
          >
            Create account
          </Link>
          <Link
            className="rounded-lg border border-slate-500 px-5 py-3 font-semibold"
            href={appPath("/login")}
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
