// Split out hash tag analysis into a dedicated component
"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Hash, MessageCircle, Loader2, AlertCircle, TrendingUp, RotateCcw } from "lucide-react"
import { getHashtagSuggestions, getEngagementBoosters } from "@/app/actions/ai-actions"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PlatformKey } from "@/lib/constants"
import { HashtagAnalysis } from "./thread-enhancer/hashtag-analysis"
import { EngagementBoosters } from "./thread-enhancer/engagement-boosters"

interface AIThreadEnhancerProps {
  text: string
  platform?: PlatformKey
  onApplyHashtags: (hashtags: string[]) => void
  onApplyEngagementBooster: (booster: string) => void
}

export function AIThreadEnhancer({
  text,
  platform = "twitter",
  onApplyHashtags,
  onApplyEngagementBooster,
}: AIThreadEnhancerProps) {
  const [activeTab, setActiveTab] = useState("hashtags")
  const [isLoading, setIsLoading] = useState(false)
  const [hashtags, setHashtags] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [engagementBoosters, setEngagementBoosters] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>(platform)
  const [sortMethod, setSortMethod] = useState<"relevance" | "popularity">("relevance")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  // Reset selected hashtags when hashtags change
  useEffect(() => {
    if (hashtags !== selectedHashtags) {
      setSelectedHashtags([])
    }
  }, [hashtags, selectedHashtags])

  // Reset data when text changes significantly
  useEffect(() => {
    if (text.length < 10) {
      setHashtags([])
      setEngagementBoosters([])
      setError(null)
    }
  }, [text])

  const clearError = () => setError(null)

  const handleGenerateHashtags = async () => {
    if (!text.trim() || text.length < 15) {
      toast({
        title: "Text too short",
        description: "Please enter more content to generate relevant hashtags.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    clearError()
    try {
      const result = await getHashtagSuggestions(text)
      setHashtags(result)
      toast({
        title: "Hashtags generated",
        description: `${result.length} hashtags have been suggested for ${selectedPlatform}.`,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setError(`Failed to generate hashtags: ${errorMessage}`)
      toast({
        title: "Hashtag generation failed",
        description: "We couldn't analyze your content for hashtags. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateEngagementBoosters = async () => {
    if (!text.trim() || text.length < 15) {
      toast({
        title: "Text too short",
        description: "Please enter more content to generate relevant engagement boosters.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    clearError()
    try {
      const result = await getEngagementBoosters(text)
      setEngagementBoosters(result)
      toast({
        title: "Engagement boosters generated",
        description: `${result.length} engagement boosters optimized for ${selectedPlatform}.`,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setError(`Failed to generate engagement boosters: ${errorMessage}`)
      toast({
        title: "Engagement booster generation failed",
        description: "We couldn't generate engagement boosters. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-md border-gray-200 dark:border-gray-800">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI-Powered Content Enhancement
          </CardTitle>
          <Select value={selectedPlatform} onValueChange={(value) => setSelectedPlatform(value as PlatformKey)}>
            <SelectTrigger className="w-[140px] h-8 text-xs bg-white/20 border-white/40 text-white">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="threads">Threads</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="reddit">Reddit</SelectItem>
              <SelectItem value="mastodon">Mastodon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="text-blue-100">
          Enhance your posts with AI-powered hashtags and engagement boosters
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {error && (
          <Alert variant="destructive" className="mx-4 mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="hashtags" className="flex items-center gap-1" onClick={clearError}>
              <Hash className="h-4 w-4" />
              <span>Smart Hashtags</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-1" onClick={clearError}>
              <TrendingUp className="h-4 w-4" />
              <span>Engagement</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hashtags" className="p-4 min-h-[250px]">
            {hashtags.length > 0 ? (
              <HashtagAnalysis
                hashtags={hashtags}
                selectedHashtags={selectedHashtags}
                onHashtagSelect={(tag) => {
                  setSelectedHashtags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                }}
                onApplyHashtags={() =>
                  onApplyHashtags(selectedHashtags.length > 0 ? selectedHashtags : hashtags.slice(0, 3))
                }
                onReset={() => setHashtags([])}
                showAdvanced={showAdvancedOptions}
                onToggleAdvanced={() => setShowAdvancedOptions(!showAdvancedOptions)}
                sortMethod={sortMethod}
                onChangeSortMethod={setSortMethod}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                ) : (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-2">
                      Generate AI-suggested hashtags based on your content to increase discoverability and reach on{" "}
                      {selectedPlatform}.
                    </p>
                    <Button onClick={handleGenerateHashtags} disabled={isLoading || text.length < 15}>
                      <Hash className="h-4 w-4 mr-2" />
                      Generate Smart Hashtags
                    </Button>
                  </>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="engagement" className="p-4 min-h-[250px]">
            {engagementBoosters.length > 0 ? (
              <EngagementBoosters
                boosters={engagementBoosters}
                onApplyBooster={onApplyEngagementBooster}
                onReset={() => setEngagementBoosters([])}
                platform={selectedPlatform}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                ) : (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-2">
                      AI will analyze your content and suggest questions and calls-to-action that will boost engagement
                      with your {selectedPlatform} audience.
                    </p>
                    <Button onClick={handleGenerateEngagementBoosters} disabled={isLoading || text.length < 15}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Generate Engagement Ideas
                    </Button>
                  </>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 py-2 px-4 text-xs text-gray-500 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-blue-500" />
          <span>Powered by AI | Optimized for {selectedPlatform}</span>
        </div>

        {(hashtags.length > 0 || engagementBoosters.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => {
              setHashtags([])
              setEngagementBoosters([])
              setSelectedHashtags([])
              setActiveTab("hashtags")
            }}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Create the sub-components in thread-enhancer directory
