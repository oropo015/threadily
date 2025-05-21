import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Threadify Blog - Social Media Thread Tips & Strategies",
  description:
    "Learn how to create engaging social media threads, optimize your content, and grow your audience with Threadify's expert tips and strategies.",
  openGraph: {
    title: "Threadify Blog - Social Media Thread Tips & Strategies",
    description:
      "Learn how to create engaging social media threads, optimize your content, and grow your audience with Threadify's expert tips and strategies.",
    type: "website",
    url: "https://threadify.pro/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Threadify Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threadify Blog - Social Media Thread Tips & Strategies",
    description:
      "Learn how to create engaging social media threads, optimize your content, and grow your audience with Threadify's expert tips and strategies.",
    images: ["/twitter-image.png"],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50" />
          </div>
          
          {/* Content container */}
          <div className="relative container mx-auto px-4 py-12">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
