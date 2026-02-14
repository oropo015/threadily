import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HowToStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Free Thread Generator for Twitter, LinkedIn & Threads",
  description:
    "Create perfect social media threads for Twitter, LinkedIn, and Threads. Free tool to split text, optimize posts, and format content.",
  alternates: {
    canonical: "https://threadify.pro/social-media-thread-generator",
  },
  openGraph: {
    title: "Free Thread Generator for Twitter, LinkedIn & Threads | threadify",
    description:
      "Create perfect social media threads. Free tool to split text, optimize posts, and format content for Twitter, LinkedIn, and Threads.",
    url: "https://threadify.pro/social-media-thread-generator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "threadify - Social Media Thread Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Thread Generator for Twitter, LinkedIn & Threads",
    description: "Create perfect social media threads. Free tool to split text, optimize posts, and format content.",
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
          Free Thread Generator for Twitter, LinkedIn & Threads
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-4">
          Create perfect social media threads with our free tool. Split long text into optimized posts for Twitter, LinkedIn, and Threads. Format content, manage character counts, and enhance engagement.
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
    </>
  )
}
