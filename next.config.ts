import type { NextConfig } from "next";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

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
  async rewrites() {
    return [
      { source: "/nullbreach", destination: "/" },
      { source: "/nullbreach/:path*", destination: "/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withMicrofrontends(nextConfig);
