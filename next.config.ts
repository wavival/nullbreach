import type { NextConfig } from "next";

// NextAuth uses nullish fallbacks, so an empty URL throws during module loading.
// Normalize before Next.js loads routes or starts prerender workers.
for (const key of ["NEXTAUTH_URL", "NEXTAUTH_URL_INTERNAL", "VERCEL_URL"]) {
  if (process.env[key] !== undefined && process.env[key]?.trim() === "") {
    delete process.env[key];
  }
}

const nextConfig: NextConfig = {
  // Avoid a Node 24/Next.js CLI output race when Next reads `tsc --showConfig`.
  // The compiler API performs the same validation without parsing child output.
  experimental: { useTypeScriptCli: false },
};

export default nextConfig;
