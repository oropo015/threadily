"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"

type CookiePreferences = {
  essential: boolean
  functional: boolean
  analytics: boolean
  advertising: boolean
}

export function CookiePreferences({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Essential cookies cannot be disabled
    functional: false,
    analytics: false,
    advertising: false,
  })

  useEffect(() => {
    // Load saved preferences when component mounts
    const savedPreferences = localStorage.getItem("cookie-preferences")
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences)
        setPreferences({
          ...parsed,
          essential: true, // Always ensure essential is true
        })
      } catch (e) {
        console.error("Error parsing saved cookie preferences", e)
      }
    }
  }, [])

  const handleSave = () => {
    // Save preferences to localStorage
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    localStorage.setItem("cookie-consent", "customized")
    onOpenChange(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      advertising: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookie-preferences", JSON.stringify(allAccepted))
    localStorage.setItem("cookie-consent", "accepted")
    onOpenChange(false)
  }

  const handleRejectAll = () => {
    const allRejected = {
      essential: true, // Essential cookies cannot be disabled
      functional: false,
      analytics: false,
      advertising: false,
    }
    setPreferences(allRejected)
    localStorage.setItem("cookie-preferences", JSON.stringify(allRejected))
    localStorage.setItem("cookie-consent", "rejected")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="cookie-preferences-description">
        <DialogHeader>
          <DialogTitle className="text-xl">Cookie Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p id="cookie-preferences-description" className="text-sm text-gray-600 dark:text-gray-400">
            Customize your cookie preferences. Some cookies are necessary for the website to function properly and
            cannot be disabled.
          </p>

          <div className="space-y-4">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label className="text-base font-medium">Essential Cookies</Label>
                  <div className="ml-2 rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs text-green-800 dark:text-green-200">
                    Required
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
              </div>
              <Switch checked={preferences.essential} disabled />
            </div>

            {/* Functional Cookies */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Functional Cookies</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  These cookies enable personalized features and functionality.
                </p>
              </div>
              <Switch
                checked={preferences.functional}
                onCheckedChange={(checked) => setPreferences({ ...preferences, functional: checked })}
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Analytics Cookies</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  These cookies help us improve our website by collecting anonymous information.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
              />
            </div>

            {/* Advertising Cookies */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Advertising Cookies</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  These cookies are used to show you relevant advertisements on other websites.
                </p>
              </div>
              <Switch
                checked={preferences.advertising}
                onCheckedChange={(checked) => setPreferences({ ...preferences, advertising: checked })}
              />
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              You can change your cookie preferences at any time by clicking on "Cookie Settings" in the footer.
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleRejectAll} className="sm:w-auto w-full">
            Reject All
          </Button>
          <Button variant="outline" onClick={handleSave} className="sm:w-auto w-full">
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll} className="sm:w-auto w-full">
            Accept All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
