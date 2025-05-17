"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  credit?: string
  creditUrl?: string
  className?: string
  priority?: boolean
}

export function BlogImage(props: BlogImageProps) {
  // Use individual variables instead of destructuring to avoid potential issues
  const src = props.src
  const alt = props.alt
  const caption = props.caption
  const credit = props.credit
  const creditUrl = props.creditUrl
  const className = props.className
  const priority = props.priority || false

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  // Use a fixed aspect ratio instead of calculating it dynamically
  // This avoids issues with image loading and calculations
  const aspectRatio = 16 / 9

  // Handle image load success
  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Handle image load error
  const handleImageError = React.useCallback(() => {
    setHasError(true)
  }, [])

  // If there's an error loading the image, show a fallback
  if (hasError || !src) {
    return (
      <figure className="my-8 w-full">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center",
            className,
          )}
          style={{ paddingBottom: "56.25%" }} // Default 16:9 aspect ratio
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>Image not available</p>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{caption}</figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="my-8 w-full">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800",
          !isLoaded && "animate-pulse",
          className,
        )}
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
          className={cn("object-cover transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption && <span className="block">{caption}</span>}
          {credit && (
            <span className="block text-xs mt-1">
              Photo by{" "}
              {creditUrl ? (
                <a href={creditUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {credit}
                </a>
              ) : (
                credit
              )}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
