"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type RepurposedContent, repurposeContent } from "@/lib/platform-features"
import { useToast } from "@/hooks/use-toast"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { Repeat, Copy, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ContentRepurposingToolProps {
  post: string
  platform: PlatformKey
  onUpdatePost: (post: string) => void
}

export function ContentRepurposingTool({ post, platform, onUpdatePost }: ContentRepurposingToolProps) {
  // Default to twitter if platform is invalid
  const validPlatform = Object.keys(PLATFORMS).includes(platform) ? platform : "twitter"
  const [targetPlatform, setTargetPlatform] = useState<PlatformKey>("twitter")
  const [repurposedContent, setRepurposedContent] = useState<RepurposedContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateRepurposedContent = () => {
    if (!post || post.length < 10) {
      toast({
        title: "Not enough content",
        description: "Please provide content to repurpose.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Wait briefly to simulate processing
    setTimeout(() => {
      try {
        const result = repurposeContent(post, validPlatform, targetPlatform)
        setRepurposedContent(result)

        toast({
          title: "Content repurposed",
          description: `Your content has been optimized for ${PLATFORMS[targetPlatform]?.name || targetPlatform}.`,
        })
      } catch (error) {
        toast({
          title: "Error repurposing content",
          description: "There was an error processing your content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }, 800)
  }

  const applyRepurposedContent = () => {
    if (!repurposedContent) return

    // Join multiple posts with double line breaks
    const combinedContent = repurposedContent.content.join("\n\n")
    onUpdatePost(combinedContent)

    toast({
      title: "Content applied",
      description: `The repurposed content for ${PLATFORMS[targetPlatform]?.name || targetPlatform} has been applied.`,
    })
  }

  const getPlatformIcon = (key: PlatformKey) => {
    switch (key) {
      case "twitter":
        return "twitter"
      case "linkedin":
        return "linkedin"
      case "facebook":
        return "facebook"
      case "reddit":
        return "message-square"
      case "mastodon":
        return "hash"
      case "threads":
        return "at-sign"
      default:
        return "message-circle"
    }
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-3">
        <CardTitle className="flex items-center text-lg text-purple-700 dark:text-purple-300">
          <Repeat className="mr-2 h-5 w-5" />
          Cross-Platform Content Repurposing
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Optimize your content for different social media platforms to maximize engagement.
          </p>

          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {PLATFORMS[validPlatform]?.name || validPlatform}
              </Badge>
              <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
            </div>
            <Select value={targetPlatform} onValueChange={(value: PlatformKey) => setTargetPlatform(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PLATFORMS)
                  .filter(([key]) => key !== validPlatform) // Filter out current platform
                  .map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center">
                        <span className="mr-2">{value.name}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={generateRepurposedContent}
            className="w-full"
            disabled={isLoading || !post || post.length < 10}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              <>
                <Repeat className="mr-2 h-4 w-4" />
                Repurpose Content
              </>
            )}
          </Button>

          {repurposedContent && (
            <div className="space-y-3 mt-4">
              <h3 className="text-sm font-medium">
                Repurposed for {PLATFORMS[repurposedContent.platform]?.name || repurposedContent.platform}:
              </h3>

              <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 max-h-56 overflow-y-auto">
                {repurposedContent.content.map((content, index) => (
                  <div
                    key={index}
                    className={`p-3 text-sm ${index > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}`}
                  >
                    <p className="whitespace-pre-wrap">{content}</p>
                    {repurposedContent.content.length > 1 && (
                      <div className="mt-1 text-xs text-gray-500">
                        Post {index + 1} of {repurposedContent.content.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={applyRepurposedContent} size="sm">
                  Apply Repurposed Content
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => {
            if (!repurposedContent) return

            const text = repurposedContent.content.join("\n\n")
            navigator.clipboard.writeText(text)
            toast({
              title: "Copied to clipboard",
              description: "The repurposed content has been copied to your clipboard.",
            })
          }}
          disabled={!repurposedContent}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy All
        </Button>

        {validPlatform === targetPlatform && (
          <div className="text-xs text-amber-600 dark:text-amber-400">Please select a different target platform</div>
        )}
      </CardFooter>
    </Card>
  )
}
