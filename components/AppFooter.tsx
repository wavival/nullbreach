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
          <span className="text-primary">[</span>
          <span className="text-primary">null</span>breach
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
          ~/repository
        </a>
        <a
          href="https://github.com/wavival/nullbreach/blob/dev/docs/api.md"
          target="_blank"
          rel="noreferrer"
        >
          ~/api-docs
        </a>
        <Link href={appPath("/")}>~/landing</Link>
      </nav>
      <small>
        MIT · © {new Date().getFullYear()} NullBreach · Valentina Ramírez
      </small>
    </footer>
  );
}
