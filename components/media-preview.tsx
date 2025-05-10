"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MediaItem } from "./media-uploader"

interface MediaPreviewProps {
  media: MediaItem
  onRemove: (id: string) => void
  className?: string
}

export function MediaPreview({ media, onRemove, className = "" }: MediaPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  const getEmbedUrl = (url: string): string => {
    // Convert YouTube URLs to embed URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtube.com/watch?v=")
        ? url.split("v=")[1].split("&")[0]
        : url.includes("youtu.be/")
          ? url.split("youtu.be/")[1].split("?")[0]
          : ""
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Convert Vimeo URLs to embed URLs
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1].split("?")[0]
      return `https://player.vimeo.com/video/${videoId}`
    }

    // Convert Twitch URLs to embed URLs
    if (url.includes("twitch.tv")) {
      const channelName = url.split("twitch.tv/")[1].split("?")[0]
      return `https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}`
    }

    return url
  }

  return (
    <div className={`relative rounded-md overflow-hidden ${className}`}>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 z-10"
        onClick={() => onRemove(media.id)}
      >
        <X className="h-4 w-4" />
      </Button>

      {media.type === "image" && (
        <>
          {isLoading && <div className="bg-gray-200 dark:bg-gray-800 animate-pulse h-48 w-full"></div>}
          <img
            src={media.url || "/placeholder.svg"}
            alt={media.alt || "Image"}
            className={`max-h-96 max-w-full object-contain ${isLoading ? "hidden" : ""}`}
            onLoad={handleLoad}
            onError={handleError}
          />
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 p-4 text-center text-red-500">Failed to load image</div>
          )}
        </>
      )}

      {media.type === "video" && (
        <>
          {isLoading && <div className="bg-gray-200 dark:bg-gray-800 animate-pulse h-48 w-full"></div>}
          <video
            src={media.url}
            controls
            className={`max-h-96 max-w-full ${isLoading ? "hidden" : ""}`}
            onLoadedData={handleLoad}
            onError={handleError}
          />
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 p-4 text-center text-red-500">Failed to load video</div>
          )}
        </>
      )}

      {media.type === "embed" && (
        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(media.url)}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
    </div>
  )
}
