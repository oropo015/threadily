import { type PlatformKey, PLATFORMS } from "./constants"
import { countCharactersForPlatform, exceedsCharacterLimit } from "./character-counter"
import type { MediaItem } from "../components/media-uploader"

// Types for text processing
type TextSegment = {
  text: string
  type: "sentence" | "paragraph" | "heading" | "list" | "code" | "quote" | "other"
  priority: number // Higher priority means we try to keep this segment intact
}

// Detect the type of a text segment
function detectSegmentType(text: string): TextSegment["type"] {
  // Check for headings (lines starting with # or all caps followed by punctuation)
  if (text.trim().startsWith("#") || /^[A-Z][A-Z\s]+[:.!?]/.test(text.trim())) {
    return "heading"
  }

  // Check for code blocks (indented by 4 spaces or starting with \`\`\`)
  if (text.trim().startsWith("```") || text.split("\n").every((line) => line.startsWith("    "))) {
    return "code"
  }

  // Check for list items (starting with -, *, or number.)
  if (/^(\s*[-*]\s|\s*\d+\.\s)/.test(text.trim())) {
    return "list"
  }

  // Check for quotes (starting with >)
  if (text.trim().startsWith(">")) {
    return "quote"
  }

  // Check if it's a paragraph (contains multiple sentences or line breaks)
  if (text.includes("\n") || (text.match(/[.!?]\s/g) || []).length > 1) {
    return "paragraph"
  }

  // Default to sentence
  return "sentence"
}

// Assign priority to a segment based on its type
function getSegmentPriority(type: TextSegment["type"]): number {
  switch (type) {
    case "heading":
      return 5
    case "code":
      return 4
    case "quote":
      return 3
    case "list":
      return 2
    case "paragraph":
      return 1
    case "sentence":
      return 0
    default:
      return 0
  }
}

// Split text into semantic segments
export function splitIntoSegments(text: string): TextSegment[] {
  // First, split by double line breaks to get paragraphs
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean)

  const segments: TextSegment[] = []

  for (const paragraph of paragraphs) {
    // For code blocks, keep them intact
    if (paragraph.trim().startsWith("```") || paragraph.split("\n").every((line) => line.startsWith("    "))) {
      const type = "code"
      segments.push({
        text: paragraph,
        type,
        priority: getSegmentPriority(type),
      })
      continue
    }

    // For lists, keep the whole list together if possible
    if (/^(\s*[-*]\s|\s*\d+\.\s)/.test(paragraph.trim())) {
      const type = "list"
      segments.push({
        text: paragraph,
        type,
        priority: getSegmentPriority(type),
      })
      continue
    }

    // For quotes, keep them together
    if (paragraph.trim().startsWith(">")) {
      const type = "quote"
      segments.push({
        text: paragraph,
        type,
        priority: getSegmentPriority(type),
      })
      continue
    }

    // For regular paragraphs, split by sentences
    const sentences = paragraph.match(/[^.!?]+[.!?]+\s*/g) || [paragraph]

    for (const sentence of sentences) {
      if (!sentence.trim()) continue

      const type = detectSegmentType(sentence)
      segments.push({
        text: sentence.trim(),
        type,
        priority: getSegmentPriority(type),
      })
    }
  }

  return segments
}

// Calculate the optimal target length for a post (85% of max chars)
function getOptimalTargetLength(maxChars: number): number {
  return Math.floor(maxChars * 0.85)
}

// Preprocess text for platform-specific handling
function preprocessText(text: string, platform: PlatformKey): string {
  // Normalize line breaks
  let processedText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n")

  // Platform-specific preprocessing
  switch (platform) {
    case "reddit":
      // Enhance markdown formatting
      processedText = processedText.replace(/^([A-Z][^.!?]*[.!?])$/gm, "## $1").replace(/^(\s*[-*]\s)/gm, "* ")
      break
    case "twitter":
    case "threads":
      // Ensure proper hashtag and mention formatting
      processedText = processedText
        .replace(/(?:^|\s)#([a-zA-Z0-9_]+)/g, " #$1")
        .replace(/(?:^|\s)@([a-zA-Z0-9_]+)/g, " @$1")
      break
  }

  return processedText
}

// Intelligently split text into posts based on platform character limits
export function smartSplitText(text: string, platform: PlatformKey, mediaItems: MediaItem[] = []): string[] {
  // Preprocess text for platform-specific handling
  const processedText = preprocessText(text, platform)

  const maxChars = PLATFORMS[platform].maxChars
  const optimalTargetLength = getOptimalTargetLength(maxChars)

  // If text is already under the limit, return it as a single post
  if (!exceedsCharacterLimit(processedText, platform, mediaItems)) {
    // If text is too short (less than 85% of max), try to expand it with engagement boosters
    if (countCharactersForPlatform(processedText, platform, mediaItems) < optimalTargetLength) {
      return [optimizePostLength(processedText, platform)]
    }
    return [processedText]
  }

  // Split text into semantic segments
  const segments = splitIntoSegments(processedText)

  // Now combine segments into posts, strictly enforcing the character limit
  const posts: string[] = []
  let currentPost = ""
  let currentMediaItems: MediaItem[] = [...mediaItems] // Copy media items for first post

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]

    // Check if adding this segment would exceed the character limit
    const potentialPost = currentPost
      ? `${currentPost}${currentPost.endsWith("\n") || segment.text.startsWith("\n") ? "" : " "}${segment.text}`
      : segment.text

    if (exceedsCharacterLimit(potentialPost, platform, currentMediaItems)) {
      // If current post is not empty, save it and start a new one
      if (currentPost) {
        posts.push(currentPost)
        currentPost = ""
        currentMediaItems = [] // No media for subsequent posts
      }

      // If the segment itself exceeds the limit, we need to split it
      if (exceedsCharacterLimit(segment.text, platform, currentMediaItems)) {
        // For high priority segments, try to keep them intact if possible
        if (segment.priority >= 3) {
          // If it's a code block or other high-priority content, keep it as a separate post
          posts.push(segment.text)
          continue
        } else {
          // Split the segment at optimal points
          const splitSegments = splitLongSegment(segment.text, platform, currentMediaItems)

          // Add all but the last segment as separate posts
          for (let j = 0; j < splitSegments.length - 1; j++) {
            posts.push(splitSegments[j])
          }

          // Start the new post with the last segment
          currentPost = splitSegments[splitSegments.length - 1]
        }
      } else {
        // The segment fits in a post by itself
        currentPost = segment.text
      }
    } else {
      // Add the segment to the current post
      if (!currentPost) {
        currentPost = segment.text
      } else {
        // Add a space between segments if needed
        if (!currentPost.endsWith("\n") && !segment.text.startsWith("\n")) {
          currentPost += " "
        }
        currentPost += segment.text
      }
    }
  }

  // Add the last post if there's anything left
  if (currentPost) {
    posts.push(currentPost)
  }

  // Final validation pass to ensure all posts are under the character limit
  return validateAndNumberPosts(posts, platform)
}

// Split a long segment into multiple parts that fit within character limits
function splitLongSegment(text: string, platform: PlatformKey, mediaItems: MediaItem[] = []): string[] {
  const maxChars = PLATFORMS[platform].maxChars
  const result: string[] = []
  let remainingText = text

  while (remainingText.length > 0) {
    if (!exceedsCharacterLimit(remainingText, platform, mediaItems)) {
      result.push(remainingText)
      break
    }

    // Find the optimal cut point
    const cutPoint = findOptimalCutPoint(remainingText, platform, mediaItems)

    if (cutPoint <= 0) {
      // If no good cut point is found, force cut at max chars
      const forceCut = Math.max(1, maxChars - 10) // Leave some buffer
      result.push(remainingText.substring(0, forceCut))
      remainingText = remainingText.substring(forceCut).trim()
    } else {
      result.push(remainingText.substring(0, cutPoint))
      remainingText = remainingText.substring(cutPoint).trim()
    }

    // Clear media items for subsequent splits
    mediaItems = []
  }

  return result
}

// Find the optimal place to cut text to stay under max chars
function findOptimalCutPoint(text: string, platform: PlatformKey, mediaItems: MediaItem[] = []): number {
  const maxChars = PLATFORMS[platform].maxChars

  if (!exceedsCharacterLimit(text, platform, mediaItems)) {
    return text.length
  }

  // Natural break points in descending order of preference
  const naturalBreaks = [". ", "! ", "? ", "\n", ": ", "; ", ", ", " "]

  // Try each type of break point
  for (const breakChar of naturalBreaks) {
    let lastValidBreakPoint = -1
    let currentIndex = 0

    while (currentIndex < text.length) {
      currentIndex = text.indexOf(breakChar, currentIndex)
      if (currentIndex === -1) break

      // Calculate break point (include the break character except for newline)
      const breakPoint = currentIndex + (breakChar === "\n" ? 1 : breakChar.length)

      // Check if this break point keeps us under the limit
      if (!exceedsCharacterLimit(text.substring(0, breakPoint), platform, mediaItems)) {
        lastValidBreakPoint = breakPoint

        // If we're past 70% of max chars, this is a good place to break
        if (countCharactersForPlatform(text.substring(0, breakPoint), platform, mediaItems) > maxChars * 0.7) {
          return breakPoint
        }
      } else {
        // If we've exceeded the limit, use the last valid break point
        if (lastValidBreakPoint > 0) {
          return lastValidBreakPoint
        }
        // If no valid break point was found, we'll try the next type of break
        break
      }

      currentIndex = breakPoint
    }

    // If we found any valid break point with this character, use the last one
    if (lastValidBreakPoint > 0) {
      return lastValidBreakPoint
    }
  }

  // If no natural break points work, force a break at the character limit
  // Find the last space before the limit
  const lastSpace = text.lastIndexOf(" ", maxChars - 10)
  if (lastSpace > maxChars * 0.5) {
    return lastSpace + 1 // Include the space
  }

  // If all else fails, just cut at a safe character limit
  return Math.max(1, maxChars - 10) // Leave some buffer
}

// Add thread numbering and validate all posts
function validateAndNumberPosts(posts: string[], platform: PlatformKey): string[] {
  const maxChars = PLATFORMS[platform].maxChars
  const validatedPosts: string[] = []

  // First pass: ensure all posts are under the limit
  for (const post of posts) {
    if (!exceedsCharacterLimit(post, platform)) {
      validatedPosts.push(post)
    } else {
      // If a post is still over the limit, split it further
      validatedPosts.push(...splitLongSegment(post, platform))
    }
  }

  // Second pass: add thread numbering for platforms that need it
  if (validatedPosts.length > 1 && (platform === "twitter" || platform === "threads")) {
    return validatedPosts.map((post, index) => {
      // Add thread numbering (e.g., "1/5")
      const threadNumber = `${index + 1}/${validatedPosts.length} `

      // Check if adding the thread number would exceed the limit
      if (countCharactersForPlatform(threadNumber + post, platform) > maxChars) {
        // If it would, we need to trim the post content
        const trimmedPost = post.substring(0, maxChars - threadNumber.length - 3) + "..."
        return threadNumber + trimmedPost
      }

      return threadNumber + post
    })
  }

  return validatedPosts
}

// Optimize post length to reach at least 85% of the platform's character limit
function optimizePostLength(text: string, platform: PlatformKey): string {
  const maxChars = PLATFORMS[platform].maxChars
  const optimalLength = getOptimalTargetLength(maxChars)

  // If text is already at optimal length, return it as is
  if (countCharactersForPlatform(text, platform) >= optimalLength) {
    return text
  }

  // Add engagement boosters based on platform and content
  let optimizedText = text

  // Add appropriate engagement elements based on platform
  switch (platform) {
    case "twitter":
      // Add hashtags, mentions, or questions to boost engagement
      if (
        !optimizedText.includes("?") &&
        countCharactersForPlatform(optimizedText + "\n\nWhat do you think? #discussion #thoughts", platform) <= maxChars
      ) {
        optimizedText += "\n\nWhat do you think? #discussion #thoughts"
      } else if (
        !optimizedText.includes("#") &&
        countCharactersForPlatform(optimizedText + "\n\n#thread #insights #sharing", platform) <= maxChars
      ) {
        optimizedText += "\n\n#thread #insights #sharing"
      }
      break

    case "linkedin":
      // Add professional engagement prompts
      if (
        countCharactersForPlatform(
          optimizedText + "\n\nAgree or disagree? I'd love to hear your professional perspective on this.",
          platform,
        ) <= maxChars
      ) {
        optimizedText += "\n\nAgree or disagree? I'd love to hear your professional perspective on this."
      }
      break

    case "facebook":
      // Add conversational elements
      if (
        countCharactersForPlatform(
          optimizedText + "\n\nHave you experienced something similar? Share in the comments!",
          platform,
        ) <= maxChars
      ) {
        optimizedText += "\n\nHave you experienced something similar? Share in the comments!"
      }
      break

    case "reddit":
      // Add Reddit-specific formatting and engagement
      if (
        countCharactersForPlatform(
          optimizedText + "\n\n**Edit:** Thanks for reading! What's your take on this?",
          platform,
        ) <= maxChars
      ) {
        optimizedText += "\n\n**Edit:** Thanks for reading! What's your take on this?"
      }
      break

    case "threads":
    case "mastodon":
      // Add general engagement boosters
      if (
        countCharactersForPlatform(optimizedText + "\n\nThoughts? Reply with your perspective!", platform) <= maxChars
      ) {
        optimizedText += "\n\nThoughts? Reply with your perspective!"
      }
      break
  }

  return optimizedText
}

// Format text for specific platforms
export function formatForPlatform(text: string, platform: PlatformKey): string {
  switch (platform) {
    case "reddit":
      // Enhance markdown formatting for Reddit
      return (
        text
          // Convert lines that look like headings but don't have markdown
          .replace(/^([A-Z][^.!?]*[.!?])$/gm, "## $1")
          // Ensure proper spacing for lists
          .replace(/^(\s*[-*]\s)/gm, "* ")
          // Format code blocks properly
          .replace(/```(\w+)?\n([\s\S]*?)```/g, "```$1\n$2\n```")
          // Ensure proper paragraph spacing
          .replace(/\n{3,}/g, "\n\n")
      )

    case "twitter":
      // Optimize for Twitter
      return (
        text
          // Convert hashtags to proper format
          .replace(/(?:^|\s)#([a-zA-Z0-9_]+)/g, " #$1")
          // Ensure mentions are properly formatted
          .replace(/(?:^|\s)@([a-zA-Z0-9_]+)/g, " @$1")
          // Remove excessive line breaks
          .replace(/\n{3,}/g, "\n\n")
      )

    case "threads":
      // Optimize for Threads
      return (
        text
          // Similar to Twitter but with more space
          .replace(/(?:^|\s)@([a-zA-Z0-9_]+)/g, " @$1")
          .replace(/\n{3,}/g, "\n\n")
      )

    case "mastodon":
      // Optimize for Mastodon
      return (
        text
          // Format hashtags properly
          .replace(/(?:^|\s)#([a-zA-Z0-9_]+)/g, " #$1")
          // Ensure mentions include instance
          .replace(/(?:^|\s)@([a-zA-Z0-9_]+)(?!@)/g, " @$1")
          .replace(/\n{3,}/g, "\n\n")
      )

    case "linkedin":
      // Optimize for LinkedIn
      return (
        text
          // Format hashtags properly (LinkedIn prefers them without spaces)
          .replace(/(?:^|\s)#([a-zA-Z0-9_]+)/g, " #$1")
          // Ensure proper paragraph spacing for readability
          .replace(/\n{3,}/g, "\n\n")
          // Convert URLs to proper format
          .replace(/(https?:\/\/[^\s]+)/g, "$1")
          // Ensure proper spacing after punctuation
          .replace(/([.!?])([A-Za-z])/g, "$1 $2")
      )

    case "facebook":
      // Optimize for Facebook
      return (
        text
          // Format hashtags properly
          .replace(/(?:^|\s)#([a-zA-Z0-9_]+)/g, " #$1")
          // Ensure mentions are properly formatted
          .replace(/(?:^|\s)@([a-zA-Z0-9_]+)/g, " @$1")
          // Ensure proper paragraph spacing
          .replace(/\n{3,}/g, "\n\n")
          // Convert URLs to proper format
          .replace(/(https?:\/\/[^\s]+)/g, "$1")
      )

    default:
      return text
  }
}

// Detect and enhance hashtags, mentions, and URLs
export function enhanceSpecialContent(text: string): string {
  return (
    text
      // Enhance hashtags
      .replace(/(?:^|\s)#([a-zA-Z0-9_]+)/g, " #$1")
      // Enhance mentions
      .replace(/(?:^|\s)@([a-zA-Z0-9_]+)/g, " @$1")
      // Enhance URLs
      .replace(/(https?:\/\/[^\s]+)/g, "$1")
  )
}

// Apply smart formatting to text
export function applySmartFormatting(text: string, platform: PlatformKey): string {
  // First, clean up the text
  let formattedText = text
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/\n\s*\n/g, "\n\n") // Replace multiple line breaks with double line break
    .replace(/^\s+|\s+$/g, "") // Trim leading/trailing whitespace

  // Apply platform-specific formatting
  formattedText = formatForPlatform(formattedText, platform)

  // Enhance special content
  formattedText = enhanceSpecialContent(formattedText)

  return formattedText
}
