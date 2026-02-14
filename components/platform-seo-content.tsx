import Link from "next/link"
import { PLATFORM_SEO_CONTENT } from "@/lib/platform-seo-content"
import { SOCIAL_TOOL_PATHS, getSocialToolPath } from "@/lib/social-routes"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { FAQPageStructuredData } from "@/components/structured-data"
import { ExternalLink } from "lucide-react"

interface PlatformSeoContentProps {
  platform: PlatformKey
}

/** Renders platform-specific SEO content (paragraphs, tips, FAQ) and "Other tools" links. */
export function PlatformSeoContent({ platform }: PlatformSeoContentProps) {
  const content = PLATFORM_SEO_CONTENT[platform]
  if (!content) return null

  const otherPlatforms = (Object.keys(PLATFORMS) as PlatformKey[]).filter((p) => p !== platform)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <section className="prose prose-gray dark:prose-invert max-w-none mb-8">
        {content.paragraphs.map((para, i) => (
          <p key={i} className="text-gray-700 dark:text-gray-300 mb-4">
            {para}
          </p>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Tips for {PLATFORMS[platform].name}
        </h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {content.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4">
          {content.faqs.map((faq, i) => (
            <div key={i}>
              <dt className="font-medium text-gray-900 dark:text-gray-100 mb-1">{faq.question}</dt>
              <dd className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
        <FAQPageStructuredData faqs={content.faqs} />
      </section>

      <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Other tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {otherPlatforms.map((p) => (
            <Link
              key={p}
              href={getSocialToolPath(p)}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center gap-2"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">{PLATFORMS[p].name}</span>
              <ExternalLink className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href={SOCIAL_TOOL_PATHS.landing} className="text-blue-500 hover:underline">
            View all social media tools
          </Link>
        </p>
      </section>
    </div>
  )
}
