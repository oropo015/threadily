import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { FontOptimizer } from "@/components/font-optimizer"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "threadily - Create Perfect Social Media Threads | Thread Generator Tool",
  description:
    "Format your long text into perfectly-sized posts for Twitter, Instagram, and LinkedIn threads. Split text, add hashtags, analyze tone, and optimize your social media content.",
  metadataBase: new URL("https://threadily.com"),
  keywords:
    "social media threads, thread generator, twitter threads, instagram threads, linkedin posts, content creation, social media tool, text splitter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://threadily.com",
    title: "threadily - Create Perfect Social Media Threads",
    description:
      "Format your long text into perfectly-sized posts for social media threads. Split text, add hashtags, analyze tone, and optimize your content.",
    siteName: "threadily",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "threadily - Social Media Thread Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "threadily - Create Perfect Social Media Threads",
    description: "Format your long text into perfectly-sized posts for social media threads",
    creator: "@threadilyapp",
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
        <link rel="canonical" href="https://threadily.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <FontOptimizer />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
