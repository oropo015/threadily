import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { FontOptimizer } from "@/components/font-optimizer"
import { CookieConsent } from "@/components/cookie-consent"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "threadify - Create Perfect Social Media Threads | Thread Generator Tool",
  description:
    "Format your long text into perfectly-sized posts for Twitter, Instagram, and LinkedIn. Split text, optimize engagement, and create professional social media threads.",
  metadataBase: new URL("https://threadify.pro"),
  keywords:
    "social media threads, thread generator, twitter threads, instagram threads, linkedin posts, content creation, social media tool, text splitter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://threadify.pro",
    title: "threadify - Create Perfect Social Media Threads",
    description:
      "Format your long text into perfectly-sized posts for social media threads. Split text, add hashtags, and optimize your content.",
    siteName: "threadify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "threadify - Social Media Thread Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "threadify - Create Perfect Social Media Threads",
    description: "Format your long text into perfectly-sized posts for social media threads",
    creator: "@threadifyapp",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://threadify.pro",
    languages: {
      en: "https://threadify.pro",
      es: "https://threadify.pro?lang=es",
      fr: "https://threadify.pro?lang=fr",
      de: "https://threadify.pro?lang=de",
      ja: "https://threadify.pro?lang=ja",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#4169E1" />
        <link rel="canonical" href="https://threadify.pro" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Apple touch icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />

        {/* Social media verification */}
        <meta name="twitter:site" content="@threadifyapp" />
        <meta property="og:site_name" content="threadify" />
      </head>
      <body className={inter.className}>
        <FontOptimizer />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <CookieConsent />
      </body>
    </html>
  )
}
