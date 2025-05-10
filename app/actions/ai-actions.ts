"use server"

import { suggestHashtags, generateEngagementBoosters } from "@/lib/huggingface-service"
import type { PlatformKey } from "@/lib/constants"

// Platform-specific hashtags for fallback
const PLATFORM_HASHTAGS: Record<PlatformKey, string[]> = {
  twitter: ["twitterpost", "tweetoftheday", "twittercommunity"],
  threads: ["threadsapp", "threadspost", "threadscommunity"],
  linkedin: ["linkedin", "networking", "professional", "career"],
  facebook: ["facebook", "fbcommunity", "facebookpost"],
  reddit: ["reddit", "subreddit", "redditcommunity"],
  mastodon: ["mastodon", "fediverse", "mastodontips"],
}

// Platform-specific engagement templates
const PLATFORM_ENGAGEMENT: Record<PlatformKey, string[]> = {
  twitter: [
    "RT if you found this helpful!",
    "Share this thread with someone who needs to see it!",
    "What's your experience with this? Tweet your reply!",
  ],
  threads: [
    "Drop a ❤️ if this was helpful!",
    "Share your experience in the replies!",
    "Tag someone who should read this thread!",
  ],
  linkedin: [
    "What has been your professional experience with this?",
    "Have you implemented this in your workplace? How did it go?",
    "Tag a colleague who might find this valuable!",
  ],
  facebook: [
    "Share this with your friends who might need this!",
    "Has anyone in your network tried this approach?",
    "Leave a comment with your experience!",
  ],
  reddit: [
    "Upvote if you found this useful!",
    "What's been your experience with this? Share in the comments.",
    "Any tips or suggestions to add to this?",
  ],
  mastodon: [
    "Boost if you found this helpful!",
    "What's your take on this? Reply with your thoughts!",
    "Share your experience with the fediverse!",
  ],
}

// Generic engagement boosters
const GENERIC_BOOSTERS = [
  "What do you think about this? Share your thoughts!",
  "Have you experienced this before? Let me know in the replies!",
  "What would you add to this list? I'd love to hear your ideas.",
  "Do you agree with these points? Why or why not?",
  "What's your biggest takeaway from this?",
  "Tag someone who needs to see this!",
  "Save this post if you found it helpful!",
  "Which point resonated with you the most?",
]

export async function getHashtagSuggestions(text: string) {
  try {
    console.log(`Generating hashtag suggestions for text of length: ${text.length}`)
    const hashtags = await suggestHashtags(text)
    console.log(`Generated ${hashtags.length} hashtags`)
    return hashtags
  } catch (error) {
    console.error("Server action error generating hashtags:", error)
    // Provide a more robust fallback with varied hashtags
    return generateFallbackHashtags(text)
  }
}

export async function getEngagementBoosters(text: string) {
  try {
    console.log(`Generating engagement boosters for text of length: ${text.length}`)
    const boosters = await generateEngagementBoosters(text)
    console.log(`Generated ${boosters.length} engagement boosters`)
    return boosters
  } catch (error) {
    console.error("Server action error generating engagement boosters:", error)
    return generateFallbackEngagementBoosters(text)
  }
}

// Enhanced function to generate platform-specific hashtags by platform
export async function getPlatformSpecificHashtags(text: string, platform: PlatformKey) {
  try {
    console.log(`Generating platform-specific hashtags for ${platform}`)
    // Start with general hashtags
    const hashtags = await getHashtagSuggestions(text)

    // Add 2-3 platform-specific tags
    const specificTags = (PLATFORM_HASHTAGS[platform] || []).slice(0, 3)

    // Combine and remove duplicates
    return [...new Set([...hashtags, ...specificTags])].slice(0, 12)
  } catch (error) {
    console.error(`Error generating platform-specific hashtags for ${platform}:`, error)
    return generateFallbackHashtags(text, platform)
  }
}

// Enhanced function to generate engagement boosters for a specific platform
export async function getPlatformEngagementBoosters(text: string, platform: PlatformKey) {
  try {
    console.log(`Generating platform-specific engagement boosters for ${platform}`)

    // Get general engagement boosters
    const boosters = await getEngagementBoosters(text)

    // Customize for the platform
    return boosters.map((booster) => {
      if (platform === "twitter" && !booster.toLowerCase().includes("retweet")) {
        return booster + " RT if you agree!"
      }
      if (platform === "linkedin" && !booster.toLowerCase().includes("profession")) {
        return booster + " What has been your professional experience with this?"
      }
      if (platform === "facebook" && !booster.toLowerCase().includes("share")) {
        return booster + " Share with someone who needs to see this!"
      }
      return booster
    })
  } catch (error) {
    console.error(`Error generating platform engagement boosters for ${platform}:`, error)
    return generateFallbackEngagementBoosters(text, platform)
  }
}

// Client-side fallback for hashtag generation
function generateFallbackHashtags(text: string, platform?: PlatformKey): string[] {
  // Extract potential keywords from the text
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter((word) => !["this", "that", "with", "from", "have", "what", "when", "where", "which"].includes(word))

  // Get unique words and sort by length (longer words might be more relevant)
  const uniqueWords = [...new Set(words)].sort((a, b) => b.length - a.length).slice(0, 5)

  // General hashtags that work for most content
  const generalTags = ["social", "content", "post", "share", "trending", "update", "news"]

  // Combine unique words from text with general tags
  let result = [...uniqueWords, ...generalTags]

  // Add platform-specific tags if platform is provided
  if (platform && PLATFORM_HASHTAGS[platform]) {
    result = [...result, ...PLATFORM_HASHTAGS[platform]]
  }

  // Remove duplicates, limit to 10 tags
  return [...new Set(result)].slice(0, 10)
}

// Client-side fallback for engagement booster generation
function generateFallbackEngagementBoosters(text: string, platform?: PlatformKey): string[] {
  // Select 3 generic boosters
  const selected = GENERIC_BOOSTERS.sort(() => 0.5 - Math.random()).slice(0, 3)

  // Add 1-2 platform-specific boosters if platform is provided
  if (platform && PLATFORM_ENGAGEMENT[platform]) {
    const platformSpecific = PLATFORM_ENGAGEMENT[platform].sort(() => 0.5 - Math.random()).slice(0, 2)
    return [...platformSpecific, ...selected].slice(0, 3)
  }

  return selected
}
