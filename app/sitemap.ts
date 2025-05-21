import type { MetadataRoute } from "next"
import { getSortedBlogsData, getAllTags } from "@/lib/blog-utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://threadify.pro"
  const lastModified = new Date()

  // Get all blog posts
  const posts = await getSortedBlogsData()
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Get all tags
  const tags = await getAllTags()
  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/social-media-thread-generator`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ]

  // Language-specific routes
  const languages = ["en", "es", "fr", "de", "ja"]
  const languageUrls = languages.map((lang) => ({
    url: `${baseUrl}?lang=${lang}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...mainPages, ...languageUrls, ...blogUrls, ...tagUrls]
}
