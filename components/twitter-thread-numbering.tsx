"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Hash, Check, Copy } from "lucide-react"
import { addThreadNumbering } from "@/lib/platform-features"
import { useToast } from "@/hooks/use-toast"

interface TwitterThreadNumberingProps {
  posts: string[]
  onUpdatePosts: (posts: string[]) => void
}

export function TwitterThreadNumbering({ posts, onUpdatePosts }: TwitterThreadNumberingProps) {
  const [numberingStyle, setNumberingStyle] = useState<"slash" | "parentheses" | "dot">("slash")
  const [isApplied, setIsApplied] = useState(false)
  const { toast } = useToast()

  const applyNumbering = () => {
    if (posts.length <= 1) {
      toast({
        title: "Not enough posts",
        description: "Thread numbering requires at least 2 posts.",
        variant: "destructive",
      })
      return
    }

    const numberedPosts = addThreadNumbering(posts, numberingStyle)
    onUpdatePosts(numberedPosts)
    setIsApplied(true)

    toast({
      title: "Thread numbering applied",
      description: `Your posts have been numbered using the ${numberingStyle} style.`,
    })
  }

  const getStylePreview = (style: "slash" | "parentheses" | "dot") => {
    if (posts.length < 2) return "1/1"

    switch (style) {
      case "slash":
        return "1/2"
      case "parentheses":
        return "(1/2)"
      case "dot":
        return "1.2"
    }
  }

  // Helper function to safely remove existing numbering patterns
  const removeNumbering = (text: string): string => {
    return text
      .replace(/^\d+\/\d+\s/, "")
      .replace(/^$$\d+\/\d+$$\s/, "")
      .replace(/^\d+\.\d+\s/, "")
  }

  return (
    <Card>
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-3">
        <CardTitle className="flex items-center text-lg text-blue-700 dark:text-blue-300">
          <Hash className="mr-2 h-5 w-5" />
          Twitter Thread Numbering
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add automatic numbering to your Twitter thread posts to help readers follow the sequence.
          </p>

          <div className="space-y-3">
            <Label htmlFor="numbering-style">Numbering Style</Label>
            <RadioGroup
              id="numbering-style"
              value={numberingStyle}
              onValueChange={(value) => setNumberingStyle(value as "slash" | "parentheses" | "dot")}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="slash" id="slash" />
                <Label htmlFor="slash" className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
                    {getStylePreview("slash")}
                  </Badge>
                  Slash Style
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parentheses" id="parentheses" />
                <Label htmlFor="parentheses" className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
                    {getStylePreview("parentheses")}
                  </Badge>
                  Parentheses Style
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dot" id="dot" />
                <Label htmlFor="dot" className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
                    {getStylePreview("dot")}
                  </Badge>
                  Dot Style
                </Label>
              </div>
            </RadioGroup>
          </div>

          {posts.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 mt-4">
              <h3 className="text-sm font-medium mb-2">Preview:</h3>
              <div className="space-y-2 text-sm">
                {posts.slice(0, 3).map((post, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-800 dark:text-gray-200 break-words">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {getStylePreview(numberingStyle)
                          .replace("1", (index + 1).toString())
                          .replace(/[/.]2|$$1\/2$$/, (match) => {
                            if (match === "(1/2)") return `(${index + 1}/${posts.length})`
                            return match.replace("2", posts.length.toString())
                          })}
                      </span>{" "}
                      {removeNumbering(post)}
                    </p>
                  </div>
                ))}
                {posts.length > 3 && (
                  <p className="text-center text-gray-500 text-xs">+ {posts.length - 3} more posts</p>
                )}
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
            const text = posts
              .map((post, i) => {
                const num = getStylePreview(numberingStyle)
                  .replace("1", (i + 1).toString())
                  .replace(/[/.]2|$$1\/2$$/, (match) => {
                    if (match === "(1/2)") return `(${i + 1}/${posts.length})`
                    return match.replace("2", posts.length.toString())
                  })
                return `${num} ${removeNumbering(post)}`
              })
              .join("\n\n")

            navigator.clipboard.writeText(text)
            toast({
              title: "Copied to clipboard",
              description: "The numbered thread has been copied to your clipboard.",
            })
          }}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy All
        </Button>
        <Button onClick={applyNumbering} className="flex items-center" disabled={posts.length <= 1}>
          {isApplied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Numbering Applied
            </>
          ) : (
            "Apply Numbering"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
