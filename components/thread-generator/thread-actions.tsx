import type { PlatformKey } from "@/lib/constants"
import { toast } from "@/hooks/use-toast"
import { smartSplitText } from "@/lib/text-processor"
import type { MediaItem } from "../media-uploader"
import { exceedsCharacterLimit } from "@/lib/character-counter"

// Error types for thread generation
export enum ThreadGenerationErrorType {
  INPUT_TOO_LONG = "input_too_long",
  UNSPLITTABLE_CONTENT = "unsplittable_content",
  PLATFORM_LIMIT_EXCEEDED = "platform_limit_exceeded",
  UNKNOWN_ERROR = "unknown_error",
}

export interface ThreadGenerationError {
  type: ThreadGenerationErrorType
  message: string
  details?: any
}

/**
 * Generates a thread from the provided text
 */
export const generateThread = (
  text: string | undefined,
  platform: PlatformKey,
  splitPoints: number[],
  setThreadPosts: (posts: string[]) => void,
  setIsGenerating: (isGenerating: boolean) => void,
  t: (namespace: string, key: string) => string,
  mediaItems: MediaItem[] = [],
): void => {
  if (!text?.trim()) {
    toast({
      title: t("threadGenerator", "noTextTitle"),
      description: t("threadGenerator", "noTextDescription"),
      variant: "destructive",
    })
    return
  }

  // Validate input length to prevent performance issues
  if (text.length > 100000) {
    toast({
      title: "Text too long",
      description: "Your text is extremely long and may cause performance issues. Please consider shortening it.",
      variant: "warning",
    })
  }

  setIsGenerating(true)

  // Simulate a small delay for better UX
  setTimeout(() => {
    try {
      let posts: string[]
      let currentMediaItems = [...mediaItems]

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
        const oversizedPosts = posts.filter((post) => exceedsCharacterLimit(post, platform, currentMediaItems))

        // If any posts exceed the limit, use smartSplitText to further split them
        if (oversizedPosts.length > 0) {
          const validatedPosts: string[] = []

          for (const post of posts) {
            if (!exceedsCharacterLimit(post, platform, currentMediaItems)) {
              validatedPosts.push(post)
            } else {
              // Split oversized posts
              const splitPosts = smartSplitText(post, platform, currentMediaItems)
              validatedPosts.push(...splitPosts)

              // Clear media items after the first post
              currentMediaItems = []
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
          const oversizedPosts = posts.filter((post) => exceedsCharacterLimit(post, platform, currentMediaItems))

          // If any posts exceed the limit, use smartSplitText to further split them
          if (oversizedPosts.length > 0) {
            const validatedPosts: string[] = []

            for (const post of posts) {
              if (!exceedsCharacterLimit(post, platform, currentMediaItems)) {
                validatedPosts.push(post)
              } else {
                // Split oversized posts
                const splitPosts = smartSplitText(post, platform, currentMediaItems)
                validatedPosts.push(...splitPosts)

                // Clear media items after the first post
                currentMediaItems = []
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
          // Use our smart text splitting function
          posts = smartSplitText(text, platform, currentMediaItems)
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

      // Handle specific error types
      if (error && typeof error === "object" && "type" in error) {
        const threadError = error as ThreadGenerationError

        switch (threadError.type) {
          case ThreadGenerationErrorType.INPUT_TOO_LONG:
            toast({
              title: "Text too long",
              description: "Your text is extremely long. It has been truncated to improve performance.",
              variant: "destructive",
            })
            break

          case ThreadGenerationErrorType.PLATFORM_LIMIT_EXCEEDED:
            toast({
              title: "Character limit exceeded",
              description: `Some posts exceed the ${platform} character limit and have been split.`,
              variant: "warning",
            })
            break

          default:
            toast({
              title: t("threadGenerator", "errorTitle"),
              description: threadError.message || t("threadGenerator", "errorDescription"),
              variant: "destructive",
            })
        }
      } else {
        toast({
          title: t("threadGenerator", "errorTitle"),
          description: t("threadGenerator", "errorDescription"),
          variant: "destructive",
        })
      }
    } finally {
      setIsGenerating(false)
    }
  }, 600)
}

/**
 * Performs find and replace operation on the text
 */
export const findAndReplace = (
  text: string | undefined,
  findText: string,
  replaceText: string,
  setText: (text: string) => void,
  t: (namespace: string, key: string) => string,
): void => {
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
}

/**
 * Adds hashtags to a specific post
 */
export const addHashtagsToPost = (
  postIndex: number,
  hashtags: string[],
  threadPosts: string[],
  setThreadPosts: (posts: string[]) => void,
  platform: PlatformKey,
): void => {
  if (postIndex >= 0 && postIndex < threadPosts.length) {
    // Create a copy of the thread posts array
    const updatedPosts = [...threadPosts]

    // Format the hashtags
    const hashtagText = hashtags.map((tag) => `#${tag}`).join(" ")

    // Check if adding hashtags would exceed character limit
    const updatedPost = `${updatedPosts[postIndex]}\n\n${hashtagText}`

    if (exceedsCharacterLimit(updatedPost, platform)) {
      toast({
        title: "Character limit exceeded",
        description: `Adding these hashtags would exceed the ${platform} character limit.`,
        variant: "destructive",
      })
      return
    }

    // Add the hashtags to the specified post
    updatedPosts[postIndex] = updatedPost

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
}

/**
 * Updates a specific post or replaces all posts
 */
export const updatePost = (
  updatedPost: string,
  index: number | undefined,
  threadPosts: string[],
  setThreadPosts: (posts: string[]) => void,
  platform: PlatformKey,
): void => {
  // Check if the updated post exceeds character limit
  if (exceedsCharacterLimit(updatedPost, platform)) {
    toast({
      title: "Character limit exceeded",
      description: `The updated post exceeds the ${platform} character limit.`,
      variant: "warning",
    })
  }

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
}

/**
 * Applies a suggestion to the text or a post
 */
export const applySuggestion = (
  suggestion: string,
  threadPosts: string[],
  setThreadPosts: (posts: string[]) => void,
  text: string | undefined,
  setText: (text: string) => void,
  platform: PlatformKey,
): void => {
  if (threadPosts.length > 0) {
    // Apply to the last post
    const updatedPosts = [...threadPosts]
    const lastIndex = updatedPosts.length - 1

    // Add the suggestion as a note at the end of the post
    const updatedPost = `${updatedPosts[lastIndex]}\n\n[Suggestion: ${suggestion}]`

    // Check if adding the suggestion would exceed character limit
    if (exceedsCharacterLimit(updatedPost, platform)) {
      // Create a new post for the suggestion instead
      updatedPosts.push(`[Suggestion: ${suggestion}]`)
      setThreadPosts(updatedPosts)

      toast({
        title: "Suggestion added as new post",
        description: "The suggestion was added as a new post to avoid exceeding character limits.",
      })
      return
    }

    updatedPosts[lastIndex] = updatedPost
    setThreadPosts(updatedPosts)

    toast({
      title: "Suggestion applied",
      description: "The suggestion has been added to your last post as a note.",
    })
  } else {
    // If no thread posts yet, add to the text
    if (text !== undefined) {
      const updatedText = `${text}\n\n[Suggestion: ${suggestion}]`
      setText(updatedText)

      toast({
        title: "Suggestion added",
        description: "The suggestion has been added to your text as a note.",
      })
    }
  }
}

/**
 * Applies AI-suggested hashtags to the text or a post
 */
export const applyHashtags = (
  hashtags: string[],
  threadPosts: string[],
  setThreadPosts: (posts: string[]) => void,
  text: string | undefined,
  setText: (text: string) => void,
  platform: PlatformKey,
): void => {
  // Format hashtags
  const hashtagText = hashtags.map((tag) => `#${tag}`).join(" ")

  if (threadPosts.length > 0) {
    // Add hashtags to the last post
    const updatedPosts = [...threadPosts]
    const lastIndex = updatedPosts.length - 1

    // Check if adding hashtags would exceed character limit
    const updatedPost = `${updatedPosts[lastIndex]}\n\n${hashtagText}`

    if (exceedsCharacterLimit(updatedPost, platform)) {
      // Create a new post for the hashtags instead
      updatedPosts.push(hashtagText)
      setThreadPosts(updatedPosts)

      toast({
        title: "Hashtags added as new post",
        description: "The hashtags were added as a new post to avoid exceeding character limits.",
      })
      return
    }

    updatedPosts[lastIndex] = updatedPost
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
}

/**
 * Applies an engagement booster to the text or a post
 */
export const applyEngagementBooster = (
  booster: string,
  threadPosts: string[],
  setThreadPosts: (posts: string[]) => void,
  text: string | undefined,
  setText: (text: string) => void,
  platform: PlatformKey,
): void => {
  // Check if the booster exceeds character limit
  if (exceedsCharacterLimit(booster, platform)) {
    // Split the booster if needed
    const splitBoosters = smartSplitText(booster, platform)

    if (threadPosts.length > 0) {
      // Add split boosters as new posts
      setThreadPosts([...threadPosts, ...splitBoosters])

      toast({
        title: "Engagement booster added",
        description: `The AI-generated engagement booster has been added as ${splitBoosters.length} new post(s).`,
      })
    } else if (text !== undefined) {
      // If no thread posts yet, add the first part to the text
      setText(`${text}\n\n${splitBoosters[0]}`)

      // If there are more parts, generate thread posts with them
      if (splitBoosters.length > 1) {
        setThreadPosts(splitBoosters.slice(1))
      }

      toast({
        title: "Engagement booster added",
        description: "The AI-generated engagement booster has been added to your text.",
      })
    }
    return
  }

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
}

/**
 * Clears all content and state
 */
export const clearAll = (
  setText: (text: string) => void,
  setThreadPosts: (posts: string[]) => void,
  setFindText: (text: string) => void,
  setReplaceText: (text: string) => void,
  setCharacterCount: (count: number) => void,
  setMediaItems: (items: MediaItem[]) => void,
  setSplitPoints: (points: number[]) => void,
  t: (namespace: string, key: string) => string,
): void => {
  setText("")
  setThreadPosts([])
  setFindText("")
  setReplaceText("")
  setCharacterCount(0)
  setMediaItems([])
  setSplitPoints([])

  // Clear sessionStorage
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("threadily-content")
    sessionStorage.removeItem("threadily-threads")
    sessionStorage.removeItem("threadily-find")
    sessionStorage.removeItem("threadily-replace")
  }

  toast({
    title: t("threadGenerator", "allClearedTitle"),
    description: t("threadGenerator", "allClearedDescription"),
  })
}
