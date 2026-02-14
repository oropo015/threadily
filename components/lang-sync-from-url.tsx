"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

/**
 * Syncs language from URL search param (?lang=) with LanguageContext.
 * Renders children so server-rendered content is preserved.
 */
export function LangSyncFromUrl({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const setLanguage = useLanguage().setLanguage

  useEffect(() => {
    const langParam = searchParams.get("lang")
    if (langParam && ["en", "es", "fr", "de", "ja"].includes(langParam)) {
      setLanguage(langParam as "en" | "es" | "fr" | "de" | "ja")
    }
  }, [searchParams, setLanguage])

  return <>{children}</>
}
