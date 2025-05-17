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
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
