"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Copy,
  RotateCcw,
  Loader2,
  AlertCircle,
  Check,
  Sparkles,
  Lightbulb,
  Undo2,
  Redo2,
  BarChart2,
  Trash2,
  Clipboard,
  ClipboardPaste,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { PLATFORMS, type PlatformKey } from "@/lib/constants"
import { PlatformTips } from "@/components/platform-tips"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { smartSplitText, applySmartFormatting } from "@/lib/text-processor"
import { AIThreadEnhancer } from "./ai-thread-enhancer"
import { HighlightedTextarea } from "./highlighted-textarea"
import { useHistory } from "@/hooks/use-history"
import { downloadThreadAsJson, downloadThreadAsText, importThreadFromFile } from "@/lib/import-export"
import { MediaUploader, type MediaItem } from "./media-uploader"
import { MediaPreview } from "./media-preview"
import { CharacterCounter } from "./character-counter"
import { SplitPointEditor } from "./split-point-editor"
import { PreviewModeToggle, type PreviewMode } from "./preview-mode-toggle"
import { SortableThreadPost } from "./sortable-thread-post"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import type { DragEndEvent } from "@dnd-kit/core"
import { UnlimitedTextBanner } from "./unlimited-text-banner"
import { PlatformEnhancements } from "./platform-enhancements"
import { ToneAnalyzer } from "./tone-analyzer"

// Import the new character counter utilities
import { countCharactersForPlatform, getCharacterCountStatus, exceedsCharacterLimit } from "@/lib/character-counter"

export function ThreadGenerator() {
  // Add a ref to track if the component is mounted to prevent state updates after unmounting
  const isMountedRef = useRef(false)
  const [initializationError, setInitializationError] = useState<Error | null>(null)

  const {
    value: text,
    push: setText,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<string>({
    maxHistory: 50,
    initialValue: "",
  })
  const [threadPosts, setThreadPosts] = useState<string[]>([])
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const [platform, setPlatform] = useState<PlatformKey>("twitter")
  const [maxChars, setMaxChars] = useState(PLATFORMS.twitter.maxChars)
  const [isSaved, setIsSaved] = useState(false)
  const [formatTips, setFormatTips] = useState<string[]>([])
  const [showAIEnhancer, setShowAIEnhancer] = useState(false)
  const [highlightChars, setHighlightChars] = useState(true)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [splitPoints, setSplitPoints] = useState<number[]>([])
  const [showSplitEditor, setShowSplitEditor] = useState(false)
  const [showMediaUploader, setShowMediaUploader] = useState(false)
  const [previewMode, setPreviewMode] = useState<PreviewMode>("compact")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { t } = useLanguage()
  const [showToneAnalyzer, setShowToneAnalyzer] = useState(false)

  // Cache for format tips to prevent unnecessary recalculations
  const formatTipsCache = useRef<{
    text?: string
    platform?: PlatformKey
    maxChars?: number
    tips: string[]
  }>({ tips: [] })

  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Set mounted flag on component mount and clear on unmount
  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Initialize component state
  useEffect(() => {
    try {
      // Load platform preference from localStorage
      if (typeof window !== "undefined") {
        const savedPlatform = localStorage.getItem("threadily-platform") as PlatformKey
        if (savedPlatform && Object.keys(PLATFORMS).includes(savedPlatform)) {
          setPlatform(savedPlatform)
          setMaxChars(PLATFORMS[savedPlatform].maxChars)
        }

        // Load saved content from sessionStorage
        const savedContent = sessionStorage.getItem("threadily-content")
        if (savedContent) {
          setText(savedContent)
        }

        // Load media items from sessionStorage
        const savedMediaItems = sessionStorage.getItem("threadily-media-items")
        if (savedMediaItems) {
          try {
            const parsedMediaItems = JSON.parse(savedMediaItems) as MediaItem[]
            setMediaItems(parsedMediaItems)
          } catch (e) {
            console.error("Error parsing saved media items:", e)
          }
        }
      }
    } catch (err) {
      setInitializationError(err instanceof Error ? err : new Error('Failed to initialize ThreadGenerator'))
      console.error("Error initializing ThreadGenerator:", err)
    }
  }, [])

  // Handle errors during initialization
  if (initializationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to initialize editor</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{initializationError.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Reload page
        </button>
      </div>
    )
  }

  // Listen for platform changes
  useEffect(() => {
    // Listen for platform changes
    const handlePlatformChange = (e: CustomEvent) => {
      const newPlatform = e.detail as PlatformKey
      setPlatform(newPlatform)
      setMaxChars(PLATFORMS[newPlatform].maxChars)
    }

    window.addEventListener("platformChange", handlePlatformChange as EventListener)

    return () => {
      window.removeEventListener("platformChange", handlePlatformChange as EventListener)
    }
  }, [])

  // Generate formatting tips - memoized to prevent unnecessary recalculations
  const generateFormatTips = useCallback(
    (text: string | undefined, platform: PlatformKey, maxChars: number): string[] => {
      // Check cache to avoid unnecessary recalculations
      if (
        formatTipsCache.current.text === text &&
        formatTipsCache.current.platform === platform &&
        formatTipsCache.current.maxChars === maxChars
      ) {
        return formatTipsCache.current.tips
      }

      if (text === undefined || text.length === 0) {
        formatTipsCache.current = { text, platform, maxChars, tips: [] }
        return []
      }

      const tips: string[] = []

      // Check for long paragraphs
      const paragraphs = text.split(/\n\s*\n/)
      const longParagraphs = paragraphs.filter((p) => p.length > maxChars * 0.8).length

      if (longParagraphs > 0) {
        tips.push(`Consider breaking up ${longParagraphs} long paragraph(s) for better readability.`)
      }

      // Check for hashtags
      const hashtags = (text.match(/#[a-zA-Z0-9_]+/g) || []).length
      if (platform === "twitter" && hashtags === 0 && text.length > 100) {
        tips.push("Consider adding relevant hashtags to increase visibility.")
      } else if (hashtags > 5 && platform === "twitter") {
        tips.push("Using too many hashtags may reduce engagement. Consider using fewer.")
      }

      // Platform-specific tips
      if (platform === "reddit" && !text.includes("**") && !text.includes("*") && text.length > 200) {
        tips.push("Use markdown formatting like **bold** or *italic* to emphasize key points.")
      }

      if (platform === "mastodon" && text.length > 400) {
        tips.push("Mastodon users prefer shorter posts. Consider breaking this into multiple posts.")
      }

      // Update cache
      formatTipsCache.current = { text, platform, maxChars, tips }
      return tips
    },
    [],
  )

  // Update character count and format tips when text changes
  useEffect(() => {
    if (text === undefined) return

    // Update character count using the platform-specific counter
    const count = countCharactersForPlatform(text, platform, mediaItems)
    setCharacterCount(count)

    // Generate formatting tips
    const tips = generateFormatTips(text, platform, maxChars)

    // Only update state if tips have changed to prevent unnecessary renders
    if (JSON.stringify(tips) !== JSON.stringify(formatTips)) {
      setFormatTips(tips)
    }

    // Save to sessionStorage if available
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("threadily-content", text)

        // Only update saved state if component is still mounted
        if (isMountedRef.current) {
          setIsSaved(true)

          // Reset saved indicator after 2 seconds
          const timer = setTimeout(() => {
            if (isMountedRef.current) {
              setIsSaved(false)
            }
          }, 2000)

          return () => clearTimeout(timer)
        }
      } catch (error) {
        console.error("Error saving to session storage:", error)
      }
    }
  }, [text, platform, maxChars, generateFormatTips, formatTips, mediaItems])

  // Handle keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        if (e.shiftKey) {
          e.preventDefault()
          redo()
        } else {
          e.preventDefault()
          undo()
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [undo, redo])

  // Save thread posts to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && isMountedRef.current) {
      try {
        sessionStorage.setItem("threadily-threads", JSON.stringify(threadPosts))
      } catch (error) {
        console.error("Error saving thread posts to session storage:", error)
      }
    }
  }, [threadPosts])

  // Load saved content on initial render - only runs once
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedText = sessionStorage.getItem("threadily-content")
        if (savedText) setText(savedText)

        const savedThreads = sessionStorage.getItem("threadily-threads")
        if (savedThreads) {
          try {
            setThreadPosts(JSON.parse(savedThreads))
          } catch (e) {
            console.error("Error parsing saved threads", e)
          }
        }

        const savedFind = sessionStorage.getItem("threadily-find")
        if (savedFind) setFindText(savedFind)

        const savedReplace = sessionStorage.getItem("threadily-replace")
        if (savedReplace) setReplaceText(savedReplace)
      } catch (error) {
        console.error("Error loading from session storage:", error)
      }
    }
  }, [setText]) // Only depends on setText, runs once on mount

  // Update the generateThread function call in the component
  const generateThread = useCallback(() => {
    if (!text?.trim()) {
      toast({
        title: t("threadGenerator", "noTextTitle"),
        description: t("threadGenerator", "noTextDescription"),
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Use the updated generateThread function from thread-actions.tsx
    setTimeout(() => {
      try {
        let posts: string[]

        // Check if we have custom split points
        if (splitPoints.length > 0) {
          posts = []
          let lastIndex = 0

          // Create posts based on split points
          for (const point of splitPoints) {
            posts.push(text.substring(lastIndex, point))
            lastIndex = point
          }

          // Add the last segment
          posts.push(text.substring(lastIndex))

          // Filter out empty posts
          posts = posts.filter((post) => post.trim().length > 0)

          // Validate that each post is within the character limit
          const oversizedPosts = posts.filter((post) => exceedsCharacterLimit(post, platform, mediaItems))

          // If any posts exceed the limit, use smartSplitText to further split them
          if (oversizedPosts.length > 0) {
            const validatedPosts: string[] = []

            for (const post of posts) {
              if (!exceedsCharacterLimit(post, platform, mediaItems)) {
                validatedPosts.push(post)
              } else {
                // Split oversized posts
                const splitPosts = smartSplitText(post, platform, mediaItems.slice())
                validatedPosts.push(...splitPosts)

                // Media items are only applied to the first post
                // We'll handle this in the smartSplitText function
              }
            }

            posts = validatedPosts

            // Show a warning about the split
            if (validatedPosts.length > posts.length) {
              toast({
                title: "Posts split due to character limits",
                description: `Some posts exceeded the ${platform} character limit and were automatically split.`,
                variant: "warning",
              })
            }
          }
        } else {
          // Check if the text contains thread numbers like 1/, 2/, etc.
          const threadNumberRegex = /\b(\d+)\/\b/g
          const hasThreadNumbers = threadNumberRegex.test(text)

          if (hasThreadNumbers) {
            // Split by thread numbers
            const parts = text.split(/\b\d+\/\b/).filter(Boolean)
            posts = parts.map((part) => part.trim())

            // Validate that each post is within the character limit
            const oversizedPosts = posts.filter((post) => exceedsCharacterLimit(post, platform, mediaItems))

            // If any posts exceed the limit, use smartSplitText to further split them
            if (oversizedPosts.length > 0) {
              const validatedPosts: string[] = []

              for (const post of posts) {
                if (!exceedsCharacterLimit(post, platform, mediaItems)) {
                  validatedPosts.push(post)
                } else {
                  // Split oversized posts
                  const splitPosts = smartSplitText(post, platform, mediaItems.slice())
                  validatedPosts.push(...splitPosts)

                  // Media items are only applied to the first post
                  // We'll handle this in the smartSplitText function
                }
              }

              posts = validatedPosts

              // Show a warning about the split
              if (validatedPosts.length > posts.length) {
                toast({
                  title: "Posts split due to character limits",
                  description: `Some posts exceeded the ${platform} character limit and were automatically split.`,
                  variant: "warning",
                })
              }
            }
          } else {
            // Use our smart text splitting function with media items
            posts = smartSplitText(text, platform, mediaItems.slice())
          }
        }

        setThreadPosts(posts)

        // Show appropriate success message
        if (posts.length === 1) {
          toast({
            title: "Post generated",
            description: `Your content has been formatted as a single ${platform} post.`,
          })
        } else {
          toast({
            title: t("threadGenerator", "threadGeneratedTitle"),
            description: `Your content has been split into ${posts.length} posts for ${platform}.`,
          })
        }
      } catch (error) {
        console.error("Thread generation error:", error)
        toast({
          title: t("threadGenerator", "errorTitle"),
          description: t("threadGenerator", "errorDescription"),
          variant: "destructive",
        })
      } finally {
        if (isMountedRef.current) {
          setIsGenerating(false)
        }
      }
    }, 600)
  }, [text, platform, splitPoints, mediaItems, t, toast])

  const findAndReplace = useCallback(() => {
    if (!findText || text === undefined) {
      toast({
        title: t("threadGenerator", "noSearchTextTitle"),
        description: t("threadGenerator", "noSearchTextDescription"),
        variant: "destructive",
      })
      return
    }

    const newText = text.replaceAll(findText, replaceText)
    setText(newText)

    toast({
      title: t("threadGenerator", "textReplacedTitle"),
      description: t("threadGenerator", "textReplacedDescription", { findText, replaceText }),
    })
  }, [findText, replaceText, text, setText, t, toast])

  const formatText = useCallback(() => {
    if (text === undefined) return

    // Use our new smart formatting function
    const formattedText = applySmartFormatting(text, platform)
    setText(formattedText)

    toast({
      title: t("threadGenerator", "textFormattedTitle"),
      description: t("threadGenerator", "textFormattedDescription"),
    })
  }, [text, platform, setText, t, toast])

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text)
      toast({
        title: t("threadGenerator", "copiedTitle"),
        description: t("threadGenerator", "copiedDescription"),
      })
    },
    [t, toast],
  )

  const copyAllToClipboard = useCallback(() => {
    const allText = threadPosts.join("\n\n")
    navigator.clipboard.writeText(allText)
    toast({
      title: t("threadGenerator", "copiedAllTitle"),
      description: t("threadGenerator", "copiedAllDescription"),
    })
  }, [threadPosts, t, toast])

  // Update the character count color function to use the new status
  const getCharacterCountColor = useCallback(() => {
    if (characterCount === 0) return "text-gray-400"

    const status = getCharacterCountStatus(text || "", platform, mediaItems)

    switch (status) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      default:
        return "text-gray-400"
    }
  }, [characterCount, text, platform, mediaItems])

  // Update the progress value function to use the new character counter
  const getProgressValue = useCallback(() => {
    const maxChars = PLATFORMS[platform].maxChars
    return (characterCount / maxChars) * 100
  }, [characterCount, platform])

  // Update the progress color function to use the new status
  const getProgressColor = useCallback(() => {
    if (characterCount === 0) return "bg-gray-200 dark:bg-gray-700"

    const status = getCharacterCountStatus(text || "", platform, mediaItems)

    switch (status) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-200 dark:bg-gray-700"
    }
  }, [characterCount, text, platform, mediaItems])

  const formatPostForPlatform = useCallback(
    (post: string, index: number) => {
      // Apply platform-specific formatting to the post
      return applySmartFormatting(post, platform)
    },
    [platform],
  )

  const getPlatformBadgeColor = useCallback(() => {
    switch (platform) {
      case "twitter":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
      case "threads":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
      case "reddit":
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
      case "mastodon":
        return "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200"
      case "linkedin":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
      case "facebook":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    }
  }, [platform])

  // AI Enhancement handlers
  const handleApplyHashtags = useCallback(
    (hashtags: string[]) => {
      // Format hashtags
      const hashtagText = hashtags.map((tag) => `#${tag}`).join(" ")

      if (threadPosts.length > 0) {
        // Add hashtags to the last post
        const updatedPosts = [...threadPosts]
        const lastIndex = updatedPosts.length - 1
        updatedPosts[lastIndex] = `${updatedPosts[lastIndex]}\n\n${hashtagText}`
        setThreadPosts(updatedPosts)
        toast({
          title: "Hashtags added",
          description: "The AI-suggested hashtags have been added to your last post.",
        })
      } else {
        // If no thread posts yet, add hashtags to the text
        if (text !== undefined) {
          setText(`${text}\n\n${hashtagText}`)
          toast({
            title: "Hashtags added",
            description: "The AI-suggested hashtags have been added to your text.",
          })
        }
      }
    },
    [threadPosts, text, setText, toast],
  )

  const handleApplyEngagementBooster = useCallback(
    (booster: string) => {
      if (threadPosts.length > 0) {
        // Add engagement booster as a new post
        setThreadPosts([...threadPosts, booster])
        toast({
          title: "Engagement booster added",
          description: "The AI-generated engagement booster has been added as a new post.",
        })
      } else {
        // If no thread posts yet, add it to the text
        if (text !== undefined) {
          setText(`${text}\n\n${booster}`)
          toast({
            title: "Engagement booster added",
            description: "The AI-generated engagement booster has been added to your text.",
          })
        }
      }
    },
    [threadPosts, text, setText, toast],
  )

  // Media handlers
  const handleAddMedia = useCallback((media: MediaItem) => {
    setMediaItems((prevItems) => [...prevItems, media])
  }, [])

  const handleRemoveMedia = useCallback((id: string) => {
    setMediaItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  // Split point handlers
  const handleSplitPointsChange = useCallback((newSplitPoints: number[]) => {
    setSplitPoints(newSplitPoints)
  }, [])

  // Import/Export handlers
  const handleExportJson = useCallback(() => {
    if (text !== undefined) {
      downloadThreadAsJson(text, threadPosts, platform)
      toast({
        title: "Thread exported",
        description: "Your thread has been exported as a JSON file.",
      })
    }
  }, [text, threadPosts, platform, toast])

  const handleExportText = useCallback(() => {
    if (text !== undefined) {
      downloadThreadAsText(text, threadPosts)
      toast({
        title: "Thread exported",
        description: "Your thread has been exported as a text file.",
      })
    }
  }, [text, threadPosts, toast])

  const handleImport = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      try {
        const result = await importThreadFromFile(file)

        if (typeof result === "string") {
          // Plain text import
          setText(result)
          toast({
            title: "Text imported",
            description: "The text has been imported successfully.",
          })
        } else {
          // JSON import
          setText(result.content)
          setThreadPosts(result.threads)
          setPlatform(result.platform)
          setMaxChars(PLATFORMS[result.platform].maxChars)
          toast({
            title: "Thread imported",
            description: "The thread has been imported successfully.",
          })
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: error instanceof Error ? error.message : "Failed to import file.",
          variant: "destructive",
        })
      }

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [setText, toast],
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value)
    },
    [setText],
  )

  const toggleHighlightChars = useCallback(() => {
    setHighlightChars((prev) => !prev)
  }, [])

  // Handle drag end for sortable posts
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over.id) {
        setThreadPosts((posts) => {
          const oldIndex = posts.findIndex((_, i) => `post-${i}` === active.id)
          const newIndex = posts.findIndex((_, i) => `post-${i}` === over.id)

          return arrayMove(posts, oldIndex, newIndex)
        })

        toast({
          title: "Post reordered",
          description: "Your thread posts have been reordered.",
        })
      }
    },
    [toast],
  )

  // Get preview container class based on preview mode
  const getPreviewContainerClass = useCallback(() => {
    switch (previewMode) {
      case "mobile":
        return "max-w-sm mx-auto border rounded-xl overflow-hidden shadow-lg"
      case "tablet":
        return "max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-lg"
      case "desktop":
        return "max-w-4xl mx-auto border rounded-xl overflow-hidden shadow-lg"
      default:
        return ""
    }
  }, [previewMode])

  const handleAddHashtagsToPost = useCallback(
    (postIndex: number, hashtags: string[]) => {
      if (postIndex >= 0 && postIndex < threadPosts.length) {
        // Create a copy of the thread posts array
        const updatedPosts = [...threadPosts]

        // Format the hashtags
        const hashtagText = hashtags.map((tag) => `#${tag}`).join(" ")

        // Add the hashtags to the specified post
        updatedPosts[postIndex] = `${updatedPosts[postIndex]}\n\n${hashtagText}`

        // Update the state with the new posts array
        setThreadPosts(updatedPosts)

        // Show a success toast
        toast({
          title: "Hashtags added",
          description: `${hashtags.length} hashtags have been added to post ${postIndex + 1}.`,
        })
      } else {
        console.error(`Invalid post index: ${postIndex}. Thread has ${threadPosts.length} posts.`)
      }
    },
    [threadPosts, toast],
  )

  const handleUpdatePost = useCallback(
    (updatedPost: string, index?: number) => {
      if (index !== undefined && index >= 0 && index < threadPosts.length) {
        // Update a specific post
        const updatedPosts = [...threadPosts]
        updatedPosts[index] = updatedPost
        setThreadPosts(updatedPosts)

        toast({
          title: "Post updated",
          description: `Post ${index + 1} has been updated with the enhanced content.`,
        })
      } else {
        // Replace all posts with a single post
        setThreadPosts([updatedPost])

        toast({
          title: "Content updated",
          description: "Your content has been replaced with the enhanced version.",
        })
      }
    },
    [threadPosts, toast],
  )

  const handleApplySuggestion = useCallback(
    (suggestion: string) => {
      if (threadPosts.length > 0) {
        // Apply to the last post
        const updatedPosts = [...threadPosts]
        const lastIndex = updatedPosts.length - 1

        // Add the suggestion as a note at the end of the post
        updatedPosts[lastIndex] = `${updatedPosts[lastIndex]}\n\n[Suggestion: ${suggestion}]`
        setThreadPosts(updatedPosts)

        toast({
          title: "Suggestion applied",
          description: "The suggestion has been added to your last post as a note.",
        })
      } else {
        // If no thread posts yet, add to the text
        if (text !== undefined) {
          setText(`${text}\n\n[Suggestion: ${suggestion}]`)

          toast({
            title: "Suggestion added",
            description: "The suggestion has been added to your text as a note.",
          })
        }
      }
    },
    [threadPosts, text, setText, toast],
  )

  const copyTextToClipboard = useCallback(async () => {
    if (!text) {
      toast({
        title: "Nothing to copy",
        description: "The text area is empty.",
        variant: "destructive",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard.",
      })
    } catch (error) {
      console.error("Failed to copy text: ", error)
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }, [text, toast])

  const pasteTextFromClipboard = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      if (!clipboardText) {
        toast({
          title: "Nothing to paste",
          description: "Your clipboard is empty.",
          variant: "destructive",
        })
        return
      }

      setText(clipboardText)
      toast({
        title: "Text pasted",
        description: "Clipboard content has been pasted into the editor.",
      })
    } catch (error) {
      console.error("Failed to paste text: ", error)
      toast({
        title: "Paste failed",
        description: "Could not access clipboard. Please check permissions and try again.",
        variant: "destructive",
      })
    }
  }, [setText, toast])

  const clearAll = useCallback(() => {
    setText("")
    setThreadPosts([])
    setFindText("")
    setReplaceText("")
    setCharacterCount(0)
    setMediaItems([])
    setSplitPoints([])
    // Clear sessionStorage
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("threadily-content")
        sessionStorage.removeItem("threadily-threads")
        sessionStorage.removeItem("threadily-find")
        sessionStorage.removeItem("threadily-replace")
      } catch (error) {
        console.error("Error clearing session storage:", error)
      }
    }
    toast({
      title: t("threadGenerator", "allClearedTitle"),
      description: t("threadGenerator", "allClearedDescription"),
    })
  }, [setText, t, toast])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Card className="shadow-md border-gray-200 dark:border-gray-800 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-900 pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  {t("threadGenerator", "yourText")}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-gray-500">
                        {isSaved && <Check className="h-3 w-3 mr-1 text-green-500" />}
                        {isSaved ? "" : ""}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Auto-saved to browser storage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>{t("threadGenerator", "formatInstructions")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="editor" className="flex-1 max-w-[200px]">
                    {t("threadGenerator", "editor")}
                  </TabsTrigger>
                  <TabsTrigger value="find-replace" className="flex-1 max-w-[200px]">
                    {t("threadGenerator", "findReplace")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="space-y-4">
                  <UnlimitedTextBanner />
                  <div className="relative">
                    {highlightChars ? (
                      <HighlightedTextarea
                        value={text || ""}
                        onChange={handleTextChange}
                        platform={platform}
                        placeholder={t("threadGenerator", "textareaPlaceholder")}
                        className="min-h-[200px] resize-y pr-16"
                      />
                    ) : (
                      <div className="relative">
                        <textarea
                          value={text || ""}
                          onChange={handleTextChange}
                          placeholder={t("threadGenerator", "textareaPlaceholder")}
                          className="min-h-[200px] resize-y pr-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <div className={`absolute bottom-3 right-3 text-xs font-medium ${getCharacterCountColor()}`}>
                          {characterCount} chars (unlimited) • {Math.ceil(characterCount / maxChars)} posts
                        </div>
                      </div>
                    )}
                  </div>

                  <CharacterCounter text={text || ""} platform={platform} maxChars={maxChars} />

                  {/* Media previews */}
                  {mediaItems.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {mediaItems.map((media) => (
                        <MediaPreview key={media.id} media={media} onRemove={handleRemoveMedia} />
                      ))}
                    </div>
                  )}

                  {showMediaUploader && (
                    <div className="mt-4 animate-in fade-in-50">
                      <MediaUploader onMediaAdd={handleAddMedia} />
                    </div>
                  )}

                  {showSplitEditor && (
                    <div className="mt-4 animate-in fade-in-50">
                      <SplitPointEditor
                        text={text || ""}
                        splitPoints={splitPoints}
                        onSplitPointsChange={handleSplitPointsChange}
                      />
                    </div>
                  )}

                  {formatTips.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-md p-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-blue-700 dark:text-blue-300">Formatting Tips</p>
                          <ul className="mt-1 text-blue-600 dark:text-blue-200 space-y-1">
                            {formatTips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="mr-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={undo}
                          disabled={!canUndo}
                          className="h-9 px-2"
                          title="Undo (Ctrl+Z)"
                        >
                          <Undo2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={redo}
                          disabled={!canRedo}
                          className="h-9 px-2"
                          title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
                        >
                          <Redo2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={copyTextToClipboard}
                        title="Copy text to clipboard"
                      >
                        <Clipboard className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={pasteTextFromClipboard}
                        title="Paste text from clipboard"
                      >
                        <ClipboardPaste className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Paste</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={() => {
                          // Smart formatting based on platform
                          if (text !== undefined) {
                            const formattedText = applySmartFormatting(text, platform)
                            setText(formattedText)

                            toast({
                              title: "Smart formatting applied",
                              description: `Text optimized for ${PLATFORMS[platform].name}`,
                            })
                          }
                        }}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Smart Format</span>
                        <span className="sm:hidden">Format</span>
                      </Button>
                      {/* AI Enhance button hidden */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={() => setShowToneAnalyzer(!showToneAnalyzer)}
                      >
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Analyze Tone</span>
                        <span className="sm:hidden">Tone</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={() => {
                          setText("")
                          toast({
                            title: "Text cleared",
                            description: "Your text has been cleared.",
                          })
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Clear Text</span>
                        <span className="sm:hidden">Clear</span>
                      </Button>
                    </div>

                    <Button
                      onClick={generateThread}
                      disabled={isGenerating}
                      className="h-9 px-4 sm:px-6 mt-2 sm:mt-0 w-full sm:w-auto"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("threadGenerator", "generating")}
                        </>
                      ) : (
                        t("threadGenerator", "generateThread")
                      )}
                    </Button>
                  </div>

                  {showAIEnhancer && (
                    <div className="mt-4 animate-in fade-in-50">
                      <AIThreadEnhancer
                        text={text || ""}
                        onApplyHashtags={handleApplyHashtags}
                        onApplyEngagementBooster={handleApplyEngagementBooster}
                      />
                    </div>
                  )}

                  {showToneAnalyzer && (
                    <div className="mt-4 animate-in fade-in-50">
                      <ToneAnalyzer text={text || ""} onApplySuggestion={handleApplySuggestion} />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="find-replace" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="find">{t("threadGenerator", "find")}</Label>
                      <Input
                        id="find"
                        placeholder={t("threadGenerator", "findPlaceholder")}
                        value={findText}
                        onChange={(e) => {
                          setFindText(e.target.value)
                          if (typeof window !== "undefined") {
                            try {
                              sessionStorage.setItem("threadily-find", e.target.value)
                            } catch (error) {
                              console.error("Error saving find text to session storage:", error)
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="replace">{t("threadGenerator", "replaceWith")}</Label>
                      <Input
                        id="replace"
                        placeholder={t("threadGenerator", "replacePlaceholder")}
                        value={replaceText}
                        onChange={(e) => {
                          setReplaceText(e.target.value)
                          if (typeof window !== "undefined") {
                            try {
                              sessionStorage.setItem("threadily-replace", e.target.value)
                            } catch (error) {
                              console.error("Error saving replace text to session storage:", error)
                            }
                          }
                        }}
                      />
                    </div>
                    <Button onClick={findAndReplace}>{t("threadGenerator", "replaceAll")}</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-900 py-3 px-6 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {platform === "reddit" ? "Markdown supported" : "Plain text only"}
              </div>
              <Badge variant="outline" className={getPlatformBadgeColor()}>
                {PLATFORMS[platform].name}
              </Badge>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-1">
          <PlatformTips />

          {characterCount > 50000 && (
            <Alert variant="warning" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Large Text Warning</AlertTitle>
              <AlertDescription>
                Your text is very long ({characterCount} characters). This will generate approximately{" "}
                {Math.ceil(characterCount / maxChars)} posts. The app may slow down with extremely large texts.
              </AlertDescription>
            </Alert>
          )}

          {threadPosts.length > 0 && (
            <Card className="mt-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Thread Summary</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>{threadPosts.length} posts generated</p>
                  <p className="mt-1">
                    {threadPosts.filter((post) => post.length <= maxChars).length} posts within character limit
                  </p>
                  {threadPosts.some((post) => post.length > maxChars) && (
                    <p className="text-red-500 mt-1">
                      {threadPosts.filter((post) => post.length > maxChars).length} posts exceed limit
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {threadPosts.length > 0 && (
        <div className="space-y-4 animate-in fade-in-50 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {t("threadGenerator", "yourThread", { count: threadPosts.length })}
              <Badge variant="outline" className={getPlatformBadgeColor()}>
                {PLATFORMS[platform].name}
              </Badge>
            </h2>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="w-full sm:w-auto">
                <PreviewModeToggle mode={previewMode} onChange={setPreviewMode} />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={copyAllToClipboard} className="flex-1 sm:flex-none">
                  <Copy className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t("threadGenerator", "copyAll")}</span>
                  <span className="sm:hidden">Copy</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setThreadPosts([])} className="flex-1 sm:flex-none">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t("threadGenerator", "reset")}</span>
                  <span className="sm:hidden">Reset</span>
                </Button>
              </div>
            </div>
          </div>

          <PlatformEnhancements
            posts={threadPosts}
            platform={platform}
            onUpdatePosts={setThreadPosts}
            onUpdatePost={handleUpdatePost}
          />

          <div className={getPreviewContainerClass()}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={threadPosts.map((_, i) => `post-${i}`)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {threadPosts.map((post, index) => (
                    <SortableThreadPost
                      key={`post-${index}`}
                      id={`post-${index}`}
                      index={index}
                      totalPosts={threadPosts.length}
                      post={post}
                      platform={platform}
                      maxChars={maxChars}
                      onCopy={copyToClipboard}
                      formattedPost={formatPostForPlatform(post, index)}
                      onAddHashtags={handleAddHashtagsToPost}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}

      {threadPosts.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={clearAll} className="px-8">
            {t("threadGenerator", "clearAll")}
          </Button>
        </div>
      )}
    </div>
  )
}
