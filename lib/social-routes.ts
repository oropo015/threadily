import type { PlatformKey } from "@/lib/constants"

const BASE = "https://threadify.pro"

/**
 * SEO-friendly URL path for each platform tool.
 * Used for routing, redirects, sitemap, and canonical URLs.
 */
export const SOCIAL_TOOL_PATHS = {
  landing: "/social",
  x: "/social/x-thread-generator",
  threads: "/social/threads-thread-generator",
  linkedin: "/social/linkedin-post-formatter",
  reddit: "/social/reddit-post-splitter",
  mastodon: "/social/mastodon-post-splitter",
  facebook: "/social/facebook-post-formatter",
} as const

/** Map URL path (segment after /social/) to platform key. */
export const PATH_TO_PLATFORM: Record<string, PlatformKey> = {
  "x-thread-generator": "twitter",
  "threads-thread-generator": "threads",
  "linkedin-post-formatter": "linkedin",
  "reddit-post-splitter": "reddit",
  "mastodon-post-splitter": "mastodon",
  "facebook-post-formatter": "facebook",
}

/** Map platform key to URL path (segment after /social/). */
export const PLATFORM_TO_PATH: Record<PlatformKey, string> = {
  twitter: "x-thread-generator",
  threads: "threads-thread-generator",
  linkedin: "linkedin-post-formatter",
  reddit: "reddit-post-splitter",
  mastodon: "mastodon-post-splitter",
  facebook: "facebook-post-formatter",
}

/** All indexable tool URLs for sitemap (no landing). */
export const SOCIAL_TOOL_URLS = [
  SOCIAL_TOOL_PATHS.x,
  SOCIAL_TOOL_PATHS.threads,
  SOCIAL_TOOL_PATHS.linkedin,
  SOCIAL_TOOL_PATHS.reddit,
  SOCIAL_TOOL_PATHS.mastodon,
  SOCIAL_TOOL_PATHS.facebook,
] as const

const PLATFORM_TO_FULL_PATH: Record<PlatformKey, string> = {
  twitter: SOCIAL_TOOL_PATHS.x,
  threads: SOCIAL_TOOL_PATHS.threads,
  linkedin: SOCIAL_TOOL_PATHS.linkedin,
  reddit: SOCIAL_TOOL_PATHS.reddit,
  mastodon: SOCIAL_TOOL_PATHS.mastodon,
  facebook: SOCIAL_TOOL_PATHS.facebook,
}

export function getSocialToolPath(platform: PlatformKey): string {
  return PLATFORM_TO_FULL_PATH[platform] ?? SOCIAL_TOOL_PATHS.x
}

export function getPlatformFromPath(pathSegment: string): PlatformKey | null {
  return PATH_TO_PLATFORM[pathSegment] ?? null
}

export function getCanonicalUrl(path: string): string {
  return path.startsWith("http") ? path : `${BASE}${path.startsWith("/") ? "" : "/"}${path}`
}
