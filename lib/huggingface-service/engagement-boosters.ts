import { extractHashtags } from "./hashtag-extraction"

/**
 * Generate engagement boosters locally
 */
export function generateEngagementBoosters(text: string): string[] {
  // Extract keywords from the text
  const keywords = extractHashtags(text).slice(0, 3)

  // Generate generic engagement boosters based on keywords
  const boosters = []

  if (keywords.length > 0) {
    boosters.push(`What are your thoughts on ${keywords[0]}? Share your experience in the comments!`)
  }

  if (keywords.length > 1) {
    boosters.push(`Have you tried using ${keywords[1]} before? I'd love to hear your results!`)
  }

  boosters.push("What would you add to this thread? Let me know in the replies!")

  // Add some generic boosters that work for any content
  const genericBoosters = [
    "What do you think about this? Share your thoughts!",
    "Have you experienced this before? Let me know in the replies!",
    "What would you add to this list? I'd love to hear your ideas.",
    "Do you agree with these points? Why or why not?",
    "What's your biggest takeaway from this thread?",
    "Tag someone who needs to see this!",
    "Save this post if you found it helpful!",
    "Which point resonated with you the most?",
    "Would you like to see more content like this?",
    "What questions do you have about this topic?",
    "How has this information changed your perspective?",
    "What's been your experience with this?",
    "Drop a 👍 if you found this helpful!",
    "What other topics would you like me to cover?",
  ]

  // Add generic boosters until we have at least 3
  while (boosters.length < 3) {
    const randomIndex = Math.floor(Math.random() * genericBoosters.length)
    const booster = genericBoosters[randomIndex]

    // Avoid duplicates
    if (!boosters.includes(booster)) {
      boosters.push(booster)
    }

    // Remove the used booster to avoid checking it again
    genericBoosters.splice(randomIndex, 1)

    // Break if we've used all generic boosters
    if (genericBoosters.length === 0) break
  }

  return boosters
}
