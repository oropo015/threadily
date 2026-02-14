import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://threadify.pro"
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/migrate"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
