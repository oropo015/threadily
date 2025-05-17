"use client"

import { useEffect } from "react"

interface ScriptOptimizerProps {
  deferScripts?: boolean
  asyncScripts?: boolean
}

export function ScriptOptimizer({ deferScripts = true, asyncScripts = true }: ScriptOptimizerProps) {
  useEffect(() => {
    // Find all non-critical scripts
    const scripts = document.querySelectorAll("script:not([data-critical])")

    scripts.forEach((script) => {
      // Skip inline scripts
      if (!script.src) return

      // Skip already optimized scripts
      if (script.defer || script.async) return

      // Apply defer or async
      if (deferScripts) {
        script.defer = true
      } else if (asyncScripts) {
        script.async = true
      }
    })
  }, [deferScripts, asyncScripts])

  return null
}
