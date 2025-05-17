/**
 * Extract hashtags using simple NLP techniques
 */
export function extractHashtags(text: string): string[] {
  // Basic keyword extraction using common patterns
  // 1. Extract words
  // 2. Remove stop words
  // 3. Take most frequent/relevant words
  const words = text.toLowerCase().split(/\s+/)

  // Common stop words to filter out
  const stopWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "in",
    "on",
    "at",
    "to",
    "for",
    "with",
    "by",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "from",
    "up",
    "down",
    "of",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
    "i",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "would",
    "could",
    "should",
    "ought",
    "i'm",
    "you're",
    "he's",
    "she's",
    "it's",
    "we're",
    "they're",
    "i've",
    "you've",
    "we've",
    "they've",
    "i'd",
    "you'd",
    "he'd",
    "she'd",
    "we'd",
    "they'd",
    "i'll",
    "you'll",
    "he'll",
    "she'll",
    "we'll",
    "they'll",
    "isn't",
    "aren't",
    "wasn't",
    "weren't",
    "hasn't",
    "haven't",
    "hadn't",
    "doesn't",
    "don't",
    "didn't",
    "won't",
    "wouldn't",
    "shan't",
    "shouldn't",
    "can't",
    "cannot",
    "couldn't",
    "mustn't",
    "let's",
    "that's",
    "who's",
    "what's",
    "here's",
    "there's",
    "when's",
    "where's",
    "why's",
    "how's",
    "rt",
  ])

  // Count word frequency excluding stop words
  const wordCounts: Record<string, number> = {}
  words.forEach((word) => {
    // Remove punctuation and non-alphanumeric characters
    word = word.replace(/[^\w\s]/gi, "")

    // Only count words longer than 2 characters and not in stop words list
    if (word.length > 2 && !stopWords.has(word)) {
      if (wordCounts[word]) {
        wordCounts[word]++
      } else {
        wordCounts[word] = 1
      }
    }
  })

  // Convert to array and sort by frequency
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 10)

  // Check for existing hashtags in the text
  const textLower = text.toLowerCase()
  const hashtagRegex = /#(\w+)/g
  const existingHashtags = [...textLower.matchAll(hashtagRegex)].map((match) => match[1])

  // If we have existing hashtags, use them
  if (existingHashtags.length > 0) {
    return [...new Set([...existingHashtags, ...sortedWords])].slice(0, 10)
  }

  return sortedWords
}
