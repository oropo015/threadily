"use client"

import { useState, useEffect } from "react"
import { ThreadGenerator } from "@/components/thread-generator"
import { PlatformSeoContent } from "@/components/platform-seo-content"
import type { PlatformKey } from "@/lib/constants"

interface SocialToolClientProps {
  platform: PlatformKey
}

export function SocialToolClient({ platform }: SocialToolClientProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sync URL-derived platform to localStorage and dispatch so Header and ThreadGenerator stay in sync
  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("threadify-platform", platform)
    window.dispatchEvent(new CustomEvent("platformChange", { detail: platform }))
  }, [platform])

  return (
    <>
      {isClient && <ThreadGenerator initialPlatform={platform} />}
      <PlatformSeoContent platform={platform} />
    </>
  )
}
