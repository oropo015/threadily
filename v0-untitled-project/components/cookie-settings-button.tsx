"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { CookiePreferences } from "./cookie-preferences"

export function CookieSettingsButton() {
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    // Listen for the custom event to open cookie preferences
    const handleOpenPreferences = () => {
      setShowPreferences(true)
    }

    window.addEventListener("open-cookie-preferences", handleOpenPreferences)

    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences)
    }
  }, [])

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShowPreferences(true)} className="flex items-center gap-1">
        <Settings className="h-3.5 w-3.5" />
        <span>Cookie Settings</span>
      </Button>
      <CookiePreferences open={showPreferences} onOpenChange={setShowPreferences} />
    </>
  )
}
