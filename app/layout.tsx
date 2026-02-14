import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { FontOptimizer } from "@/components/font-optimizer"
import { CookieConsent } from "@/components/cookie-consent"

// Optimized font loading with subsetting and proper display
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: {
    default: "threadify - Free Social Media Threads Generator",
    template: "%s | threadify"
  },
  description: "Format your long text into perfectly-sized posts for Twitter, Instagram, and LinkedIn. Split text, optimize engagement, and create professional social media thread generator.",
  metadataBase: new URL("https://threadify.pro"),
  applicationName: "threadify",
  keywords: [
    "social media threads",
    "thread generator",
    "twitter thread maker",
    "instagram thread creator",
    "linkedin post generator",
    "content creation tool",
    "text splitter",
    "social media content",
    "thread optimization",
    "content formatting",
    "social media management",
    "content scheduling"
  ],
  creator: "threadify",
  publisher: "threadify",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://threadify.pro",
    siteName: "threadify",
    title: "threadify - Create Perfect Social Media Threads",
    description: "Format your long text into perfectly-sized posts for social media threads. Split text, add hashtags, and optimize your content.",
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
    site: "@threadifyapp",
    creator: "@threadifyapp",
    title: "threadify - Create Perfect Social Media Threads",
    description: "Format your long text into perfectly-sized posts for social media threads",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://threadify.pro",
    languages: {
      "en-US": "https://threadify.pro",
      "es-ES": "https://threadify.pro/es",
      "fr-FR": "https://threadify.pro/fr",
      "de-DE": "https://threadify.pro/de",
      "ja-JP": "https://threadify.pro/ja",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "msapplication-TileColor": "#4169E1",
    "theme-color": "#4169E1",
    "referrer": "origin-when-cross-origin",
    "author": "threadify",
    "category": "Social Media Tools",
    "distribution": "Global",
    "rating": "General",
    "revisit-after": "7 days",
    "generator": "Next.js",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#4169E1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="author" content="threadify" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="category" content="Social Media Tools" />
        
        {/* Preconnect and DNS prefetch for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Apple touch icons */}
        <link rel="apple-touch-startup-image" href="/apple-splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Social media verification */}
        <meta name="twitter:site" content="@threadifyapp" />
        <meta property="og:site_name" content="threadify" />
        
        {/* Performance monitoring */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        
        {/* Structured Data — server-rendered so crawlers see it without JS */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Threadify",
            url: "https://threadify.pro",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://threadify.pro/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            description:
              "Create perfect social media threads for Twitter, Instagram, and LinkedIn. Split text, add hashtags, and optimize your content.",
            publisher: {
              "@type": "Organization",
              name: "Threadify",
              logo: { "@type": "ImageObject", url: "https://threadify.pro/logo.png" },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Threadify",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "156" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "threadify",
            "url": "https://threadify.pro",
            "description": "Format your long text into perfectly-sized posts for social media threads",
            "applicationCategory": "Social Media Tool",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "threadify",
              "url": "https://threadify.pro"
            }
          })}
        </script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <FontOptimizer />
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          storageKey="threadify-theme"
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <CookieConsent />
      </body>
    </html>
  )
}