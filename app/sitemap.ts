import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://wavival.dev/nullbreach",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: "https://wavival.dev/nullbreach/en" } },
    },
    {
      url: "https://wavival.dev/nullbreach/en",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { es: "https://wavival.dev/nullbreach" } },
    },
  ];
}
