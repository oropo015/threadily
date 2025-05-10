"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { debounce } from "@/lib/performance-utils"

// Import the base ThreadGenerator component
import { ThreadGenerator } from "./thread-generator"

// Dynamically import heavy components
const DynamicAIThreadEnhancer = dynamic(
  () => import("./ai-thread-enhancer").then((mod) => ({ default: mod.AIThreadEnhancer })),
  {
    loading: () => (
      <div className="p-4 border rounded-md">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          <span>Loading AI enhancer...</span>
        </div>
      </div>
    ),
    ssr: false,
  },
)

const DynamicToneAnalyzer = dynamic(() => import("./tone-analyzer").then((mod) => ({ default: mod.ToneAnalyzer })), {
  loading: () => (
    <div className="p-4 border rounded-md">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        <span>Loading tone analyzer...</span>
      </div>
    </div>
  ),
  ssr: false,
})

export function OptimizedThreadGenerator() {
  const [isClient, setIsClient] = useState(false)
  const [showAIEnhancer, setShowAIEnhancer] = useState(false)
  const [showToneAnalyzer, setShowToneAnalyzer] = useState(false)

  // Create debounced handlers
  const debouncedTextChange = debounce((text: string) => {
    // Handle text changes with debounce
    console.log("Text changed:", text.length)
  }, 300)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Wrap the ThreadGenerator with optimizations
  return (
    <div>
      {isClient ? (
        <ThreadGenerator />
      ) : (
        <div className="p-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Render AI enhancer only when needed */}
      {showAIEnhancer && (
        <Suspense
          fallback={
            <div className="p-4 border rounded-md">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <span>Loading AI enhancer...</span>
              </div>
            </div>
          }
        >
          <DynamicAIThreadEnhancer text="" onApplyHashtags={() => {}} onApplyEngagementBooster={() => {}} />
        </Suspense>
      )}

      {/* Render tone analyzer only when needed */}
      {showToneAnalyzer && (
        <Suspense
          fallback={
            <div className="p-4 border rounded-md">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <span>Loading tone analyzer...</span>
              </div>
            </div>
          }
        >
          <DynamicToneAnalyzer text="" onApplySuggestion={() => {}} />
        </Suspense>
      )}
    </div>
  )
}
