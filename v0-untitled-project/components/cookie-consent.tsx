"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Settings } from "lucide-react"
import { CookiePreferences } from "./cookie-preferences"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    // Accept all cookies
    localStorage.setItem("cookie-consent", "accepted")
    localStorage.setItem(
      "cookie-preferences",
      JSON.stringify({
        essential: true,
        functional: true,
        analytics: true,
        advertising: true,
      }),
    )
    setShowConsent(false)
  }

  const declineCookies = () => {
    // Decline all cookies except essential
    localStorage.setItem("cookie-consent", "declined")
    localStorage.setItem(
      "cookie-preferences",
      JSON.stringify({
        essential: true,
        functional: false,
        analytics: false,
        advertising: false,
      }),
    )
    setShowConsent(false)
  }

  const openPreferences = () => {
    setShowPreferences(true)
  }

  if (!showConsent) return <CookiePreferences open={showPreferences} onOpenChange={setShowPreferences} />

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-medium mb-2">We value your privacy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We use cookies to improve your experience on our site. Some are essential for the site to function
                properly, while others help us understand how you use the site. Read our{" "}
                <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
                  Cookie Policy
                </Link>{" "}
                for more information.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
              <Button variant="outline" size="sm" onClick={declineCookies}>
                Decline
              </Button>
              <Button variant="outline" size="sm" onClick={openPreferences} className="flex items-center gap-1">
                <Settings className="h-3.5 w-3.5" />
                <span>Preferences</span>
              </Button>
              <Button size="sm" onClick={acceptCookies}>
                Accept All Cookies
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 md:hidden"
                onClick={declineCookies}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CookiePreferences open={showPreferences} onOpenChange={setShowPreferences} />
    </>
  )
}
