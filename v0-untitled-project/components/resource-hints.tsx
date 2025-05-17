"use client"

import { useEffect } from "react"

interface ResourceHintsProps {
  preconnect?: string[]
  prefetch?: string[]
  prerender?: string[]
}

export function ResourceHints({ preconnect = [], prefetch = [], prerender = [] }: ResourceHintsProps) {
  useEffect(() => {
    // Add preconnect hints
    preconnect.forEach((url) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = url
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    // Add prefetch hints for likely navigation
    prefetch.forEach((url) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = url
      document.head.appendChild(link)
    })

    // Add prerender hints for very likely navigation
    prerender.forEach((url) => {
      const link = document.createElement("link")
      link.rel = "prerender"
      link.href = url
      document.head.appendChild(link)
    })

    // Clean up
    return () => {
      document.querySelectorAll("link[data-resource-hint]").forEach((el) => {
        document.head.removeChild(el)
      })
    }
  }, [preconnect, prefetch, prerender])

  return null
}
