import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HowToStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Social Media Thread Generator",
  description:
    "Free thread generator — split long text into optimized posts for Twitter/X, Threads, LinkedIn, Reddit, and Mastodon. Smart formatting and one-click copy.",
  alternates: {
    canonical: "https://threadify.pro/social-media-thread-generator",
  },
  openGraph: {
    title: "Free Social Media Thread Generator | threadify",
    description:
      "Split long text into optimized threads for Twitter/X, Threads, LinkedIn, Reddit, and Mastodon. Smart formatting and one-click copy.",
    url: "https://threadify.pro/social-media-thread-generator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "threadify – Free Social Media Thread Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Social Media Thread Generator | threadify",
    description: "Split long text into optimized threads for Twitter/X, Threads, LinkedIn, Reddit, and Mastodon.",
    images: ["/twitter-image.png"],
  },
}

/**
 * Server-rendered above-the-fold block so crawlers get meaningful H1 and description in initial HTML.
 */
function ToolHero() {
  return (
    <section
      className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl border-b border-gray-200 dark:border-gray-800"
      aria-label="Tool introduction"
    >
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-2 sm:mb-3 tracking-tight">
          Free Social Media Thread Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-4">
          Paste your long-form text and split it into perfectly-sized posts for Twitter/X, Threads, LinkedIn, Reddit,
          and Mastodon. Optimized character counts, smart formatting, and one-click copy.
        </p>
        <Link href="#thread-generator" className="inline-block">
          <Button variant="outline" size="sm">
            Jump to generator
          </Button>
        </Link>
      </div>
    </section>
  )
}

/**
 * Server-rendered SEO content below the tool UI.
 * Visible by default so crawlers index it. Provides helpful context, internal links, and external references.
 */
function ToolSeoContent() {
  return (
    <section
      className="container mx-auto px-4 py-10 sm:py-14 max-w-4xl"
      aria-label="About the thread generator"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        How to Use the Free Thread Generator
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-8">
        <li>Paste or type your long-form text into the editor above.</li>
        <li>Select your target platform — Twitter/X, Threads, LinkedIn, Reddit, or Mastodon.</li>
        <li>threadify automatically splits your text into optimized posts that respect each platform&apos;s character limits.</li>
        <li>Review your thread, make any edits, then copy the formatted posts to your clipboard.</li>
      </ol>

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Why Use threadify for Social Media Threads?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4">
        Writing a compelling thread means more than chopping text into chunks. Each post needs to stand on its own
        while advancing the narrative. threadify handles the hard parts — smart splitting at sentence boundaries,
        accurate character counting (including links, mentions, and emoji), and platform-specific formatting rules —
        so you can focus on your message.
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-8">
        Whether you are a creator sharing insights, a marketer running campaigns, or someone with a story to tell,
        threadify turns long-form ideas into scroll-stopping threads — free, fast, and private. Your text never
        leaves your browser.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Supported Platforms
      </h3>
      <ul className="list-disc list-inside space-y-1.5 text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-8">
        <li><strong>Twitter / X</strong> — 280-character limit with automatic numbering (1/n format)</li>
        <li><strong>Threads</strong> — 500-character posts optimized for Meta&apos;s platform</li>
        <li><strong>LinkedIn</strong> — 3,000-character posts formatted for professional audiences</li>
        <li><strong>Reddit</strong> — Structured posts with markdown support</li>
        <li><strong>Mastodon</strong> — 500-character toots for the fediverse</li>
      </ul>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Features That Save You Time
      </h3>
      <ul className="list-disc list-inside space-y-1.5 text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-10">
        <li><strong>Smart text splitting</strong> — breaks content at natural sentence boundaries, never mid-word</li>
        <li><strong>Character counter</strong> — real-time counts for each post, accounting for links and mentions</li>
        <li><strong>Hashtag support</strong> — add hashtags without eating into your character budget</li>
        <li><strong>One-click copy</strong> — copy individual posts or the entire thread instantly</li>
        <li><strong>Dark mode</strong> — comfortable editing day or night</li>
      </ul>

      {/* Internal links */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Helpful Resources
        </h2>
        <nav aria-label="Related pages" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Home — threadify overview
          </Link>
          <Link
            href="/faq"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Frequently Asked Questions
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Blog — tips &amp; strategies
          </Link>
          <Link
            href="/blog/maximizing-engagement-social-media-threads"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Guide: Maximizing thread engagement
          </Link>
          <Link
            href="/blog/leveraging-ai-content-creation"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            AI-powered content creation
          </Link>
          <Link
            href="/blog/building-personal-brand-threaded-content"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Building a personal brand with threads
          </Link>
        </nav>
      </div>

      {/* External links */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Platform Documentation
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          Learn more about character limits and formatting from the official platform docs:
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://developer.x.com/en/docs/counting-characters"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
            >
              X / Twitter — Counting Characters (Developer Docs)
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/help/linkedin/answer/a521928"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
            >
              LinkedIn — Best Practices for Posts
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://threadify.pro" },
          { name: "Thread Generator", url: "https://threadify.pro/social-media-thread-generator" },
        ]}
      />
      <ToolHero />
      {children}
      <ToolSeoContent />
    </>
  )
}
