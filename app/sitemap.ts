import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.wavival.dev/nullbreach",
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://www.wavival.dev/nullbreach",
          en: "https://www.wavival.dev/nullbreach/en",
        },
      },
    },
    {
      url: "https://www.wavival.dev/nullbreach/en",
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          es: "https://www.wavival.dev/nullbreach",
          en: "https://www.wavival.dev/nullbreach/en",
        },
      },
    },
  ];
}
