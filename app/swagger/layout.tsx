import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API documentation",
  robots: { index: false, follow: false },
};

export default function SwaggerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
