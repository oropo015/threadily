"use client"

import { useState, useEffect } from "react"
import { ThreadGenerator } from "@/components/thread-generator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"

export default function AppPage() {
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true once, when the component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {isClient && (
          <>
            <ThreadGenerator />
            {/* Only include PerformanceMonitor in production */}
            {process.env.NODE_ENV === "production" && <PerformanceMonitor />}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
