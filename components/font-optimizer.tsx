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
  }, [])

  return null
}
