import Link from "next/link";
import { appPath } from "@/lib/paths";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-cyan-400">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <Link className="mt-6 inline-block text-cyan-400" href={appPath("/")}>
          Return home
        </Link>
      </div>
    </main>
  );
}
