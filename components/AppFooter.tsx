import Link from "next/link";
import { appPath } from "@/lib/paths";

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div>
        <Link
          className="font-mono font-bold text-foreground"
          href={appPath("/")}
        >
          <span className="text-primary">[</span>nullbreach
          <span className="text-primary">]</span>
        </Link>
        <p className="mt-2 font-mono text-body-sm text-foreground-muted">
          # AI-powered cybersecurity assistant.
        </p>
      </div>
      <nav aria-label="Product resources" className="app-footer-links">
        <a
          href="https://github.com/wavival/nullbreach"
          target="_blank"
          rel="noreferrer"
        >
          Repository
        </a>
        <a href="https://github.com/wavival/nullbreach/blob/dev/docs/api.md">
          API documentation
        </a>
        <Link href={appPath("/")}>Landing</Link>
      </nav>
      <small>MIT · © 2026 NullBreach</small>
    </footer>
  );
}
