"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Replace } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FindReplaceToolProps {
  text: string
  onReplace: (newText: string) => void
  t: (namespace: string, key: string) => string
}

export function FindReplaceTool({ text, onReplace, t }: FindReplaceToolProps) {
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [previewText, setPreviewText] = useState("")
  const { toast } = useToast()

  // Update preview text when find or replace text changes
  useEffect(() => {
    if (!findText) {
      setPreviewText(text)
      return
    }

    try {
      // Create a highlighted preview by wrapping matches in a span
      const regex = new RegExp(`(${escapeRegExp(findText)})`, "gi")
      const highlighted = text.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-800">$1</span>')
      setPreviewText(highlighted)
    } catch (error) {
      // If regex is invalid, just show the original text
      setPreviewText(text)
    }
  }, [findText, replaceText, text])

  // Function to escape special regex characters
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  // Perform the find and replace operation
  const handleReplace = () => {
    if (!findText) {
      toast({
        title: t("threadGenerator", "noSearchTextTitle"),
        description: t("threadGenerator", "noSearchTextDescription"),
        variant: "destructive",
      })
      return
    }

    try {
      const regex = new RegExp(escapeRegExp(findText), "g")
      const newText = text.replace(regex, replaceText)
      onReplace(newText)

      toast({
        title: t("threadGenerator", "textReplacedTitle"),
        description: `Replaced "${findText}" with "${replaceText}"`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during find and replace",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-3">
        <CardTitle className="flex items-center text-lg text-blue-700 dark:text-blue-300">
          <Search className="mr-2 h-5 w-5" />
          Find and Replace
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="find-text" className="text-sm font-medium">
              Find
            </label>
            <Input
              id="find-text"
              placeholder="Text to find..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="replace-text" className="text-sm font-medium">
              Replace with
            </label>
            <Input
              id="replace-text"
              placeholder="Replacement text..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Preview</h3>
          <div
            className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 min-h-[100px] max-h-[200px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: previewText }}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {findText
              ? "Yellow highlights show text that will be replaced"
              : "Enter text to find above to see highlights"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 flex justify-end">
        <Button onClick={handleReplace} disabled={!findText} className="flex items-center">
          <Replace className="mr-2 h-4 w-4" />
          Replace All
        </Button>
      </CardFooter>
    </Card>
  )
}
