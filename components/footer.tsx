"use client"

import Image from "next/image"
import Link from "next/link"
import { Coffee, Twitter, MessageSquare, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { ModeToggle } from "./mode-toggle"
import { CookieSettingsButton } from "./cookie-settings-button"

// Custom Mastodon icon since it's not in Lucide
const MastodonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
    role="img"
  >
    <title>Mastodon</title>
    <path d="M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.184-2.737.368-4.185.276-2.368-.092-4.237-.551-4.237-.551 0 .184.014.459.043.643.308 2.294 2.317 2.478 4.22 2.57 1.922.091 3.635-.46 3.635-.46l.079 1.653s-1.344.734-3.728.918c-1.316.091-2.95-.092-4.85-.551-4.16-1.01-4.884-5.088-4.995-9.234-.033-1.194-.014-2.317-.014-3.259 0-4.147 2.717-5.364 2.717-5.364 1.379-.642 3.728-.918 6.182-.918h.057c2.454 0 4.802.276 6.182.918 0 0 2.717 1.217 2.717 5.364 0 0 .033 3.072-.585 5.179z" />
    <path d="M17.807 7.927c0-1.213-.669-1.831-2.01-1.831-1.493 0-2.238.93-2.238 2.76v5.326h-1.718V8.856c0-1.83-.746-2.76-2.238-2.76-1.342 0-2.01.618-2.01 1.831v3.538h-1.718V7.676c0-1.213.327-2.18.98-2.9.669-.716 1.545-1.083 2.634-1.083 1.26 0 2.22.486 2.843 1.457l.613 1.024.613-1.024c.622-.971 1.583-1.457 2.843-1.457 1.089 0 1.965.367 2.634 1.083.652.72.98 1.687.98 2.9v3.789h-1.718V7.927z" />
  </svg>
)

// Custom Reddit icon since it's not in Lucide
const RedditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
    role="img"
  >
    <title>Reddit</title>
    <path d="M12 1a10.16 10.16 0 0 1 10 10c0 5.5-4.5 10-10 10S2 16.5 2 11A10.16 10.16 0 0 1 12 1Z" />
    <path d="M8.7 10.7a1.1 1.1 0 0 0-2.2 0 1.1 1.1 0 0 0 2.2 0Z" />
    <path d="M15.3 10.7a1.1 1.1 0 0 0-2.2 0 1.1 1.1 0 0 0 2.2 0Z" />
    <path d="M9 16.5c.9.9 3.1.9 4 0" />
    <path d="M19.5 10.7c0-.6-.5-1-1-1-.2 0-.4 0-.5.1-1.4-1-3-1.5-4.7-1.6l.8-3.8 2.6.6c0 .6.5 1 1.1 1 .6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1-.4 0-.8.2-.9.6l-2.9-.7H14c-.1 0-.2.1-.3.1l-1 4.3c-1.7.1-3.3.7-4.7 1.6-.1 0-.3-.1-.5-.1-.6 0-1 .4-1 1 0 .5.3.8.7.9v.3c0 2.3 2.8 4.1 6.3 4.1s6.3-1.9 6.3-4.1v-.3c.4-.1.7-.4.7-.9Z" />
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="border-t py-8 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="threadify" width={32} height={32} className="object-contain" />
              </div>
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">threadify</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              {t("footer", "toolDescription") || "Create, optimize, and manage your social media threads with ease."}
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link
                  href="https://x.com/threadifyapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link
                  href="https://www.threads.net/@threadifyapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Threads</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link
                  href="https://www.reddit.com/user/Threadifyapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reddit"
                >
                  <RedditIcon />
                  <span className="sr-only">Reddit</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link
                  href="https://mastodon.social/@threadifyapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mastodon"
                >
                  <MastodonIcon />
                  <span className="sr-only">Mastodon</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/social-media-thread-generator"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  App
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog/maximizing-engagement-social-media-threads"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Engagement Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/leveraging-ai-content-creation"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  AI Content Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/building-personal-brand-threaded-content"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Personal Branding
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/content-repurposing-one-idea-multiple-platforms"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Content Repurposing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a
                  href="mailto:info@techternet.com"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  info@techternet.com
                </a>
              </li>
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                  asChild
                >
                  <Link
                    href="https://buy.stripe.com/00g3ga4Nte98b848wz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Coffee className="h-4 w-4" aria-hidden="true" />
                    {t("footer", "buyMeCoffee") || "Buy me a coffee"}
                  </Link>
                </Button>
              </li>
              <li className="pt-2">
                <ModeToggle />
              </li>
              <li className="pt-2">
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">© {currentYear} threadify. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
