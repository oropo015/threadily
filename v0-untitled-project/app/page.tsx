"use client"

import { ThreadGenerator } from "@/components/thread-generator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LandingPage } from "@/components/landing-page"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { WebsiteStructuredData, SoftwareApplicationStructuredData } from "@/components/structured-data"

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [showApp, setShowApp] = useState(false)

  // Handle language from URL parameter
  useEffect(() => {
    const langParam = searchParams.get("lang")
    if (langParam && ["en", "es", "fr", "de", "ja"].includes(langParam)) {
      setLanguage(langParam)
    }

    // Check if we should show the app or landing page
    if (pathname === "/app") {
      setShowApp(true)
    } else {
      setShowApp(false)
    }
  }, [searchParams, setLanguage, pathname])

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Add structured data for SEO */}
      <WebsiteStructuredData />
      <SoftwareApplicationStructuredData />

      <Header />
      {showApp ? (
        <div className="flex-1 container mx-auto px-4 py-4 sm:py-8 max-w-5xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-2 sm:mb-3 tracking-tight">
              {t("home", "title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              {t("home", "description")}
            </p>
          </div>
          <ThreadGenerator />
        </div>
      ) : (
        <LandingPage />
      )}
      <Footer />
    </main>
  )
}
