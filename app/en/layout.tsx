import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI AppSec assistant",
  description:
    "Find and understand application security vulnerabilities before attackers do.",
  alternates: {
    canonical: "/nullbreach/en",
    languages: {
      es: "/nullbreach",
      en: "/nullbreach/en",
    },
  },
  openGraph: {
    locale: "en_US",
    url: "https://wavival.dev/nullbreach/en",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
