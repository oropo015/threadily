"use client"

import { useEffect } from "react"

interface PerformanceMonitorProps {
  enabled?: boolean
  sendToAnalytics?: boolean
}

export function PerformanceMonitor({
  enabled = process.env.NODE_ENV === "production",
  sendToAnalytics = true,
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    // Function to collect Core Web Vitals
    const collectWebVitals = () => {
      // Only import web-vitals once
      const webVitalsPromise = import("web-vitals").then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
        getCLS(sendMetric)
        getFID(sendMetric)
        getLCP(sendMetric)
        getFCP(sendMetric)
        getTTFB(sendMetric)
      })

      // Return the promise to ensure we don't try to import multiple times
      return webVitalsPromise
    }

    // Function to send metrics to analytics
    const sendMetric = (metric: any) => {
      // Log metrics to console in development
      if (process.env.NODE_ENV !== "production") {
        console.log(metric)
      }

      // Send to analytics in production
      if (sendToAnalytics && process.env.NODE_ENV === "production") {
        // Replace with your analytics code
        const analyticsData = {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          page: window.location.pathname,
        }

        // Example: send to Google Analytics
        if (window && "gtag" in window) {
          ;(window as any).gtag("event", "web_vitals", analyticsData)
        }
      }
    }

    // Use a single web vitals collection
    let webVitalsCollected = false

    // Collect metrics when page is fully loaded
    if (document.readyState === "complete" && !webVitalsCollected) {
      webVitalsCollected = true
      collectWebVitals()
    } else {
      const handleLoad = () => {
        if (!webVitalsCollected) {
          webVitalsCollected = true
          collectWebVitals()
        }
      }
      window.addEventListener("load", handleLoad)

      return () => {
        window.removeEventListener("load", handleLoad)
      }
    }
  }, [enabled, sendToAnalytics]) // Proper dependency array

  return null
}
