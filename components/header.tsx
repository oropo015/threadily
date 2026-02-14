"use client"

import { ModeToggle } from "./mode-toggle"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Twitter, AtSign, MessageSquare, Hash, Linkedin, Facebook, Menu, X, Coffee } from "lucide-react"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getPlatformFromPath, getSocialToolPath } from "@/lib/social-routes"

export function Header() {
  const [platform, setPlatform] = useState<PlatformKey>("twitter")
  const { language, setLanguage, t } = useLanguage()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if we're on the home landing page
  const isLandingPage = pathname === "/" || pathname === ""

  // When on a /social/xxx tool page, derive platform from URL so dropdown and URL stay in sync
  const isSocialToolPage = pathname?.startsWith("/social/") && pathname !== "/social"
  const slugFromPath = isSocialToolPage ? pathname.replace(/^\/social\/?/, "").split("/")[0] ?? "" : ""
  const platformFromPath = isSocialToolPage ? getPlatformFromPath(slugFromPath) : null
  const displayPlatform = platformFromPath ?? platform

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load platform from localStorage on initial render (when not on a platform-specific /social/xxx page)
  useEffect(() => {
    if (typeof window !== "undefined" && !platformFromPath) {
      const savedPlatform = localStorage.getItem("threadify-platform") as PlatformKey
      if (savedPlatform && Object.keys(PLATFORMS).includes(savedPlatform)) {
        setPlatform(savedPlatform)
        window.dispatchEvent(new CustomEvent("platformChange", { detail: savedPlatform }))
      }
    }
  }, [])

  // When pathname is a /social/xxx page, sync platform state from URL
  useEffect(() => {
    if (platformFromPath) setPlatform(platformFromPath)
  }, [platformFromPath])

  // Save platform preference to localStorage when it changes (and not driven by URL)
  useEffect(() => {
    if (typeof window !== "undefined" && !platformFromPath) {
      localStorage.setItem("threadify-platform", platform)
      window.dispatchEvent(new CustomEvent("platformChange", { detail: platform }))
    }
  }, [platform, platformFromPath])

  const getPlatformIcon = (platformKey: PlatformKey) => {
    switch (platformKey) {
      case "twitter":
        return <Twitter className="h-4 w-4 mr-2" aria-hidden="true" />
      case "threads":
        return <AtSign className="h-4 w-4 mr-2" aria-hidden="true" />
      case "reddit":
        return <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
      case "mastodon":
        return <Hash className="h-4 w-4 mr-2" aria-hidden="true" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />
      case "facebook":
        return <Facebook className="h-4 w-4 mr-2" aria-hidden="true" />
      default:
        return null
    }
  }

  return (
    <header className="border-b py-3 bg-white dark:bg-gray-950 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
            aria-label="threadify home"
          >
            <div className="relative h-8 w-8">
              <Image src="/logo.png" alt="threadify logo" width={32} height={32} className="object-contain" priority />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              threadify
            </h1>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          {!isLandingPage && (
            <span className="text-sm text-gray-600 dark:text-gray-300">{t("header", "formatText")}</span>
          )}

          <Link
            href="/blog"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            FAQ
          </Link>

          {/* Buy Me a Coffee button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://buy.stripe.com/00g3ga4Nte98b848wz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  aria-label="Buy me a coffee"
                >
                  <Coffee className="h-5 w-5 text-amber-500" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buy me a coffee</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Keep only the ModeToggle component */}
          <ModeToggle />

          {/* Only show platform selector if not on home landing page */}
          {!isLandingPage && (
            <Select
              value={displayPlatform}
              onValueChange={(value: PlatformKey) => {
                if (isSocialToolPage) {
                  router.push(getSocialToolPath(value))
                } else {
                  setPlatform(value)
                  window.dispatchEvent(new CustomEvent("platformChange", { detail: value }))
                }
              }}
            >
              <SelectTrigger className="w-[140px] h-9 min-w-[140px] min-h-[36px]" aria-label="Select platform">
                <SelectValue placeholder={t("header", "platform")} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PLATFORMS).map(([key, value]) => (
                  <SelectItem key={key} value={key} className="flex items-center">
                    <div className="flex items-center">
                      {getPlatformIcon(key as PlatformKey)}
                      {t("platforms", key)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[100px] h-9 min-w-[100px] min-h-[36px]" aria-label="Select language">
              <SelectValue placeholder={t("header", "language")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>

          {isLandingPage && (
            <Link href="/social-media-thread-generator">
              <Button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white min-w-[100px] min-h-[36px]">
                Try App
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          {/* Buy Me a Coffee button for mobile */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.buymeacoffee.com/threadify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground mr-2"
                  aria-label="Buy me a coffee"
                >
                  <Coffee className="h-5 w-5 text-amber-500" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buy me a coffee</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 p-0 min-w-[44px] min-h-[44px]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden py-3 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 animate-in fade-in-50"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 py-2">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/social-media-thread-generator"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                App
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/faq"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>

            {!isLandingPage && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t("header", "platform")}</span>
                <Select
                  value={displayPlatform}
                  onValueChange={(value: PlatformKey) => {
                    if (isSocialToolPage) {
                      router.push(getSocialToolPath(value))
                      setMobileMenuOpen(false)
                    } else {
                      setPlatform(value)
                      window.dispatchEvent(new CustomEvent("platformChange", { detail: value }))
                    }
                  }}
                >
                  <SelectTrigger className="w-[140px] h-9 min-w-[140px] min-h-[44px]" aria-label="Select platform">
                    <SelectValue placeholder={t("header", "platform")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PLATFORMS).map(([key, value]) => (
                      <SelectItem key={key} value={key} className="flex items-center">
                        <div className="flex items-center">
                          {getPlatformIcon(key as PlatformKey)}
                          {t("platforms", key)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{t("header", "language")}</span>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[100px] h-9 min-w-[100px] min-h-[44px]" aria-label="Select language">
                  <SelectValue placeholder={t("header", "language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Theme</span>
              <div className="flex items-center gap-2">
                {/* Keep only the ModeToggle component in mobile menu */}
                <ModeToggle />
              </div>
            </div>

            {/* Add a "Try App" button on landing page */}
            {isLandingPage && (
              <div className="pt-2">
                <Link href="/social-media-thread-generator" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white min-h-[44px]">Try App</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
