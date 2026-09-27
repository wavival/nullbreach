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
    "NullBreach helps developers find, understand, and remediate application security vulnerabilities with AI-assisted chat and code analysis.",
  applicationName: "NullBreach",
  keywords: [
    "AppSec",
    "application security",
    "OWASP",
    "SAST",
    "code analysis",
  ],
  alternates: {
    canonical: "/nullbreach",
    languages: {
      es: "/nullbreach",
      en: "/nullbreach/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "NullBreach",
    title: "NullBreach | AI AppSec assistant",
    description:
      "Find and understand application security vulnerabilities before attackers do.",
    url: "https://www.wavival.dev/nullbreach",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/nullbreach/images/og-nullbreach.webp",
        width: 1200,
        height: 630,
        alt: "NullBreach: análisis de código con IA basado en OWASP y chat de seguridad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NullBreach | AI AppSec assistant",
    description:
      "Find and understand application security vulnerabilities before attackers do.",
    images: ["/nullbreach/images/og-nullbreach.webp"],
  },
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
