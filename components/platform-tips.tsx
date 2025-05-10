"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Twitter, AtSign, MessageSquare, Hash, Info, Linkedin, Facebook } from "lucide-react"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"

export function PlatformTips() {
  const [platform, setPlatform] = useState<PlatformKey>("twitter")
  const { t } = useLanguage()

  useEffect(() => {
    // Load platform preference from localStorage on initial render
    if (typeof window !== "undefined") {
      const savedPlatform = localStorage.getItem("threadily-platform") as PlatformKey
      if (savedPlatform && Object.keys(PLATFORMS).includes(savedPlatform)) {
        setPlatform(savedPlatform)
      }
    }

    // Listen for platform changes
    const handlePlatformChange = (e: CustomEvent) => {
      setPlatform(e.detail as PlatformKey)
    }

    window.addEventListener("platformChange", handlePlatformChange as EventListener)

    return () => {
      window.removeEventListener("platformChange", handlePlatformChange as EventListener)
    }
  }, [])

  const getPlatformIcon = () => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-5 w-5 text-blue-500" />
      case "threads":
        return <AtSign className="h-5 w-5 text-purple-500" />
      case "reddit":
        return <MessageSquare className="h-5 w-5 text-orange-500" />
      case "mastodon":
        return <Hash className="h-5 w-5 text-teal-500" />
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-blue-700" />
      case "facebook":
        return <Facebook className="h-5 w-5 text-blue-600" />
      default:
        return null
    }
  }

  const getTipKey = () => {
    return `${platform}Tip` as const
  }

  return (
    <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getPlatformIcon()}</div>
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-500" />
              {t("platforms", "platformSpecificTips")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t("platforms", getTipKey())}</p>
            <p className="text-xs text-gray-500 mt-2">
              {t("platforms", platform)} - {PLATFORMS[platform].maxChars} {t("threadGenerator", "characters")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
