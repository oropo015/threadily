import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SOCIAL_TOOL_PATHS } from "@/lib/social-routes"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Twitter, AtSign, Linkedin, MessageSquare, Hash, Facebook } from "lucide-react"

const TOOLS: { platform: PlatformKey; path: string; shortDesc: string }[] = [
  {
    platform: "twitter",
    path: SOCIAL_TOOL_PATHS.x,
    shortDesc: "Split long text into 280-character tweets. Build engaging X (Twitter) threads.",
  },
  {
    platform: "threads",
    path: SOCIAL_TOOL_PATHS.threads,
    shortDesc: "Format content for Meta’s Threads app with 500-character posts.",
  },
  {
    platform: "linkedin",
    path: SOCIAL_TOOL_PATHS.linkedin,
    shortDesc: "Format long posts for LinkedIn with the right structure and length.",
  },
  {
    platform: "reddit",
    path: SOCIAL_TOOL_PATHS.reddit,
    shortDesc: "Split and format posts for Reddit with markdown support.",
  },
  {
    platform: "mastodon",
    path: SOCIAL_TOOL_PATHS.mastodon,
    shortDesc: "Create Mastodon threads with 500-character toots and content warnings.",
  },
  {
    platform: "facebook",
    path: SOCIAL_TOOL_PATHS.facebook,
    shortDesc: "Format and split Facebook posts for better engagement.",
  },
]

function getIcon(platform: PlatformKey) {
  switch (platform) {
    case "twitter":
      return <Twitter className="h-5 w-5" />
    case "threads":
      return <AtSign className="h-5 w-5" />
    case "linkedin":
      return <Linkedin className="h-5 w-5" />
    case "reddit":
      return <MessageSquare className="h-5 w-5" />
    case "mastodon":
      return <Hash className="h-5 w-5" />
    case "facebook":
      return <Facebook className="h-5 w-5" />
    default:
      return null
  }
}

export default function SocialLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 max-w-4xl border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Social media thread & post tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Free tools to split long text into platform-sized posts for X (Twitter), Threads, LinkedIn, Reddit,
            Mastodon, and Facebook. Choose a tool below to get started.
          </p>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Tools by platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map(({ platform, path, shortDesc }) => (
              <Link
                key={platform}
                href={path}
                className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  {getIcon(platform)}
                  <span className="font-semibold">{PLATFORMS[platform].name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{shortDesc}</p>
                <Button variant="outline" size="sm" className="w-fit">
                  Use tool
                </Button>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
