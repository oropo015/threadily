"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Video, Upload, Link } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { MediaItem } from "./media-uploader"

interface OptimizedMediaUploaderProps {
  onMediaAdd: (media: MediaItem) => void
}

export function OptimizedMediaUploader({ onMediaAdd }: OptimizedMediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [embedUrl, setEmbedUrl] = useState("")
  const [uploadMode, setUploadMode] = useState<"upload" | "embed">("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image or video
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image or video file.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Optimize image before creating object URL
      let url: string
      let width: number | undefined
      let height: number | undefined

      if (file.type.startsWith("image/")) {
        // Optimize image
        const optimizedImage = await optimizeImage(file)
        url = URL.createObjectURL(optimizedImage.blob)
        width = optimizedImage.width
        height = optimizedImage.height
      } else {
        // For videos, just create object URL
        url = URL.createObjectURL(file)
      }

      const mediaType = file.type.startsWith("image/") ? "image" : "video"

      onMediaAdd({
        id: generateId(),
        type: mediaType,
        url,
        alt: file.name,
        width,
        height,
      })

      toast({
        title: "Media added",
        description: `Your ${mediaType} has been added to the thread.`,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Function to optimize images
  const optimizeImage = async (file: File): Promise<{ blob: Blob; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        // Get original dimensions
        const originalWidth = img.width
        const originalHeight = img.height

        // Calculate target dimensions (max 1200px width)
        const maxWidth = 1200
        let targetWidth = originalWidth
        let targetHeight = originalHeight

        if (originalWidth > maxWidth) {
          targetWidth = maxWidth
          targetHeight = Math.round((originalHeight * maxWidth) / originalWidth)
        }

        // Create canvas for resizing
        const canvas = document.createElement("canvas")
        canvas.width = targetWidth
        canvas.height = targetHeight

        // Draw and resize image
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

        // Convert to blob with reduced quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not create blob"))
              return
            }
            resolve({ blob, width: targetWidth, height: targetHeight })
          },
          file.type,
          0.85, // 85% quality
        )
      }

      img.onerror = () => {
        reject(new Error("Could not load image"))
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleEmbedAdd = () => {
    if (!embedUrl) {
      toast({
        title: "No URL provided",
        description: "Please enter a URL to embed.",
        variant: "destructive",
      })
      return
    }

    // Check if URL is valid
    try {
      new URL(embedUrl)
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive",
      })
      return
    }

    // Check if URL is from a supported platform (YouTube, Vimeo, etc.)
    const isYouTube = embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be")
    const isVimeo = embedUrl.includes("vimeo.com")
    const isTwitch = embedUrl.includes("twitch.tv")

    if (!isYouTube && !isVimeo && !isTwitch) {
      toast({
        title: "Unsupported platform",
        description: "We currently only support YouTube, Vimeo, and Twitch embeds.",
        variant: "destructive",
      })
      return
    }

    onMediaAdd({
      id: generateId(),
      type: "embed",
      url: embedUrl,
    })

    toast({
      title: "Embed added",
      description: "Your embed has been added to the thread.",
    })

    setEmbedUrl("")
  }

  return (
    <Card className="border-dashed border-2">
      <CardContent className="p-4">
        <div className="flex gap-2 mb-4 flex-wrap sm:flex-nowrap">
          <Button
            variant={uploadMode === "upload" ? "default" : "outline"}
            size="sm"
            onClick={() => setUploadMode("upload")}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button
            variant={uploadMode === "embed" ? "default" : "outline"}
            size="sm"
            onClick={() => setUploadMode("embed")}
            className="flex-1"
          >
            <Link className="h-4 w-4 mr-2" />
            Embed
          </Button>
        </div>

        {uploadMode === "upload" ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="h-20 w-20 flex flex-col gap-1"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Image</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 w-20 flex flex-col gap-1"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Video className="h-6 w-6" />
                  <span className="text-xs">Video</span>
                </Button>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
            <p className="text-xs text-center text-gray-500">
              Supported formats: JPG, PNG, GIF, MP4, WebM
              <br />
              Max file size: 5MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="embed-url">Video URL</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="embed-url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleEmbedAdd} className="w-full sm:w-auto">
                  Add
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">Supported platforms: YouTube, Vimeo, Twitch</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
