import { type PlatformKey, PLATFORMS } from "./constants"
import type { MediaItem } from "../components/media-uploader"

// Platform-specific character counting rules
export function countCharactersForPlatform(text: string, platform: PlatformKey, mediaItems: MediaItem[] = []): number {
  switch (platform) {
    case "twitter":
      return countTwitterCharacters(text, mediaItems)
    case "threads":
      return countThreadsCharacters(text, mediaItems)
    case "linkedin":
      return countLinkedInCharacters(text, mediaItems)
    case "reddit":
      return countRedditCharacters(text)
    case "mastodon":
      return countMastodonCharacters(text, mediaItems)
    case "facebook":
      return countFacebookCharacters(text, mediaItems)
    default:
      return text.length
  }
}

// Twitter counts URLs as fixed length (23 chars) and has special rules for media
function countTwitterCharacters(text: string, mediaItems: MediaItem[] = []): number {
  // Replace URLs with 23 character placeholders (Twitter's t.co shortener length)
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const textWithoutUrls = text.replace(urlRegex, "X".repeat(23))

  // Count base text length
  let count = textWithoutUrls.length

  // Add characters for media attachments (Twitter counts all media as 23 chars)
  if (mediaItems.length > 0) {
    // Twitter only counts media once, not per item
    count += 23
  }

  return count
}

// Instagram has different character limits for captions
function countThreadsCharacters(text: string, mediaItems: MediaItem[] = []): number {
  // Threads has similar URL handling to Twitter
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const textWithoutUrls = text.replace(urlRegex, "X".repeat(23))

  return textWithoutUrls.length
}

// LinkedIn has specific handling for mentions and hashtags
function countLinkedInCharacters(text: string, mediaItems: MediaItem[] = []): number {
  // LinkedIn counts all characters including URLs
  return text.length
}

// Reddit has markdown which affects display but not character count
function countRedditCharacters(text: string): number {
  // Reddit counts all characters including markdown
  return text.length
}

// Mastodon has content warnings that affect character count
function countMastodonCharacters(text: string, mediaItems: MediaItem[] = []): number {
  // Mastodon counts all characters including URLs
  return text.length
}

// Facebook has very large character limits
function countFacebookCharacters(text: string, mediaItems: MediaItem[] = []): number {
  // Facebook counts all characters
  return text.length
}

// Check if a post exceeds the platform's character limit
export function exceedsCharacterLimit(text: string, platform: PlatformKey, mediaItems: MediaItem[] = []): boolean {
  const count = countCharactersForPlatform(text, platform, mediaItems)
  const maxChars = PLATFORMS[platform].maxChars
  return count > maxChars
}

// Get the remaining characters for a platform
export function getRemainingCharacters(text: string, platform: PlatformKey, mediaItems: MediaItem[] = []): number {
  const count = countCharactersForPlatform(text, platform, mediaItems)
  const maxChars = PLATFORMS[platform].maxChars
  return maxChars - count
}

// Get character count status (for styling)
export function getCharacterCountStatus(
  text: string,
  platform: PlatformKey,
  mediaItems: MediaItem[] = [],
): "success" | "warning" | "error" {
  const count = countCharactersForPlatform(text, platform, mediaItems)
  const maxChars = PLATFORMS[platform].maxChars

  if (count > maxChars) {
    return "error"
  }
  if (count > maxChars * 0.9) {
    return "warning"
  }
  return "success"
}
