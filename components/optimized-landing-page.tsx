"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { OptimizedImage } from "./optimized-image"
import { LazyComponent } from "./lazy-component"
import { ResourceHints } from "./resource-hints"
import { MediaOptimizer } from "./media-optimizer"

// Dynamically import non-critical components
const DynamicTestimonials = dynamic(() => import("./testimonials").then((mod) => mod.Testimonials), {
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  ),
  ssr: false,
})

export function OptimizedLandingPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {/* Add resource hints for likely navigation */}
      <ResourceHints preconnect={["https://fonts.googleapis.com", "https://fonts.gstatic.com"]} prefetch={["/social-media-thread-generator"]} />

      {/* Optimize media loading */}
      <MediaOptimizer />

      {/* Hero section with optimized image */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-600 mb-4">
                Create Perfect Social Media Threads
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Format your long text into perfectly-sized posts for Twitter, Instagram, and LinkedIn threads.
              </p>
              {/* Rest of hero content */}
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                {isClient && (
                  <OptimizedImage
                    src="/social-media-thread-app.png"
                    alt="threadily app interface showing thread creation"
                    fill
                    className="object-cover"
                    priority={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-16 md:py-24">
        {/* Features content */}
      </section>

      {/* Lazy load testimonials section */}
      <LazyComponent
        threshold={300}
        placeholder={
          <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <div className="h-64 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <DynamicTestimonials />
      </LazyComponent>

      {/* CTA section */}
      <section className="py-16 bg-blue-600 text-white">{/* CTA content */}</section>
    </>
  )
}
