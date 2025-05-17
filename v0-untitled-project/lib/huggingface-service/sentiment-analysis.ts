import type { ToneAnalysisResult } from "./types"

/**
 * Local sentiment analysis
 */
export function analyzeLocalSentiment(text: string): {
  sentiment: ToneAnalysisResult["sentiment"]
  scores: ToneAnalysisResult["scores"]
} {
  // Enhanced keyword-based sentiment analysis
  const positiveWords = [
    "good",
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "terrific",
    "outstanding",
    "superb",
    "brilliant",
    "awesome",
    "happy",
    "joy",
    "love",
    "like",
    "best",
    "better",
    "positive",
    "beautiful",
    "perfect",
    "nice",
    "thank",
    "thanks",
    "appreciate",
    "excited",
    "impressive",
    "success",
    "successful",
    "win",
    "winning",
    "won",
    "achieve",
    "achievement",
    "accomplished",
    "proud",
    "delighted",
    "pleased",
    "satisfied",
    "enjoy",
    "enjoyed",
    "helpful",
    "beneficial",
    "valuable",
    "worth",
    "worthy",
    "recommend",
    "recommended",
    "favorite",
    "favourite",
    "glad",
    "thrilled",
    "exceptional",
    "ideal",
    "impressive",
    "remarkable",
    "marvelous",
    "splendid",
    "pleasant",
    "satisfying",
    "gratifying",
    "rewarding",
  ]

  const negativeWords = [
    "bad",
    "terrible",
    "horrible",
    "awful",
    "poor",
    "worst",
    "worse",
    "negative",
    "hate",
    "dislike",
    "disappointing",
    "disappointed",
    "unfortunate",
    "sad",
    "unhappy",
    "angry",
    "annoyed",
    "annoying",
    "problem",
    "issue",
    "fail",
    "failed",
    "failure",
    "wrong",
    "error",
    "difficult",
    "hard",
    "trouble",
    "frustrating",
    "frustrated",
    "upset",
    "worried",
    "concern",
    "concerned",
    "sorry",
    "regret",
    "regretful",
    "mistake",
    "mistaken",
    "fault",
    "fear",
    "afraid",
    "scary",
    "scared",
    "terrible",
    "terribly",
    "horrible",
    "horribly",
    "awful",
    "awfully",
    "dreadful",
    "badly",
    "severe",
    "serious",
    "critical",
    "harmful",
    "damage",
    "damaging",
    "hurt",
    "painful",
    "suffer",
    "suffering",
    "miserable",
  ]

  // Negation words that flip sentiment
  const negationWords = [
    "not",
    "no",
    "never",
    "neither",
    "nor",
    "none",
    "isn't",
    "aren't",
    "wasn't",
    "weren't",
    "haven't",
    "hasn't",
    "hadn't",
    "doesn't",
    "don't",
    "didn't",
    "won't",
    "wouldn't",
    "can't",
    "cannot",
    "couldn't",
    "shouldn't",
  ]

  // Intensifiers that strengthen sentiment
  const intensifiers = [
    "very",
    "really",
    "extremely",
    "absolutely",
    "completely",
    "totally",
    "utterly",
    "highly",
    "incredibly",
    "exceedingly",
    "exceptionally",
    "especially",
    "particularly",
    "remarkably",
    "truly",
    "undoubtedly",
    "unquestionably",
    "definitely",
    "certainly",
    "indeed",
  ]

  const words = text.toLowerCase().split(/\s+/)
  let positiveCount = 0
  let negativeCount = 0
  let neutralCount = 0
  const totalWords = words.length

  // Process text with context awareness
  for (let i = 0; i < words.length; i++) {
    // Remove punctuation
    const cleanWord = words[i].replace(/[^\w\s]/gi, "")

    // Skip empty words
    if (!cleanWord) continue

    // Check for negation in the previous 3 words
    let isNegated = false
    for (let j = Math.max(0, i - 3); j < i; j++) {
      if (negationWords.includes(words[j].replace(/[^\w\s]/gi, ""))) {
        isNegated = true
        break
      }
    }

    // Check for intensifiers in the previous word
    let intensifierMultiplier = 1
    if (i > 0 && intensifiers.includes(words[i - 1].replace(/[^\w\s]/gi, ""))) {
      intensifierMultiplier = 1.5
    }

    // Calculate sentiment with context
    if (positiveWords.includes(cleanWord)) {
      if (isNegated) {
        negativeCount += 1 * intensifierMultiplier
      } else {
        positiveCount += 1 * intensifierMultiplier
      }
    } else if (negativeWords.includes(cleanWord)) {
      if (isNegated) {
        positiveCount += 0.5 * intensifierMultiplier // Negated negative is less positive than explicitly positive
      } else {
        negativeCount += 1 * intensifierMultiplier
      }
    } else {
      neutralCount += 1
    }
  }

  // Calculate scores
  const total = positiveCount + negativeCount + neutralCount || 1 // Avoid division by zero

  // Normalize scores to sum to 1
  const scores = {
    positive: positiveCount / total,
    negative: negativeCount / total,
    neutral: neutralCount / total,
  }

  // Determine sentiment
  let sentiment: ToneAnalysisResult["sentiment"]

  // Adjust thresholds for better accuracy
  if (scores.positive > 0.25 && scores.positive > scores.negative * 1.5) {
    sentiment = "positive"
  } else if (scores.negative > 0.25 && scores.negative > scores.positive * 1.5) {
    sentiment = "negative"
  } else if (scores.positive > 0.15 && scores.negative > 0.15) {
    sentiment = "mixed"
  } else {
    sentiment = "neutral"
  }

  return { sentiment, scores }
}
