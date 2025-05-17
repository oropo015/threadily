"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart2,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  Sparkles,
  MessageCircle,
  Loader2,
  Smile,
  Frown,
  Meh,
  BookOpen,
  Feather,
  Heart,
  ArrowRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ToneAnalysisResult, ToneSuggestion } from "@/lib/huggingface-service"
import { analyzeToneAction } from "@/lib/huggingface-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ToneAnalyzerProps {
  text: string
  onApplySuggestion: (suggestion: string) => void
}

export function ToneAnalyzer({ text, onApplySuggestion }: ToneAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ToneAnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [implementedSuggestions, setImplementedSuggestions] = useState<number[]>([])
  const { toast } = useToast()

  const analyzeToneHandler = async () => {
    if (!text.trim() || text.length < 15) {
      toast({
        title: "Text too short",
        description: "Please enter more content to analyze effectively.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setImplementedSuggestions([])

    try {
      // Call the function to analyze tone
      const result = await analyzeToneAction(text)

      // Set the analysis result
      setAnalysis(result)

      toast({
        title: "Analysis complete",
        description: "Your content has been analyzed for tone and sentiment.",
      })
    } catch (error) {
      console.error("Tone analysis error:", error)
      toast({
        title: "Analysis failed",
        description: "We couldn't analyze your text. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const implementSuggestion = (index: number) => {
    if (!analysis?.suggestions) return

    if (!implementedSuggestions.includes(index)) {
      setImplementedSuggestions((prev) => [...prev, index])

      toast({
        title: "Suggestion applied",
        description: "This suggestion has been marked as implemented.",
      })

      // Call the parent component's handler to apply the suggestion
      onApplySuggestion(analysis.suggestions[index].suggestion)
    }
  }

  const getSentimentIcon = (sentiment: ToneAnalysisResult["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-5 w-5 text-green-500" />
      case "negative":
        return <Frown className="h-5 w-5 text-red-500" />
      case "mixed":
        return <Meh className="h-5 w-5 text-yellow-500" />
      default:
        return <Meh className="h-5 w-5 text-gray-500" />
    }
  }

  const getReadabilityIcon = (readability: ToneAnalysisResult["readability"]) => {
    switch (readability) {
      case "simple":
        return <BookOpen className="h-5 w-5 text-green-500" />
      case "complex":
        return <BookOpen className="h-5 w-5 text-red-500" />
      default:
        return <BookOpen className="h-5 w-5 text-yellow-500" />
    }
  }

  const getFormalityIcon = (formality: ToneAnalysisResult["formality"]) => {
    switch (formality) {
      case "formal":
        return <Feather className="h-5 w-5 text-blue-500" />
      case "casual":
        return <MessageCircle className="h-5 w-5 text-purple-500" />
      default:
        return <Feather className="h-5 w-5 text-gray-500" />
    }
  }

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "joy":
      case "happiness":
        return <Smile className="h-5 w-5 text-yellow-500" />
      case "sadness":
        return <Frown className="h-5 w-5 text-blue-500" />
      case "anger":
        return <Frown className="h-5 w-5 text-red-500" />
      case "fear":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "surprise":
        return <Sparkles className="h-5 w-5 text-purple-500" />
      case "love":
        return <Heart className="h-5 w-5 text-pink-500" />
      default:
        return <Meh className="h-5 w-5 text-gray-500" />
    }
  }

  const getSuggestionTypeIcon = (type: ToneSuggestion["type"]) => {
    switch (type) {
      case "sentiment":
        return <Smile className="h-4 w-4" />
      case "formality":
        return <Feather className="h-4 w-4" />
      case "emotion":
        return <Heart className="h-4 w-4" />
      case "structure":
        return <BarChart2 className="h-4 w-4" />
      case "engagement":
        return <Zap className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  return (
    <Card className="shadow-md border-gray-200 dark:border-gray-800">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Tone Analysis
        </CardTitle>
        <CardDescription className="text-blue-100">
          Analyze the tone, sentiment, and readability of your content
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {!analysis ? (
          <div className="flex justify-center items-center py-16">
            {isAnalyzing ? (
              <div className="text-center">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Analyzing your content...</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">This may take a few seconds</p>
              </div>
            ) : (
              <div className="text-center px-4">
                <div className="mb-6">
                  <BarChart2 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Content Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 max-w-md">
                    Our AI will analyze your content's tone, sentiment, readability, and provide suggestions for
                    improvement.
                  </p>
                </div>
                <Button onClick={analyzeToneHandler} disabled={isAnalyzing || text.length < 15} className="px-6">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analyze Content
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                <span>Suggestions ({analysis.suggestions?.length || 0})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-4">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Sentiment</h3>
                      {getSentimentIcon(analysis.sentiment)}
                    </div>
                    <p className="text-lg font-medium mt-1 capitalize">{analysis.sentiment}</p>
                  </div>

                  {analysis.formality && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Tone</h3>
                        {getFormalityIcon(analysis.formality)}
                      </div>
                      <p className="text-lg font-medium mt-1 capitalize">{analysis.formality}</p>
                    </div>
                  )}

                  {analysis.readability && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Readability</h3>
                        {getReadabilityIcon(analysis.readability)}
                      </div>
                      <p className="text-lg font-medium mt-1 capitalize">{analysis.readability}</p>
                    </div>
                  )}

                  {analysis.dominantEmotion && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Emotion</h3>
                        {getEmotionIcon(analysis.dominantEmotion)}
                      </div>
                      <p className="text-lg font-medium mt-1 capitalize">{analysis.dominantEmotion}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Sentiment Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Positive</span>
                        <span className="font-medium">{Math.round(analysis.scores.positive * 100)}%</span>
                      </div>
                      <Progress value={analysis.scores.positive * 100} className="bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Negative</span>
                        <span className="font-medium">{Math.round(analysis.scores.negative * 100)}%</span>
                      </div>
                      <Progress value={analysis.scores.negative * 100} className="bg-red-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Neutral</span>
                        <span className="font-medium">{Math.round(analysis.scores.neutral * 100)}%</span>
                      </div>
                      <Progress value={analysis.scores.neutral * 100} className="bg-gray-500" />
                    </div>
                  </div>
                </div>

                {analysis.emotions && Object.keys(analysis.emotions).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Emotion Analysis</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(analysis.emotions)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([emotion, score]) => (
                          <Badge key={emotion} variant="outline" className="flex items-center gap-1 py-1">
                            {getEmotionIcon(emotion)}
                            <span className="capitalize">{emotion}</span>
                            <span className="text-xs opacity-70">{Math.round(score * 100)}%</span>
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {analysis.suggestions && analysis.suggestions.length > 0 && (
                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <AlertTitle>Improvement opportunities</AlertTitle>
                    <AlertDescription className="flex justify-between items-center">
                      <span>We found {analysis.suggestions.length} ways to improve your content.</span>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 dark:text-blue-400 p-0 h-auto"
                        onClick={() => setActiveTab("suggestions")}
                      >
                        View suggestions <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="p-4">
              <div className="space-y-4">
                {!analysis.suggestions || analysis.suggestions.length === 0 ? (
                  <div className="text-center py-8">
                    <ThumbsUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Great job!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Your content looks good! We don't have any suggestions for improvement.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`border rounded-md p-3 ${
                          implementedSuggestions.includes(index)
                            ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                            : "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {implementedSuggestions.includes(index) ? (
                              <ThumbsUp className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full">
                                {getSuggestionTypeIcon(suggestion.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {implementedSuggestions.includes(index) ? "✓ " : ""}
                              {suggestion.issue}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{suggestion.suggestion}</p>
                            {suggestion.example && (
                              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800">
                                <p className="font-medium mb-1">Example:</p>
                                <p className="italic">{suggestion.example}</p>
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-2">
                              <Badge variant="outline" className="text-xs capitalize">
                                {suggestion.type}
                              </Badge>
                              <Button
                                size="sm"
                                variant={implementedSuggestions.includes(index) ? "outline" : "default"}
                                className="h-7 text-xs"
                                onClick={() => implementSuggestion(index)}
                                disabled={implementedSuggestions.includes(index)}
                              >
                                {implementedSuggestions.includes(index) ? "Applied" : "Apply"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 py-2 px-4 text-xs text-gray-500">
        Powered by Hugging Face AI models
      </CardFooter>
    </Card>
  )
}
