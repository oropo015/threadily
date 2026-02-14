import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { SOCIAL_TOOL_PATHS } from "@/lib/social-routes"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"

/**
 * SEO-optimized content section for the thread generator page.
 * Server-rendered, indexable content with proper heading structure,
 * internal links, and helpful information for users and search engines.
 */
export function ThreadGeneratorSeoContent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Main SEO Content */}
      <section className="prose prose-gray dark:prose-invert max-w-none mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          How Our Free Thread Generator Works
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our social media thread generator helps you transform long-form content into perfectly formatted threads for Twitter (X), LinkedIn, Instagram Threads, Reddit, and Mastodon. Whether you're sharing a story, breaking down complex topics, or creating engaging content, our free tool automatically splits your text while respecting character limits and optimizing readability.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Simply paste your content, select your target platform, and let threadify handle the rest. The tool intelligently breaks text at natural points—sentence boundaries, paragraphs, or logical breaks—ensuring each post flows naturally. Character counts update in real-time, so you always know if your content fits within platform limits.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-8">
          Key Features for Content Creators
        </h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
          <li>
            <strong>Multi-platform support:</strong> Optimize threads for Twitter/X (280 chars), LinkedIn (3000 chars), Threads (500 chars), Reddit, and Mastodon with platform-specific character limits
          </li>
          <li>
            <strong>Smart text splitting:</strong> Automatic detection of sentence boundaries, paragraph breaks, and logical content divisions for natural-reading threads
          </li>
          <li>
            <strong>Real-time character counting:</strong> Live updates show exactly how many characters remain for each post, preventing over-length errors
          </li>
          <li>
            <strong>Format preservation:</strong> Maintains hashtags, mentions, URLs, and markdown formatting across all posts in your thread
          </li>
          <li>
            <strong>Customizable splitting:</strong> Manually adjust break points or let our AI-powered algorithm handle it automatically
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-8">
          Why Use a Thread Generator?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Social media threads have become essential for sharing detailed information without overwhelming your audience. Research from platforms like{" "}
          <a
            href="https://blog.twitter.com/en_us/topics/company/2023/celebrating-threads"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
          >
            Twitter's engineering blog
            <ExternalLink className="w-3 h-3" />
          </a>{" "}
          shows that well-formatted threads receive 3-5x more engagement than single long posts. By breaking content into digestible chunks, you improve readability, increase engagement, and make complex topics more accessible.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our thread maker eliminates the tedious manual work of counting characters, splitting text, and formatting each post individually. This saves content creators, marketers, and social media managers hours of work while ensuring professional, consistent formatting across all platforms.
        </p>
      </section>

      {/* Platform-specific tools — SEO + internal linking */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Platform-specific tools
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
          Use a dedicated tool for your platform: optimized limits, tips, and formatting.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {(["twitter", "threads", "linkedin", "reddit", "mastodon", "facebook"] as PlatformKey[]).map((p) => (
            <Link
              key={p}
              href={p === "twitter" ? SOCIAL_TOOL_PATHS.x : SOCIAL_TOOL_PATHS[p]}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">{PLATFORMS[p].name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                {p === "twitter" && "X thread generator"}
                {p === "threads" && "Threads thread generator"}
                {p === "linkedin" && "LinkedIn post formatter"}
                {p === "reddit" && "Reddit post splitter"}
                {p === "mastodon" && "Mastodon post splitter"}
                {p === "facebook" && "Facebook post formatter"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Related Tools & Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Home</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore all threadify features and tools
            </p>
          </Link>
          <Link
            href="/blog"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Blog</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tips, guides, and best practices for social media threads
            </p>
          </Link>
          <Link
            href="/faq"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">FAQ</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Common questions about thread generation and formatting
            </p>
          </Link>
          <Link
            href="/privacy"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Privacy Policy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn how we protect your content and data
            </p>
          </Link>
        </div>
      </section>

      {/* Additional helpful information */}
      <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Best Practices for Social Media Threads
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          To maximize engagement with your threads, start with a compelling hook in your first post, use clear numbering (1/n format), and maintain a consistent voice throughout. Consider adding relevant hashtags to increase discoverability, and always proofread your content before posting.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          For more insights on thread optimization and social media best practices, check out{" "}
          <a
            href="https://hootsuite.com/social-media-management"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
          >
            Hootsuite's social media management guide
            <ExternalLink className="w-3 h-3" />
          </a>
          .
        </p>
      </section>
    </div>
  )
}
