"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Share2, GripVertical, Hash, Loader2, Plus, AlertCircle, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PlatformKey } from "@/lib/constants"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { getHashtagSuggestions } from "@/app/actions/ai-actions"
import { useToast } from "@/hooks/use-toast"

// Import the new character counter utilities
import { countCharactersForPlatform, getCharacterCountStatus } from "@/lib/character-counter"

// Add a character count indicator to the post
const CharacterCountIndicator = ({
  post,
  platform,
  maxChars,
}: { post: string; platform: PlatformKey; maxChars: number }) => {
  const count = countCharactersForPlatform(post, platform)
  const status = getCharacterCountStatus(post, platform)

  let statusColor = "text-green-500"
  if (status === "warning") statusColor = "text-yellow-500"
  if (status === "error") statusColor = "text-red-500"

  return (
    <div className={`text-xs font-medium ${statusColor} flex items-center gap-1`}>
      <span>{count}</span>
      <span>/</span>
      <span>{maxChars}</span>
      {status === "error" && <AlertCircle className="h-3 w-3 text-red-500" />}
    </div>
  )
}

interface SortableThreadPostProps {
  id: string
  index: number
  totalPosts: number
  post: string
  platform: PlatformKey
  maxChars: number
  onCopy: (text: string) => void
  formattedPost: string
  onAddHashtags?: (postIndex: number, hashtags: string[]) => void
}

export function SortableThreadPost({
  id,
  index,
  totalPosts,
  post,
  platform,
  maxChars,
  onCopy,
  formattedPost,
  onAddHashtags,
}: SortableThreadPostProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false)
  const [postHashtags, setPostHashtags] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [showAddButton, setShowAddButton] = useState(false)
  const [addedHashtags, setAddedHashtags] = useState<string[]>([])

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  const getPostStatusColor = (length: number) => {
    if (length === 0) return "text-gray-400"
    if (length <= maxChars) return "text-green-500"
    return "text-red-500"
  }

  const getPlatformBadgeColor = () => {
    switch (platform) {
      case "twitter":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
      case "threads":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
      case "reddit":
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
      case "mastodon":
        return "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200"
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    }
  }

  const generateHashtags = async () => {
    if (!post.trim()) return

    setIsGeneratingHashtags(true)
    try {
      const hashtags = await getHashtagSuggestions(post)
      setPostHashtags(hashtags)
      setSelectedHashtags([]) // Reset selected hashtags
      setShowAddButton(true)

      toast({
        title: "Hashtags generated",
        description: `${hashtags.length} hashtags have been generated for post ${index + 1}.`,
      })
    } catch (error) {
      toast({
        title: "Error generating hashtags",
        description: "Failed to generate hashtags. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingHashtags(false)
    }
  }

  const toggleHashtagSelection = (tag: string) => {
    setSelectedHashtags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const addHashtagsToPost = () => {
    // If no hashtags are selected, use all hashtags
    const tagsToAdd = selectedHashtags.length > 0 ? selectedHashtags : postHashtags

    if (onAddHashtags && tagsToAdd.length > 0) {
      try {
        onAddHashtags(index, tagsToAdd)
        toast({
          title: "Hashtags added",
          description: `${tagsToAdd.length} hashtags have been added to post ${index + 1}.`,
        })
        setShowAddButton(false)
        setAddedHashtags((prev) => [...prev, ...tagsToAdd]) // Track which hashtags were added
        setPostHashtags([]) // Clear hashtags after adding them
        setSelectedHashtags([]) // Clear selected hashtags
      } catch (error) {
        console.error("Error adding hashtags to post:", error)
        toast({
          title: "Error adding hashtags",
          description: "Failed to add hashtags to post. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      console.warn("onAddHashtags is not defined or no hashtags to add", { onAddHashtags, tagsToAdd })
    }
  }

  const addSingleHashtag = (tag: string) => {
    if (onAddHashtags) {
      try {
        onAddHashtags(index, [tag])
        toast({
          title: "Hashtag added",
          description: `#${tag} has been added to post ${index + 1}.`,
        })
        setAddedHashtags((prev) => [...prev, tag]) // Track which hashtag was added
      } catch (error) {
        console.error("Error adding hashtag to post:", error)
        toast({
          title: "Error adding hashtag",
          description: "Failed to add hashtag to post. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card ref={setNodeRef} style={style} className="relative overflow-hidden transition-all hover:shadow-md mb-4">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {index + 1}/{totalPosts}
          </Badge>
          <CharacterCountIndicator post={post} platform={platform} maxChars={maxChars} />
        </div>
      </div>
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-2 mr-2 -ml-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p
              className={`pr-16 mb-4 ${platform === "reddit" ? "whitespace-pre-wrap font-mono text-sm" : "whitespace-pre-line"}`}
            >
              {formattedPost}
            </p>
            <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <span className={getPostStatusColor(post.length)}>{post.length}</span>
                <span className="mx-1">/</span>
                <span>{maxChars}</span>
                <span className="hidden sm:inline ml-1">{t("threadGenerator", "characters")}</span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <Button variant="ghost" size="sm" onClick={() => onCopy(post)} className="px-2 sm:px-3 h-8">
                  <Copy className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t("threadGenerator", "copy")}</span>
                </Button>
                <Button variant="ghost" size="sm" className="px-2 sm:px-3 h-8">
                  <Share2 className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t("threadGenerator", "share")}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generateHashtags}
                  disabled={isGeneratingHashtags}
                  className="px-2 sm:px-3 h-8"
                >
                  {isGeneratingHashtags ? (
                    <Loader2 className="h-4 w-4 sm:mr-2 animate-spin" />
                  ) : (
                    <Hash className="h-4 w-4 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">Generate Hashtags</span>
                  <span className="sm:hidden">Hashtags</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Display added hashtags */}
      {addedHashtags.length > 0 && (
        <div className="px-4 pb-2 pt-0">
          <div className="text-xs text-gray-500 mb-1">Added hashtags:</div>
          <div className="flex flex-wrap gap-2">
            {addedHashtags.map((tag, i) => (
              <Badge key={i} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Display generated hashtags with selection */}
      {postHashtags.length > 0 && (
        <div className="px-4 pb-3 pt-0">
          <div className="text-xs text-gray-500 mb-1">Tap to add individual hashtags or select multiple:</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {postHashtags.map((tag, i) => (
              <Badge
                key={i}
                className={`cursor-pointer transition-colors ${
                  selectedHashtags.includes(tag)
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}
                onClick={() => toggleHashtagSelection(tag)}
              >
                {selectedHashtags.includes(tag) && <Check className="h-3 w-3 mr-1" />}#{tag}
                <span
                  className="ml-2 px-1.5 py-0.5 bg-blue-200 dark:bg-blue-700 rounded-full text-xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    addSingleHashtag(tag)
                  }}
                  title="Add this hashtag only"
                >
                  +
                </span>
              </Badge>
            ))}
          </div>
          {showAddButton && (
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">
                {selectedHashtags.length > 0
                  ? `${selectedHashtags.length} hashtags selected`
                  : "No hashtags selected (will add all)"}
              </div>
              <Button size="sm" variant="outline" onClick={addHashtagsToPost} className="text-xs">
                <Plus className="h-3 w-3 mr-1" />
                {selectedHashtags.length > 0 ? `Add ${selectedHashtags.length} Selected` : "Add All Hashtags"}
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
