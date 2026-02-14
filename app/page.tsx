import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LandingPageServer } from "@/components/landing-page-server"
import { LangSyncFromUrl } from "@/components/lang-sync-from-url"

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
      </main>
    </LangSyncFromUrl>
  )
}
