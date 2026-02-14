import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LandingPageServer } from "@/components/landing-page-server"
import { LangSyncFromUrl } from "@/components/lang-sync-from-url"
import { FAQPageStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "threadify - Free Social Media Thread Generator & Thread Maker",
  description: "Create perfect social media threads for Twitter/X, Threads, LinkedIn, Reddit, and Mastodon. Free thread generator that splits long text into optimized posts with smart formatting.",
  alternates: {
    canonical: "https://threadify.pro",
  },
}

const homepageFaqs = [
  {
    question: "Is Threadify free to use?",
    answer: "Yes, Threadify offers a free plan with all essential features. We also offer premium plans with advanced features for power users and teams.",
  },
  {
    question: "Which social media platforms does Threadify support?",
    answer: "Threadify currently supports Twitter (X), Instagram Threads, LinkedIn, Reddit, Facebook, and Mastodon. We're constantly adding support for more platforms.",
  },
  {
    question: "Can Threadify post directly to my social media accounts?",
    answer: "Currently, Threadify helps you format and optimize your content. You can easily copy the formatted threads to post manually or use with your favorite scheduling tools.",
  },
  {
    question: "How does the hashtag suggestion feature work?",
    answer: "Our AI-powered system analyzes your content and suggests relevant hashtags based on trending topics and engagement patterns specific to each platform.",
  },
]

/**
 * Home page: server-rendered so crawlers receive full H1, description, and landing content in initial HTML.
 */
export default function Home() {
  return (
    <LangSyncFromUrl>
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <Header />
        <LandingPageServer />
        <Footer />
        <FAQPageStructuredData faqs={homepageFaqs} />
      </main>
    </LangSyncFromUrl>
  )
}
