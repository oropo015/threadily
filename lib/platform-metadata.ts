import type { Metadata } from "next"
import { getCanonicalUrl, getSocialToolPath } from "@/lib/social-routes"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"

const BASE = "https://threadify.pro"
const SITE = "threadify.pro"

export function getPlatformMetadata(platform: PlatformKey): Metadata {
  const path = getSocialToolPath(platform)
  const url = getCanonicalUrl(path)
  const name = PLATFORMS[platform].name

  const titles: Record<PlatformKey, string> = {
    twitter: `X Thread Generator – Split Long Text into Tweets | ${SITE}`,
    threads: `Threads Thread Generator – Split Text for Threads App | ${SITE}`,
    linkedin: `LinkedIn Post Formatter – Format Long Posts for LinkedIn | ${SITE}`,
    reddit: `Reddit Post Splitter – Split Long Posts for Reddit | ${SITE}`,
    mastodon: `Mastodon Post Splitter – Split Text into Toots | ${SITE}`,
    facebook: `Facebook Post Formatter – Format Posts for Facebook | ${SITE}`,
  }

  const descriptions: Record<PlatformKey, string> = {
    twitter: `Free X (Twitter) thread generator. Split long text into 280-character tweets. Create engaging threads with correct character counts.`,
    threads: `Free Threads thread generator. Split long text into 500-character posts for Meta's Threads app. Format and optimize your threads.`,
    linkedin: `Free LinkedIn post formatter. Format long text for LinkedIn's 3,000-character limit. Structure and optimize professional posts.`,
    reddit: `Free Reddit post splitter. Split long text for Reddit with markdown support. Format posts and comments for subreddits.`,
    mastodon: `Free Mastodon post splitter. Split text into 500-character toots. Add content warnings and format for Mastodon.`,
    facebook: `Free Facebook post formatter. Format and split long text for Facebook. Optimize posts for engagement and readability.`,
  }

  const title = titles[platform]
  const description = descriptions[platform]

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `${BASE}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `threadify – ${name} tool`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE}/twitter-image.png`],
    },
  }
}
