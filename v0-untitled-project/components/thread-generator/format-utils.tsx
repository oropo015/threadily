import { type PlatformKey, PLATFORMS } from "@/lib/constants"
import { toast } from "@/hooks/use-toast"
import { applySmartFormatting } from "@/lib/text-processor"

/**
 * Generates formatting tips based on text content and platform
 */
export const generateFormatTips = (text: string | undefined, platform: PlatformKey, maxChars: number): string[] => {
  if (text === undefined) return []

  const tips: string[] = []

  if (text.length > 0) {
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
  }

  return tips
}

/**
 * Formats text for a specific platform
 */
export const formatTextForPlatform = (
  text: string | undefined,
  platform: PlatformKey,
  setText: (text: string) => void,
): void => {
  if (text === undefined) return

  // Use our smart formatting function
  const formattedText = applySmartFormatting(text, platform)
  setText(formattedText)

  toast({
    title: "Smart formatting applied",
    description: `Text optimized for ${PLATFORMS[platform].name}`,
  })
}

/**
 * Gets the platform badge color based on the platform
 */
export const getPlatformBadgeColor = (platform: PlatformKey): string => {
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
}

/**
 * Gets the character count color based on the count and max chars
 */
export const getCharacterCountColor = (characterCount: number, maxChars: number): string => {
  if (characterCount === 0) return "text-gray-400"
  if (characterCount <= maxChars * 0.75) return "text-green-500"
  if (characterCount <= maxChars) return "text-yellow-500"
  return "text-blue-500" // Changed from red to blue to be less alarming
}

/**
 * Gets the progress value for the character counter
 */
export const getProgressValue = (characterCount: number, maxChars: number): number => {
  // No longer capping at 100%
  return (characterCount / maxChars) * 100
}

/**
 * Gets the progress color based on the character count
 */
export const getProgressColor = (characterCount: number, maxChars: number): string => {
  if (characterCount === 0) return "bg-gray-200 dark:bg-gray-700"
  if (characterCount <= maxChars * 0.75) return "bg-green-500"
  if (characterCount <= maxChars) return "bg-yellow-500"
  return "bg-red-500"
}

/**
 * Formats a post for a specific platform
 */
export const formatPostForPlatform = (post: string, platform: PlatformKey): string => {
  // Apply platform-specific formatting to the post
  return applySmartFormatting(post, platform)
}
