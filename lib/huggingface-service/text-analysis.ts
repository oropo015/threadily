import type { ToneAnalysisResult } from "./types"

/**
 * Analyze readability of text
 */
export function analyzeReadability(text: string): ToneAnalysisResult["readability"] {
  // Simple readability analysis based on sentence and word length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  if (sentences.length === 0) return "average"

  const words = text.split(/\s+/).filter((w) => w.length > 0)
  if (words.length === 0) return "average"

  // Average words per sentence
  const avgWordsPerSentence = words.length / sentences.length

  // Average word length
  const totalCharacters = words.reduce((sum, word) => sum + word.length, 0)
  const avgWordLength = totalCharacters / words.length

  // Calculate readability
  if (avgWordsPerSentence > 20 || avgWordLength > 6) {
    return "complex"
  } else if (avgWordsPerSentence < 10 && avgWordLength < 4.5) {
    return "simple"
  } else {
    return "average"
  }
}

/**
 * Detect formality level of text
 */
export function detectFormality(text: string): ToneAnalysisResult["formality"] {
  // Indicators of formal language
  const formalIndicators = [
    "therefore",
    "however",
    "furthermore",
    "consequently",
    "nevertheless",
    "regarding",
    "concerning",
    "additionally",
    "thus",
    "hence",
    "moreover",
    "accordingly",
    "subsequently",
    "previously",
    "hitherto",
    "hereby",
    "therein",
    "thereupon",
    "thereafter",
    "herewith",
    "wherein",
    "whereby",
    "hereto",
    "hereof",
    "pursuant",
    "whilst",
    "notwithstanding",
    "albeit",
    "insofar",
    "aforementioned",
  ]

  // Indicators of casual language
  const casualIndicators = [
    "yeah",
    "nope",
    "cool",
    "awesome",
    "btw",
    "lol",
    "omg",
    "gonna",
    "wanna",
    "gotta",
    "kinda",
    "sorta",
    "y'all",
    "yep",
    "nah",
    "dude",
    "bro",
    "guy",
    "guys",
    "stuff",
    "thing",
    "things",
    "cuz",
    "cause",
    "dunno",
    "gimme",
    "lemme",
    "gotcha",
    "ya",
    "yall",
    "ain't",
    "sup",
    "wassup",
    "tbh",
    "imo",
    "imho",
    "fyi",
    "asap",
  ]

  const words = text.toLowerCase().split(/\s+/)
  let formalCount = 0
  let casualCount = 0

  // Count contractions (casual)
  const contractions = text.match(/\b\w+'(s|t|re|ve|ll|d|m)\b/gi) || []
  casualCount += contractions.length

  // Count exclamation marks (casual)
  const exclamations = text.match(/!/g) || []
  casualCount += exclamations.length * 1.5 // Weight exclamations more heavily

  // Count emoji (casual)
  const emoji = text.match(/[\p{Emoji}]/gu) || []
  casualCount += emoji.length * 2 // Weight emoji more heavily

  // Count formal and casual indicators
  words.forEach((word) => {
    // Remove punctuation
    const cleanWord = word.replace(/[^\w\s]/gi, "")
    if (formalIndicators.includes(cleanWord)) formalCount += 1.5 // Weight formal indicators more heavily
    if (casualIndicators.includes(cleanWord)) casualCount += 1.5 // Weight casual indicators more heavily
  })

  // Check for first person singular (casual) vs plural (more formal)
  const firstPersonSingular = text.match(/\b(i|i'm|i'll|i've|i'd)\b/gi) || []
  const firstPersonPlural = text.match(/\b(we|we're|we'll|we've|we'd)\b/gi) || []

  casualCount += firstPersonSingular.length * 0.5
  formalCount += firstPersonPlural.length * 0.5

  // Check for passive voice (formal)
  const passiveVoice = text.match(/\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi) || []
  formalCount += passiveVoice.length

  // Calculate formality score
  const totalIndicators = formalCount + casualCount

  // If very few indicators, default to neutral
  if (totalIndicators < 3) {
    return "neutral"
  }

  // Calculate formality
  if (formalCount > casualCount * 1.5) return "formal"
  if (casualCount > formalCount * 1.5) return "casual"
  return "neutral"
}
