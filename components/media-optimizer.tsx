"use client"

import { useEffect, useRef } from "react"
import { throttle } from "@/lib/performance-utils"

export function MediaOptimizer() {
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    // Find all video elements and optimize them
    const optimizeVideos = () => {
      const videos = document.querySelectorAll("video")

      videos.forEach((video) => {
        // Add loading="lazy" attribute
        video.setAttribute("loading", "lazy")

        // Add preload="none" attribute
        video.setAttribute("preload", "none")

        // Add playsinline attribute
        video.setAttribute("playsinline", "")

        // Add controls if not present
        if (!video.hasAttribute("controls")) {
          video.setAttribute("controls", "")
        }
      })
    }

    // Find all iframes and optimize them
    const optimizeIframes = () => {
      const iframes = document.querySelectorAll("iframe")

      iframes.forEach((iframe) => {
        // Add loading="lazy" attribute
        iframe.setAttribute("loading", "lazy")

        // Add title if not present
        if (!iframe.hasAttribute("title")) {
          iframe.setAttribute("title", "Embedded content")
        }
      })
    }

    // Run optimizations
    const runOptimizations = throttle(() => {
      optimizeVideos()
      optimizeIframes()
    }, 300)

    // Run on initial load
    runOptimizations()

    // Run on DOM changes
    const observer = new MutationObserver(runOptimizations)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Clean up
    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
