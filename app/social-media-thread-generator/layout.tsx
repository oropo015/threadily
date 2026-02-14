import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HowToStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Social Media Thread Generator",
  description:
    "Split long text into Twitter, Instagram, and LinkedIn threads. Free thread generator — format posts, add hashtags, and optimize for every platform.",
  alternates: {
    canonical: "https://threadify.pro/social-media-thread-generator",
  },
  openGraph: {
    title: "Social Media Thread Generator | threadify",
    description:
      "Split long text into Twitter, Instagram, and LinkedIn threads. Format posts, add hashtags, and optimize engagement.",
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
    title: "Social Media Thread Generator | threadify",
    description: "Split long text into Twitter, Instagram, and LinkedIn threads. Free thread generator.",
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
          Social Media Thread Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-4">
          Format your long text into perfectly-sized posts for Twitter, Threads, and LinkedIn. Split content, optimize
          character counts, and add hashtags.
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
