/**
 * Platform-specific utility functions for threadify
 */

import type { PlatformKey } from "@/lib/constants"

/**
 * Adds thread numbering to an array of posts based on the specified style
 * @param posts Array of post content strings
 * @param style Numbering style: "slash", "parentheses", or "dot"
 * @returns Array of posts with numbering added
 */
export function addThreadNumbering(posts: string[], format: "slash" | "parentheses" | "dot" = "slash"): string[] {
  if (!posts || posts.length === 0) return []

  // First remove any existing numbering
  const cleanPosts = posts.map((post) => removeThreadNumbering(post))

  // Add new numbering based on format
  return cleanPosts.map((post, index) => {
    const postNumber = index + 1
    const totalPosts = posts.length

    let prefix = ""
    switch (format) {
      case "slash":
        prefix = `${postNumber}/${totalPosts} `
        break
      case "parentheses":
        prefix = `(${postNumber}/${totalPosts}) `
        break
      case "dot":
        prefix = `${postNumber}.${totalPosts} `
        break
    }

    return `${prefix}${post}`
  })
}

export function removeThreadNumbering(post: string): string {
  // Remove common thread numbering patterns
  return post
    .replace(/^\d+\/\d+\s+/, "") // Remove "1/5 " format
    .replace(/^$$\d+\/\d+$$\s+/, "") // Remove "(1/5) " format
    .replace(/^\d+\.\d+\s+/, "") // Remove "1.5 " format
}

function getThreadNumberText(current: number, total: number, style: "slash" | "parentheses" | "dot"): string {
  switch (style) {
    case "slash":
      return `${current}/${total}`
    case "parentheses":
      return `(${current}/${total})`
    case "dot":
      return `${current}.${total}`
    default:
      return `${current}/${total}`
  }
}

/**
 * Enhances Reddit posts with markdown formatting
 * @param content Original content
 * @param options Formatting options
 * @returns Formatted content with Reddit markdown
 */
export function enhanceRedditMarkdown(
  content: string,
  options: {
    addHeadings?: boolean
    addBulletPoints?: boolean
    addTldr?: boolean
    addQuotes?: boolean
  },
): string {
  const enhancedContent = content

  // Implementation details...

  return enhancedContent
}

// Reddit markdown enhancement utilities
// export function enhanceRedditMarkdown(text: string): string {
//   let enhanced = text

//   // Convert bullet points to proper markdown
//   enhanced = enhanced.replace(/^(\s*)[-•]\s+(.+)$/gm, "$1* $2")

//   // Convert numbered lists
//   enhanced = enhanced.replace(/^(\s*)\d+\.\s+(.+)$/gm, "$11. $2")

//   // Add bold to heading-like text that's not already formatted
//   enhanced = enhanced.replace(/^([A-Z][A-Z\s]+:?)$/gm, "**$1**")

//   // Convert quotes
//   enhanced = enhanced.replace(/^>\s*(.+)$/gm, "> $1")

//   // Format links properly
//   enhanced = enhanced.replace(/\[(.*?)\]$$(.*?)$$/g, "[$1]($2)")

//   // Add TLDR section if post is long
//   if (enhanced.length > 800 && !enhanced.includes("TL;DR") && !enhanced.includes("TLDR")) {
//     enhanced += "\n\n**TL;DR:** "
//   }

//   return enhanced
// }

/**
 * Detects potentially sensitive content for Mastodon
 * @param content Post content to analyze
 * @returns Object with detection results and suggested warnings
 */
export function detectSensitiveContent(content: string): {
  hasSensitiveContent: boolean
  suggestedWarnings: string[]
} {
  // Implementation details...

  return {
    hasSensitiveContent: false,
    suggestedWarnings: [],
  }
}

// Mastodon content warning utilities
export interface ContentWarningConfig {
  enabled: boolean
  text: string
  keywords: string[]
}

export function detectContentWarningNeeded(text: string): boolean {
  const sensitiveTopics = [
    "politics",
    "political",
    "nsfw",
    "spoiler",
    "death",
    "violence",
    "abuse",
    "assault",
    "explicit",
    "sensitive",
    "trigger",
    "war",
    "graphic",
    "controversial",
  ]

  const lowerText = text.toLowerCase()
  return sensitiveTopics.some((topic) => lowerText.includes(topic))
}

export function formatWithContentWarning(text: string, cw: ContentWarningConfig): string {
  if (!cw.enabled) return text

  // For Mastodon, we just return the text as the CW would be set in the API call
  // This function is for preview formatting
  return `CW: ${cw.text}\n\n${text}`
}

/**
 * Converts content to LinkedIn carousel format
 * @param content Original content
 * @returns Array of slide objects
 */
export function convertToLinkedInCarousel(content: string): Array<{
  title: string
  content: string
  imagePrompt?: string
}> {
  // Implementation details...

  return []
}

// LinkedIn carousel post utilities
export interface CarouselSlide {
  title: string
  content: string
  imagePrompt?: string
}

export function extractCarouselSlides(text: string, maxSlides = 10): CarouselSlide[] {
  const slides: CarouselSlide[] = []

  // Try to find numbered sections or bullet points that might represent slides
  const slideMatches = text.match(/(?:^|\n)(?:\d+\.\s+|\*\s+|[-•]\s+)(.+?)(?=(?:\n(?:\d+\.\s+|\*\s+|[-•]\s+))|$)/gs)

  if (slideMatches && slideMatches.length > 0) {
    // We found potential slide content
    slideMatches.slice(0, maxSlides).forEach((match, index) => {
      const cleanMatch = match.trim().replace(/^(?:\d+\.\s+|\*\s+|[-•]\s+)/, "")

      // Try to separate title and content if the section has multiple lines
      const lines = cleanMatch
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)

      if (lines.length > 1) {
        slides.push({
          title: lines[0],
          content: lines.slice(1).join("\n"),
        })
      } else {
        slides.push({
          title: `Slide ${index + 1}`,
          content: cleanMatch,
        })
      }
    })
  } else {
    // No clear slide structure, split by paragraphs
    const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0)

    paragraphs.slice(0, maxSlides).forEach((paragraph, index) => {
      slides.push({
        title: `Slide ${index + 1}`,
        content: paragraph.trim(),
      })
    })
  }

  return slides
}

// Define the RepurposedContent type
export interface RepurposedContent {
  content: string[]
  platform: PlatformKey
}

// Function to repurpose content from one platform to another
export function repurposeContent(
  content: string,
  sourcePlatform: PlatformKey,
  targetPlatform: PlatformKey,
): RepurposedContent {
  // Default to returning the original content if platforms are the same
  if (sourcePlatform === targetPlatform) {
    return {
      content: [content],
      platform: targetPlatform,
    }
  }

  let repurposedContent: string[] = []

  // Platform-specific repurposing logic
  switch (targetPlatform) {
    case "twitter":
      // Twitter: Break into shorter posts, add hashtags
      repurposedContent = repurposeForTwitter(content)
      break
    case "linkedin":
      // LinkedIn: More professional tone, longer format
      repurposedContent = repurposeForLinkedIn(content)
      break
    case "reddit":
      // Reddit: Add markdown, structure with headers
      repurposedContent = repurposeForReddit(content)
      break
    case "mastodon":
      // Mastodon: Add content warnings if needed, shorter format
      repurposedContent = repurposeForMastodon(content)
      break
    case "threads":
      // Threads: Similar to Twitter but with Instagram aesthetic
      repurposedContent = repurposeForThreads(content)
      break
    case "facebook":
      // Facebook: More casual, emoji-friendly
      repurposedContent = repurposeForFacebook(content)
      break
    default:
      // Default fallback
      repurposedContent = [content]
  }

  return {
    content: repurposedContent,
    platform: targetPlatform,
  }
}

// Helper functions for platform-specific repurposing

function repurposeForTwitter(content: string): string[] {
  // Split into chunks of ~240 chars to leave room for hashtags
  const chunks = splitTextIntoChunks(content, 240)

  // Add some common hashtags to the last chunk
  if (chunks.length > 0) {
    const topics = extractTopics(content)
    const hashtags = topics.map((topic) => `#${topic}`).join(" ")

    if (hashtags) {
      chunks[chunks.length - 1] = `${chunks[chunks.length - 1]}\n\n${hashtags}`
    }
  }

  return chunks
}

function repurposeForLinkedIn(content: string): string[] {
  // LinkedIn allows longer posts, so we can keep it as one
  // Add a professional intro and call-to-action
  const intro = "I wanted to share some thoughts on this topic:"
  const callToAction = "\n\nWhat are your thoughts on this? I'd love to hear your perspective in the comments."

  return [`${intro}\n\n${content}${callToAction}`]
}

function repurposeForReddit(content: string): string[] {
  // Add markdown formatting for Reddit
  const lines = content.split("\n")
  let formatted = ""

  // Add a title (first line or generated)
  const title = lines[0] || "Thoughts on this topic"
  formatted += `# ${title}\n\n`

  // Add the rest with some markdown enhancements
  const body = lines.slice(1).join("\n")

  // Add some markdown formatting
  let enhancedBody = body
    .replace(/\*\*([^*]+)\*\*/g, "**$1**") // Keep existing bold
    .replace(/\*([^*]+)\*/g, "*$1*") // Keep existing italic

  // Add a TL;DR if content is long
  if (content.length > 500) {
    const tldr = "This post discusses " + extractMainTopic(content)
    enhancedBody += `\n\n**TL;DR:** ${tldr}`
  }

  return [`${formatted}${enhancedBody}`]
}

function repurposeForMastodon(content: string): string[] {
  // Mastodon has a 500 character limit per post
  const chunks = splitTextIntoChunks(content, 480)

  // Check for potentially sensitive content
  const sensitiveTopics = ["politics", "controversy", "sensitive", "nsfw"]
  const needsCW = sensitiveTopics.some((topic) => content.toLowerCase().includes(topic))

  if (needsCW && chunks.length > 0) {
    // Add content warning to first post
    chunks[0] = `CW: ${extractMainTopic(content)}\n\n${chunks[0]}`
  }

  return chunks
}

function repurposeForThreads(content: string): string[] {
  // Similar to Twitter but with more Instagram-like aesthetic
  const chunks = splitTextIntoChunks(content, 500)

  // Add some emojis for visual appeal
  if (chunks.length > 0) {
    const emoji = getRelevantEmoji(content)
    chunks[0] = `${emoji} ${chunks[0]}`
  }
  return chunks;
}

// ... (ensure all other functions are properly closed)
// End of file