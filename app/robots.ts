import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/nullbreach",
      disallow: [
        "/nullbreach/api/",
        "/nullbreach/swagger",
        "/nullbreach/login",
        "/nullbreach/register",
        "/nullbreach/forgot-password",
        "/nullbreach/reset-password",
        "/nullbreach/dashboard",
        "/nullbreach/analyze",
      ],
    },
    sitemap: "https://www.wavival.dev/nullbreach/sitemap.xml",
  };
}
