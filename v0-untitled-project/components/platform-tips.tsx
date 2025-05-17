"use client"

import { useState, useEffect } from "react"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Info } from "lucide-react"

export function PlatformTips() {
  const [platform, setPlatform] = useState<PlatformKey>("twitter")

  // Listen for platform changes from other components
  useEffect(() => {
    const handlePlatformChange = (event: CustomEvent) => {
      setPlatform(event.detail as PlatformKey)
    }

    // Load platform preference from localStorage on initial render
    if (typeof window !== "undefined") {
      const savedPlatform = localStorage.getItem("threadify-platform") as PlatformKey
      if (savedPlatform && Object.keys(PLATFORMS).includes(savedPlatform)) {
        setPlatform(savedPlatform)
      }
    }

    window.addEventListener("platformChange", handlePlatformChange as EventListener)
    return () => {
      window.removeEventListener("platformChange", handlePlatformChange as EventListener)
    }
  }, [])

  const platformInfo = PLATFORMS[platform]

  if (!platformInfo) return null

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-4 w-4" />
          Tips for {platformInfo.name}
        </CardTitle>
        <CardDescription>Optimize your content for this platform</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium">Character limit:</span> {platformInfo.characterLimit} characters per post
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium">Optimal length:</span> {platformInfo.optimalLength} characters for best
              engagement
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium">Hashtags:</span> {platformInfo.hashtagTip}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-medium">Best practice:</span> {platformInfo.bestPractice}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
