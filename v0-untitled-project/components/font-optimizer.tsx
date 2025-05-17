"use client"

import { useEffect } from "react"

export function FontOptimizer() {
  useEffect(() => {
    // Add font display swap to all Google Fonts
    const links = document.querySelectorAll('link[href*="fonts.googleapis.com"]')

    links.forEach((link) => {
      const href = link.getAttribute("href")
      if (href && !href.includes("&display=swap")) {
        link.setAttribute("href", `${href}&display=swap`)
      }
    })

    // Preload critical fonts
    const preloadFonts = [{ href: "/fonts/inter-var.woff2", type: "font/woff2", crossOrigin: "anonymous" }]

    preloadFonts.forEach((font) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = font.href
      link.as = "font"
      link.type = font.type
      link.crossOrigin = font.crossOrigin
      document.head.appendChild(link)
    })
  }, [])

  return null
}
