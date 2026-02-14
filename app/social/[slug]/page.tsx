import { notFound } from "next/navigation"
import { getPlatformFromPath, getSocialToolPath } from "@/lib/social-routes"
import { getPlatformMetadata } from "@/lib/platform-metadata"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { BreadcrumbStructuredData, HowToStructuredData } from "@/components/structured-data"
import { getCanonicalUrl } from "@/lib/social-routes"
import { SocialToolClient } from "./social-tool-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"

type PageProps = { params: Promise<{ slug: string }> }

const VALID_SLUGS = [
  "x-thread-generator",
  "threads-thread-generator",
  "linkedin-post-formatter",
  "reddit-post-splitter",
  "mastodon-post-splitter",
  "facebook-post-formatter",
] as const

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const platform = getPlatformFromPath(slug)
  if (!platform) return {}
  return getPlatformMetadata(platform)
}

export default async function SocialToolPage({ params }: PageProps) {
  const { slug } = await params
  const platform = getPlatformFromPath(slug)
  if (!platform) notFound()

  const name = PLATFORMS[platform].name
  const url = getCanonicalUrl(getSocialToolPath(platform))

  const howToName =
    platform === "twitter"
      ? "How to Create an X (Twitter) Thread"
      : platform === "threads"
        ? "How to Create a Threads Thread"
        : platform === "linkedin"
          ? "How to Format a LinkedIn Post"
          : platform === "reddit"
            ? "How to Split a Reddit Post"
            : platform === "mastodon"
              ? "How to Split Text for Mastodon"
              : "How to Format a Facebook Post"
  const howToDescription = `Use Threadify to split or format long text for ${name} with the correct character limits.`

  return (
    <div className="min-h-screen flex flex-col">
      <HowToStructuredData name={howToName} description={howToDescription} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://threadify.pro" },
          { name: "Social tools", url: "https://threadify.pro/social" },
          { name: `${name} tool`, url },
        ]}
      />
      <Header />
      <main id="thread-generator" className="flex-1">
        <section
          className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl border-b border-gray-200 dark:border-gray-800"
          aria-label="Tool introduction"
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-2 sm:mb-3 tracking-tight">
              {platform === "twitter" && "X Thread Generator – Split Long Text into Tweets"}
              {platform === "threads" && "Threads Thread Generator – Split Text for Threads"}
              {platform === "linkedin" && "LinkedIn Post Formatter – Format Long Posts"}
              {platform === "reddit" && "Reddit Post Splitter – Split Long Posts for Reddit"}
              {platform === "mastodon" && "Mastodon Post Splitter – Split Text into Toots"}
              {platform === "facebook" && "Facebook Post Formatter – Format Posts for Facebook"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-4">
              {platform === "twitter" &&
                "Create X (Twitter) threads from long text. Each tweet stays within 280 characters."}
              {platform === "threads" && "Create Threads threads from long text. Each post stays within 500 characters."}
              {platform === "linkedin" && "Format long text for LinkedIn. Structure posts within the 3,000-character limit."}
              {platform === "reddit" && "Split long text for Reddit. Use markdown and stay within post limits."}
              {platform === "mastodon" && "Split long text into Mastodon toots. Each toot stays within 500 characters."}
              {platform === "facebook" && "Format and split long text for Facebook. Optimize for engagement."}
            </p>
            <Link href="#thread-generator" className="inline-block">
              <Button variant="outline" size="sm">
                Jump to generator
              </Button>
            </Link>
          </div>
        </section>
        <div className="container mx-auto px-4 py-8">
          <SocialToolClient platform={platform} />
          {process.env.NODE_ENV === "production" && <PerformanceMonitor />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
