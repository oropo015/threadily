"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Video, Upload, Link } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface MediaUploaderProps {
  onMediaAdd: (media: MediaItem) => void
}

export interface MediaItem {
  id: string
  type: "image" | "video" | "embed"
  url: string
  alt?: string
  width?: number
  height?: number
}

export function MediaUploader({ onMediaAdd }: MediaUploaderProps) {
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
      // In a real app, you would upload the file to a server or cloud storage
      // For this demo, we'll create a local object URL
      const url = URL.createObjectURL(file)

      // Get dimensions for images
      let width, height
      if (file.type.startsWith("image/")) {
        const dimensions = await getImageDimensions(url)
        width = dimensions.width
        height = dimensions.height
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

function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = url
  })
}
