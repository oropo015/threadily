"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  type ContentWarningConfig,
  detectContentWarningNeeded,
  formatWithContentWarning,
} from "@/lib/platform-features"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, Check, X, EyeOff } from "lucide-react"

interface MastodonContentWarningProps {
  post: string
  onUpdatePost: (post: string) => void
}

export function MastodonContentWarning({ post, onUpdatePost }: MastodonContentWarningProps) {
  const [contentWarning, setContentWarning] = useState<ContentWarningConfig>({
    enabled: false,
    text: "May contain sensitive content",
    keywords: [],
  })
  const [isApplied, setIsApplied] = useState(false)
  const { toast } = useToast()

  // Detect if content warning is needed
  useEffect(() => {
    if (post && post.length > 10) {
      const cwNeeded = detectContentWarningNeeded(post)
      if (cwNeeded && !contentWarning.enabled) {
        // Find keywords that triggered the warning
        const sensitiveTopics = [
          "politics",
          "political",
          "nsfw",
          "spoiler",
          "death",
          "violence",
          "abuse",
          "assault",
          "explicit",
          "sensitive",
          "trigger",
          "war",
          "graphic",
          "controversial",
        ]

        const detectedKeywords = []
        const lowerText = post.toLowerCase()

        for (const topic of sensitiveTopics) {
          if (lowerText.includes(topic)) {
            detectedKeywords.push(topic)
          }
        }

        if (detectedKeywords.length > 0) {
          setContentWarning({
            enabled: true,
            text:
              detectedKeywords.length === 1 ? `Content about ${detectedKeywords[0]}` : "Potentially sensitive content",
            keywords: detectedKeywords,
          })
        }
      }
    }
  }, [post, contentWarning.enabled])

  const applyContentWarning = () => {
    // In a real integration, we would just set a flag for the API
    // But for the preview, we'll modify the post
    const formattedPost = formatWithContentWarning(post, contentWarning)
    onUpdatePost(formattedPost)
    setIsApplied(true)

    toast({
      title: "Content warning applied",
      description: "Your Mastodon post now has a content warning for better community etiquette.",
    })
  }

  const removeContentWarning = () => {
    // Remove CW: line if present
    const updatedPost = post.replace(/^CW:[^\n]*\n\n/, "")
    onUpdatePost(updatedPost)
    setContentWarning({
      enabled: false,
      text: "May contain sensitive content",
      keywords: [],
    })
    setIsApplied(false)

    toast({
      title: "Content warning removed",
      description: "The content warning has been removed from your post.",
    })
  }

  return (
    <Card>
      <CardHeader className="bg-teal-50 dark:bg-teal-900/20 pb-3">
        <CardTitle className="flex items-center text-lg text-teal-700 dark:text-teal-300">
          <EyeOff className="mr-2 h-5 w-5" />
          Mastodon Content Warning Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add appropriate content warnings to your Mastodon posts following community etiquette.
          </p>

          <div className="flex items-center space-x-2">
            <Switch
              id="cw-enabled"
              checked={contentWarning.enabled}
              onCheckedChange={(checked) => {
                setContentWarning({
                  ...contentWarning,
                  enabled: checked,
                })
              }}
            />
            <Label htmlFor="cw-enabled" className="font-medium">
              Use content warning
            </Label>
          </div>

          {contentWarning.enabled && (
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="cw-text">Content warning text</Label>
                <Input
                  id="cw-text"
                  value={contentWarning.text}
                  onChange={(e) => {
                    setContentWarning({
                      ...contentWarning,
                      text: e.target.value,
                    })
                  }}
                  placeholder="Brief description of sensitive content"
                />
              </div>

              {contentWarning.keywords.length > 0 && (
                <div>
                  <Label className="text-sm mb-1 block">Detected sensitive topics:</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {contentWarning.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {post && post.length > 10 && detectContentWarningNeeded(post) && !contentWarning.enabled && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-800 flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Content warning recommended</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                  Your post may contain topics that are typically marked with content warnings in the Mastodon
                  community.
                </p>
              </div>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 mt-4">
            <h3 className="text-sm font-medium mb-2">Preview:</h3>
            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                {contentWarning.enabled && (
                  <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-sm border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 flex items-center">
                      <EyeOff className="h-4 w-4 mr-1 text-yellow-600 dark:text-yellow-400" />
                      CW: {contentWarning.text}
                    </p>
                  </div>
                )}
                <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap break-words">
                  {contentWarning.enabled
                    ? post.replace(/^CW:[^\n]*\n\n/, "") // Remove any existing CW
                    : post}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 flex justify-between">
        {contentWarning.enabled && isApplied ? (
          <Button variant="outline" size="sm" className="text-xs text-red-600" onClick={removeContentWarning}>
            <X className="h-3 w-3 mr-1" />
            Remove Warning
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}

        {contentWarning.enabled && (
          <Button onClick={applyContentWarning} className="flex items-center" disabled={isApplied || post.length === 0}>
            {isApplied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Warning Applied
              </>
            ) : (
              "Apply Content Warning"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
