"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Code, List, Quote, Heading, Sparkles, Copy, Check } from "lucide-react"
import { enhanceRedditMarkdown } from "@/lib/platform-features"
import { useToast } from "@/hooks/use-toast"

interface RedditMarkdownEnhancerProps {
  post: string
  onUpdatePost: (post: string) => void
}

export function RedditMarkdownEnhancer({ post, onUpdatePost }: RedditMarkdownEnhancerProps) {
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [previewTab, setPreviewTab] = useState("original")
  const { toast } = useToast()

  const enhancedPost = enhanceRedditMarkdown(post)

  const applyEnhancement = () => {
    onUpdatePost(enhancedPost)
    setIsEnhanced(true)

    toast({
      title: "Markdown enhancements applied",
      description: "Your Reddit post now has optimized markdown formatting.",
    })
  }

  const formatMarkdown = (text: string): JSX.Element => {
    // This is a simple renderer for preview - not for production use
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^#{1,6}\s+(.*?)$/gm, "<h3>$1</h3>")
      .replace(/^>\s+(.*?)$/gm, "<blockquote>$1</blockquote>")
      .replace(/^(\s*)\*\s+(.*?)$/gm, "<li>$2</li>")
      .replace(/^(\s*)(\d+)\.\s+(.*?)$/gm, "<li>$3</li>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n\n/g, "<br><br>")

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />
  }

  const getEnhancementSummary = () => {
    const changes = []

    if (post !== enhancedPost) {
      if (post.match(/^[-•]/gm) && enhancedPost.match(/^\* /gm)) {
        changes.push("Converted bullet points to proper markdown")
      }

      if (post.match(/^>/gm) && enhancedPost.match(/^> /gm)) {
        changes.push("Enhanced quote formatting")
      }

      if (post.match(/^[A-Z][A-Z\s]+:?$/gm) && enhancedPost.match(/^\*\*[A-Z][A-Z\s]+:?\*\*$/gm)) {
        changes.push("Added bold formatting to headings")
      }

      if (!post.includes("**TL;DR**") && enhancedPost.includes("**TL;DR**")) {
        changes.push("Added TL;DR section for better engagement")
      }
    }

    if (changes.length === 0) {
      return "No significant markdown enhancements needed."
    }

    return (
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
        {changes.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </ul>
    )
  }

  const addSpecificMarkdown = (type: string) => {
    let updatedText = post

    switch (type) {
      case "heading":
        updatedText = "## Your Heading\n\n" + updatedText
        break
      case "bullet":
        updatedText += "\n\n* Item 1\n* Item 2\n* Item 3"
        break
      case "numbered":
        updatedText += "\n\n1. First point\n2. Second point\n3. Third point"
        break
      case "quote":
        updatedText += "\n\n> This is a quote from another user or source"
        break
      case "code":
        updatedText += "\n\n```\nYour code here\n```"
        break
      case "tldr":
        updatedText += "\n\n**TL;DR:** Brief summary of your post."
        break
    }

    onUpdatePost(updatedText)

    toast({
      title: "Markdown element added",
      description: `Added ${type} markdown element to your post.`,
    })
  }

  return (
    <Card>
      <CardHeader className="bg-orange-50 dark:bg-orange-900/20 pb-3">
        <CardTitle className="flex items-center text-lg text-orange-700 dark:text-orange-300">
          <MessageSquare className="mr-2 h-5 w-5" />
          Reddit Markdown Enhancer
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enhance your Reddit posts with proper markdown formatting for better readability and engagement.
          </p>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => addSpecificMarkdown("heading")}>
              <Heading className="h-4 w-4 mr-1" />
              Heading
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSpecificMarkdown("bullet")}>
              <List className="h-4 w-4 mr-1" />
              Bullet List
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSpecificMarkdown("numbered")}>
              <List className="h-4 w-4 mr-1" />
              Numbered List
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSpecificMarkdown("quote")}>
              <Quote className="h-4 w-4 mr-1" />
              Quote
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSpecificMarkdown("code")}>
              <Code className="h-4 w-4 mr-1" />
              Code Block
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSpecificMarkdown("tldr")}>
              <Sparkles className="h-4 w-4 mr-1" />
              TL;DR
            </Button>
          </div>

          <div className="mt-4">{getEnhancementSummary()}</div>

          <Tabs value={previewTab} onValueChange={setPreviewTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
            </TabsList>
            <TabsContent
              value="original"
              className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md mt-3 max-h-64 overflow-y-auto"
            >
              <div className="text-sm whitespace-pre-wrap font-mono">{post}</div>
            </TabsContent>
            <TabsContent
              value="enhanced"
              className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md mt-3 max-h-64 overflow-y-auto"
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">{formatMarkdown(enhancedPost)}</div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => {
            navigator.clipboard.writeText(enhancedPost)
            toast({
              title: "Copied to clipboard",
              description: "The enhanced markdown has been copied to your clipboard.",
            })
          }}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy Enhanced
        </Button>
        <Button
          onClick={applyEnhancement}
          className="flex items-center"
          disabled={post === enhancedPost || post.length === 0}
        >
          {isEnhanced ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Enhancements Applied
            </>
          ) : (
            "Apply Enhancements"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
