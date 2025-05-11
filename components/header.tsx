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
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  const [platform, setPlatform] = useState<PlatformKey>("twitter")
  const { language, setLanguage, t } = useLanguage()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on the landing page
  const isLandingPage = pathname === "/" || pathname === ""

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update localStorage keys
  // Load platform preference from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPlatform = localStorage.getItem("threadify-platform") as PlatformKey
      if (savedPlatform && Object.keys(PLATFORMS).includes(savedPlatform)) {
        setPlatform(savedPlatform)
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent("platformChange", { detail: savedPlatform }))
      }
    }
  }, [])

  // Save platform preference to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("threadify-platform", platform)
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent("platformChange", { detail: platform }))
    }
  }, [platform])

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
              <Image 
                src="/logo.png" 
                alt="threadify logo" 
                width={32} 
                height={32} 
                className="object-contain" 
                priority={true}
                quality={100}
              />
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

          {/* Only show platform selector if not on landing page */}
          {!isLandingPage && (
            <Select value={platform} onValueChange={(value: PlatformKey) => setPlatform(value)}>
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

          {/* Add a "Try App" button on landing page */}
          {isLandingPage && (
            <Link href="/app">
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
                  href="https://buy.stripe.com/00g3ga4Nte98b848wz"
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
      <div
        id="mobile-menu"
        className={`md:hidden py-3 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 fixed top-[60px] left-0 right-0 z-50 shadow-lg transition-all duration-200 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="space-y-3">
          {/* Only show platform selector if not on landing page */}
          {!isLandingPage && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{t("header", "platform")}</span>
              <Select value={platform} onValueChange={(value: PlatformKey) => setPlatform(value)}>
                <SelectTrigger className="w-[140px] h-9 min-w-[140px] min-h-[44px]" aria-label="Select platform">
                  <SelectValue placeholder={t("header", "platform")} />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={5} className="w-[140px]">
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
              <SelectContent position="popper" sideOffset={5} className="w-[100px]">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Try App button for mobile if on landing page */}
          {isLandingPage && (
            <Link href="/app" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white min-h-[44px]">
                Try App
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
