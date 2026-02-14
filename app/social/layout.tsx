import type { Metadata } from "next"
import { getCanonicalUrl } from "@/lib/social-routes"
import { SOCIAL_TOOL_PATHS } from "@/lib/social-routes"

export const metadata: Metadata = {
  title: "Social Media Tools – Thread & Post Generators | threadify",
  description:
    "Free tools to split long text into threads and posts for X (Twitter), Threads, LinkedIn, Reddit, Mastodon, and Facebook. Format and optimize for each platform.",
  alternates: {
    canonical: getCanonicalUrl(SOCIAL_TOOL_PATHS.landing),
  },
  openGraph: {
    title: "Social Media Tools – Thread & Post Generators | threadify",
    description:
      "Free tools to split long text into threads and posts for X, Threads, LinkedIn, Reddit, Mastodon, and Facebook.",
    url: getCanonicalUrl(SOCIAL_TOOL_PATHS.landing),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Tools | threadify",
    description: "Free thread and post generators for X, Threads, LinkedIn, Reddit, Mastodon, and Facebook.",
  },
}

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
