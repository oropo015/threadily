import type { MetadataRoute } from "next"
import { getSortedBlogsData, getAllTags } from "@/lib/blog-utils"
import { SOCIAL_TOOL_PATHS } from "@/lib/social-routes"

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

  // Social tools: main generator (keyword-rich URL) + one URL per platform
  const socialToolUrls = [
    { path: "/social-media-thread-generator", priority: 0.9 as const },
    { path: SOCIAL_TOOL_PATHS.x, priority: 0.9 as const },
    { path: SOCIAL_TOOL_PATHS.threads, priority: 0.9 as const },
    { path: SOCIAL_TOOL_PATHS.linkedin, priority: 0.9 as const },
    { path: SOCIAL_TOOL_PATHS.reddit, priority: 0.9 as const },
    { path: SOCIAL_TOOL_PATHS.mastodon, priority: 0.9 as const },
    { path: SOCIAL_TOOL_PATHS.facebook, priority: 0.9 as const },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
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
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]

  return [...mainPages, ...socialToolUrls, ...blogUrls, ...tagUrls]
}
