import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://threadify.pro"
  const languages = ["en", "es", "fr", "de", "ja"]

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ]

  // Add language-specific routes
  languages.forEach((lang) => {
    routes.push({
      url: `${baseUrl}?lang=${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  })

  return routes
}
