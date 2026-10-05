import type { Metadata } from "next";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wavival.dev"),
  title: {
    default: "NullBreach | AI AppSec assistant",
    template: "%s | NullBreach",
  },
  description:
    "Authenticated NullBreach product workspace for AI-assisted AppSec chat and code analysis.",
  applicationName: "NullBreach",
  keywords: ["AppSec", "application security", "OWASP", "code analysis"],
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
