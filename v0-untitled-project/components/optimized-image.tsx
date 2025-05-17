"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image, { type ImageProps } from "next/image"
import { getOptimizedImageSize } from "@/lib/performance-utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  lazyLoad?: boolean
  fadeIn?: boolean
  threshold?: number
  onLoadingComplete?: (img: HTMLImageElement) => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  lazyLoad = true,
  fadeIn = true,
  threshold = 200,
  className = "",
  priority = false,
  onLoadingComplete,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(!lazyLoad || priority)
  const imgRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Calculate optimized size if width is provided as a number
  const optimizedWidth = typeof width === "number" ? getOptimizedImageSize(width) : width

  // Memoize the handleLoadComplete function to prevent it from changing on every render
  const handleLoadComplete = useCallback(
    (img: HTMLImageElement) => {
      setIsLoaded(true)
      if (onLoadingComplete) {
        onLoadingComplete(img)
      }
    },
    [onLoadingComplete],
  )

  useEffect(() => {
    if (!lazyLoad || priority || isVisible || !imgRef.current) return

    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        }
      },
      {
        rootMargin: `${threshold}px`,
      },
    )

    observerRef.current.observe(imgRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [lazyLoad, threshold, isVisible, priority])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {isVisible ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={optimizedWidth}
          height={height}
          className={`${fadeIn ? (isLoaded ? "opacity-100" : "opacity-0") : ""} transition-opacity duration-300`}
          onLoadingComplete={handleLoadComplete}
          priority={priority}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" style={{ width, height }} />
      )}
    </div>
  )
}
