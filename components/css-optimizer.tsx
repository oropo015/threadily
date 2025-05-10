"use client"

import { useEffect } from "react"

export function CSSOptimizer() {
  useEffect(() => {
    // Find all non-critical stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])')

    stylesheets.forEach((stylesheet) => {
      // Add media="print" and then switch to all after load
      // This prevents render blocking while still loading the stylesheet
      const originalMedia = stylesheet.getAttribute("media") || "all"

      if (originalMedia === "all") {
        stylesheet.setAttribute("media", "print")
        stylesheet.setAttribute("data-original-media", originalMedia)

        // Switch back to original media after load
        stylesheet.onload = () => {
          stylesheet.setAttribute("media", originalMedia)
        }
      }
    })
  }, [])

  return null
}
