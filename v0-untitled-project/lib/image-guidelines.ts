export const IMAGE_CATEGORIES = {
  socialMedia: ["social media", "digital marketing", "smartphone", "computer", "networking"],
  contentCreation: ["writing", "typewriter", "laptop", "creativity", "desk"],
  personalBranding: ["personal brand", "professional", "portfolio", "career", "success"],
  engagement: ["community", "conversation", "discussion", "audience", "connection"],
  analytics: ["data", "analytics", "charts", "growth", "metrics"],
  productivity: ["productivity", "organization", "planning", "time management", "efficiency"],
  technology: ["technology", "innovation", "digital", "future", "code"],
  communication: ["communication", "message", "conversation", "speaking", "listening"],
}

export const IMAGE_SELECTION_GUIDELINES = {
  relevance: "Choose images that directly relate to the blog post topic",
  quality: "Select high-resolution images (minimum 1200px width)",
  diversity: "Include diverse representation in people-focused images",
  consistency: "Maintain a consistent style across blog posts",
  originality: "Avoid overused stock photos; look for unique perspectives",
  emotion: "Select images that evoke the appropriate emotion for the content",
  simplicity: "Choose images with clean backgrounds for text overlay if needed",
}

export function getRelevantImageKeywords(blogTags: string[], blogTitle: string): string[] {
  // Extract keywords from blog tags and title
  const allKeywords = [...blogTags]

  // Add keywords from title (simple extraction of nouns and adjectives)
  const titleWords = blogTitle.toLowerCase().split(/\s+/)
  allKeywords.push(...titleWords.filter((word) => word.length > 3))

  // Find matching category keywords
  const categoryKeywords: string[] = []
  Object.entries(IMAGE_CATEGORIES).forEach(([category, keywords]) => {
    if (
      allKeywords.some((keyword) =>
        keywords.some((catKeyword) => catKeyword.includes(keyword) || keyword.includes(catKeyword)),
      )
    ) {
      categoryKeywords.push(...keywords)
    }
  })

  // Combine, deduplicate and return
  return [...new Set([...allKeywords, ...categoryKeywords])].slice(0, 10)
}
