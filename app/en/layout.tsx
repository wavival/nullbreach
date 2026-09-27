import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI AppSec assistant",
  description:
    "Find and understand application security vulnerabilities before attackers do.",
  alternates: {
    canonical: "https://www.wavival.dev/nullbreach/en",
    languages: {
      es: "https://www.wavival.dev/nullbreach",
      en: "https://www.wavival.dev/nullbreach/en",
    },
  },
  openGraph: {
    locale: "en_US",
    url: "https://www.wavival.dev/nullbreach/en",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
