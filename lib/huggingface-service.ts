// Types for tone analysis
export type ToneAnalysisResult = {
  sentiment: "positive" | "negative" | "neutral" | "mixed"
  scores: {
    positive: number
    negative: number
    neutral: number
  }
  confidence: number
  dominantEmotion?: string
  emotions?: Record<string, number>
  formality?: "formal" | "neutral" | "casual"
  readability?: "simple" | "average" | "complex"
  suggestions?: ToneSuggestion[]
}

export type ToneSuggestion = {
  type: "sentiment" | "formality" | "emotion" | "structure" | "engagement"
  issue: string
  suggestion: string
  example?: string
}

export type TextGenerationResponse = {
  generated_text: string
}[]

// ===== SENTIMENT ANALYSIS MODULE =====

/**
 * Local sentiment analysis
 */
function analyzeLocalSentiment(text: string): {
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

// ===== EMOTION ANALYSIS MODULE =====

/**
 * Local emotion analysis
 */
function analyzeLocalEmotions(text: string): Record<string, number> {
  const emotions: Record<string, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    disgust: 0,
  }

  // Emotion keywords
  const emotionKeywords: Record<string, string[]> = {
    joy: [
      "happy",
      "happiness",
      "joy",
      "joyful",
      "delighted",
      "pleased",
      "glad",
      "cheerful",
      "content",
      "satisfied",
      "elated",
      "thrilled",
      "excited",
      "ecstatic",
      "merry",
      "jubilant",
      "enjoy",
      "enjoying",
      "enjoyed",
      "love",
      "loving",
      "loved",
      "adore",
      "adoring",
      "adored",
      "like",
      "liking",
      "liked",
      "celebrate",
      "celebrating",
      "celebrated",
      "celebration",
      "congratulations",
      "congrats",
      "proud",
      "pride",
      "laugh",
      "laughing",
      "laughed",
      "smile",
      "smiling",
      "smiled",
      "grin",
      "grinning",
      "grinned",
      "haha",
      "lol",
      "rofl",
      "lmao",
      "amused",
      "amusement",
      "fun",
      "funny",
      "hilarious",
      "humor",
      "humorous",
    ],
    sadness: [
      "sad",
      "sadness",
      "unhappy",
      "depressed",
      "depression",
      "depressing",
      "miserable",
      "misery",
      "sorrow",
      "sorrowful",
      "grief",
      "grieving",
      "grieved",
      "mourn",
      "mourning",
      "mourned",
      "cry",
      "crying",
      "cried",
      "tears",
      "tearful",
      "weep",
      "weeping",
      "wept",
      "sob",
      "sobbing",
      "sobbed",
      "heartbroken",
      "heartbreak",
      "devastated",
      "devastation",
      "upset",
      "distressed",
      "distress",
      "disappointed",
      "disappointment",
      "regret",
      "regretful",
      "regretted",
      "sorry",
      "apology",
      "apologize",
      "apologized",
      "unfortunate",
      "unfortunate",
      "tragic",
      "tragedy",
      "melancholy",
      "gloomy",
      "gloom",
      "despair",
      "despairing",
      "despaired",
    ],
    anger: [
      "angry",
      "anger",
      "mad",
      "furious",
      "fury",
      "outraged",
      "outrage",
      "annoyed",
      "annoy",
      "annoying",
      "irritated",
      "irritate",
      "irritating",
      "frustrated",
      "frustrate",
      "frustrating",
      "frustration",
      "enraged",
      "rage",
      "raging",
      "raged",
      "hate",
      "hating",
      "hated",
      "hatred",
      "hostile",
      "hostility",
      "resent",
      "resenting",
      "resented",
      "resentment",
      "bitter",
      "bitterness",
      "disgusted",
      "disgust",
      "disgusting",
      "indignant",
      "indignation",
      "offended",
      "offense",
      "offensive",
      "aggravated",
      "aggravate",
      "aggravating",
      "exasperated",
      "exasperate",
      "exasperating",
      "infuriated",
      "infuriate",
      "infuriating",
      "livid",
      "seething",
      "seethe",
      "seethed",
      "fuming",
      "fume",
      "fumed",
    ],
    fear: [
      "afraid",
      "fear",
      "fearful",
      "scared",
      "scare",
      "scaring",
      "scared",
      "frightened",
      "frighten",
      "frightening",
      "terrified",
      "terrify",
      "terrifying",
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "worrying",
      "worried",
      "nervous",
      "nervousness",
      "panic",
      "panicking",
      "panicked",
      "dread",
      "dreading",
      "dreaded",
      "horror",
      "horrified",
      "horrify",
      "horrifying",
      "alarmed",
      "alarm",
      "alarming",
      "apprehensive",
      "apprehension",
      "uneasy",
      "unease",
      "tense",
      "tension",
      "stressed",
      "stress",
      "stressing",
      "stressed",
      "phobia",
      "phobic",
      "terror",
      "terrorized",
      "terrorize",
      "terrorizing",
      "petrified",
      "petrify",
      "petrifying",
    ],
    surprise: [
      "surprised",
      "surprise",
      "surprising",
      "astonished",
      "astonish",
      "astonishing",
      "astonishment",
      "amazed",
      "amaze",
      "amazing",
      "amazement",
      "shocked",
      "shock",
      "shocking",
      "startled",
      "startle",
      "startling",
      "stunned",
      "stun",
      "stunning",
      "unexpected",
      "unforeseen",
      "unanticipated",
      "wonder",
      "wondering",
      "wondered",
      "awe",
      "awed",
      "awesome",
      "astounded",
      "astound",
      "astounding",
      "dumbfounded",
      "dumbfound",
      "dumbfounding",
      "flabbergasted",
      "bewildered",
      "bewilderment",
      "speechless",
      "wow",
      "omg",
      "oh my god",
      "oh my goodness",
      "gosh",
      "whoa",
      "woah",
      "unbelievable",
      "incredible",
      "remarkable",
    ],
    disgust: [
      "disgusted",
      "disgust",
      "disgusting",
      "repulsed",
      "repulse",
      "repulsive",
      "revolted",
      "revolt",
      "revolting",
      "nauseated",
      "nauseate",
      "nauseating",
      "nauseous",
      "sickened",
      "sicken",
      "sickening",
      "gross",
      "grossed",
      "grossing",
      "nasty",
      "foul",
      "repugnant",
      "repugnance",
      "abhorrent",
      "abhor",
      "abhorring",
      "abhorred",
      "loathe",
      "loathing",
      "loathed",
      "detest",
      "detesting",
      "detested",
      "detestation",
      "despise",
      "despising",
      "despised",
      "aversion",
      "averse",
      "distaste",
      "distasteful",
      "yuck",
      "yucky",
      "ew",
      "eww",
      "ugh",
      "icky",
      "vile",
      "filthy",
      "filth",
      "offensive",
      "repellent",
    ],
  }

  const textLower = text.toLowerCase()

  // Calculate emotion scores based on keyword presence
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    let score = 0
    keywords.forEach((keyword) => {
      // Use word boundary to match whole words
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      const matches = textLower.match(regex)
      if (matches) {
        score += matches.length
      }
    })

    // Normalize score based on text length
    const wordCount = text.split(/\s+/).length || 1
    emotions[emotion] = score / (wordCount * 0.1) // Scale factor to get reasonable values

    // Cap at 1.0
    if (emotions[emotion] > 1) {
      emotions[emotion] = 1
    }
  })

  return emotions
}

/**
 * Get dominant emotion from emotions object
 */
function getDominantEmotion(emotions: Record<string, number>): string {
  if (Object.keys(emotions).length === 0) {
    return "neutral"
  }

  let dominantEmotion = "neutral"
  let highestScore = 0

  Object.entries(emotions).forEach(([emotion, score]) => {
    if (score > highestScore) {
      highestScore = score
      dominantEmotion = emotion
    }
  })

  // If no strong emotion is detected, return neutral
  if (highestScore < 0.15) {
    return "neutral"
  }

  return dominantEmotion
}

// ===== TEXT ANALYSIS MODULE =====

/**
 * Analyze readability of text
 */
function analyzeReadability(text: string): ToneAnalysisResult["readability"] {
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
function detectFormality(text: string): ToneAnalysisResult["formality"] {
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

// ===== SUGGESTIONS MODULE =====

/**
 * Generate suggestions based on analysis
 */
function generateSuggestions(text: string, analysis: ToneAnalysisResult): ToneSuggestion[] {
  const suggestions: ToneSuggestion[] = []

  // Sentiment-based suggestions
  if (analysis.sentiment === "negative" && analysis.scores.negative > 0.6) {
    suggestions.push({
      type: "sentiment",
      issue: "Very negative tone detected",
      suggestion: "Consider softening your language to appear more balanced",
      example: "Instead of 'terrible failure', try 'area for improvement'",
    })
  }

  // Mixed sentiment suggestions
  if (analysis.sentiment === "mixed" && text.length > 100) {
    suggestions.push({
      type: "sentiment",
      issue: "Mixed tone may confuse readers",
      suggestion: "Consider making your tone more consistent",
      example: "Focus on either constructive criticism or positive feedback, not both simultaneously",
    })
  }

  // Readability suggestions
  if (analysis.readability === "complex" && text.length > 150) {
    suggestions.push({
      type: "structure",
      issue: "Complex language detected",
      suggestion: "Consider simplifying your language for better readability",
      example: "Use shorter sentences and simpler words",
    })
  }

  // Formality suggestions based on text length
  if (analysis.formality === "casual" && text.length > 200) {
    suggestions.push({
      type: "formality",
      issue: "Very casual tone in a longer post",
      suggestion: "Consider a more balanced tone for longer content",
      example: "Reduce slang and casual expressions in professional contexts",
    })
  } else if (analysis.formality === "formal" && text.length < 100) {
    suggestions.push({
      type: "formality",
      issue: "Very formal tone in a short post",
      suggestion: "Consider a more conversational tone for short content",
      example: "Use contractions and simpler language to sound more approachable",
    })
  }

  // Structure suggestions
  const paragraphs = text.split(/\n\s*\n/)
  if (paragraphs.length === 1 && text.length > 300) {
    suggestions.push({
      type: "structure",
      issue: "Long text without paragraph breaks",
      suggestion: "Break your text into smaller paragraphs for better readability",
      example: "Add paragraph breaks after every 2-3 sentences",
    })
  }

  // Long sentence suggestions
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const longSentences = sentences.filter((s) => s.split(/\s+/).length > 25)
  if (longSentences.length > 0 && longSentences.length / sentences.length > 0.3) {
    suggestions.push({
      type: "structure",
      issue: "Several very long sentences detected",
      suggestion: "Break up long sentences to improve readability",
      example: "Split sentences with multiple clauses into separate sentences",
    })
  }

  // Engagement suggestions
  if (!text.includes("?") && text.length > 200) {
    suggestions.push({
      type: "engagement",
      issue: "No questions in your text",
      suggestion: "Consider adding a question to engage your audience",
      example: "What do you think about this approach?",
    })
  }

  // Emotion-based suggestions
  if (analysis.dominantEmotion === "anger" && analysis.emotions && analysis.emotions.anger > 0.4) {
    suggestions.push({
      type: "emotion",
      issue: "Strong anger detected in your text",
      suggestion: "Consider toning down angry language for more effective communication",
      example: "Express concerns constructively rather than with frustration",
    })
  }

  if (analysis.dominantEmotion === "fear" && analysis.emotions && analysis.emotions.fear > 0.4) {
    suggestions.push({
      type: "emotion",
      issue: "Anxious tone detected",
      suggestion: "Consider balancing concerns with solutions or positive aspects",
      example: "After mentioning a concern, suggest a potential solution or silver lining",
    })
  }

  return suggestions
}

// ===== HASHTAG EXTRACTION MODULE =====

/**
 * Extract hashtags using simple NLP techniques
 */
function extractHashtags(text: string): string[] {
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

// ===== ENGAGEMENT BOOSTERS MODULE =====

/**
 * Generate engagement boosters locally
 */
function generateEngagementBoostersImpl(text: string): string[] {
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

// ===== MAIN API FUNCTIONS =====

/**
 * Analyzes text tone using local algorithms (no API dependency)
 * @param text Text to analyze
 * @returns Analysis result
 */
export async function analyzeTone(text: string): Promise<ToneAnalysisResult> {
  try {
    // Initialize result with default values
    const result: ToneAnalysisResult = {
      sentiment: "neutral",
      scores: {
        positive: 0,
        negative: 0,
        neutral: 0,
      },
      confidence: 0,
    }

    // Local sentiment analysis
    const sentimentResult = analyzeLocalSentiment(text)
    result.sentiment = sentimentResult.sentiment
    result.scores = sentimentResult.scores
    result.confidence = 0.85 // Reasonable confidence for local analysis

    // Local emotion analysis
    const emotions = analyzeLocalEmotions(text)
    result.emotions = emotions
    result.dominantEmotion = getDominantEmotion(emotions)

    // Add readability analysis (local computation)
    result.readability = analyzeReadability(text)

    // Add formality analysis (local computation)
    result.formality = detectFormality(text)

    // Generate suggestions based on analysis
    result.suggestions = generateSuggestions(text, result)

    return result
  } catch (error) {
    console.error("Error analyzing tone:", error)
    // Return basic analysis with local methods if everything fails
    return {
      sentiment: "neutral",
      scores: { positive: 0.33, negative: 0.33, neutral: 0.34 },
      confidence: 0.6,
      readability: "average",
      formality: "neutral",
      suggestions: [],
    }
  }
}

/**
 * Client-side function to analyze tone
 */
export async function analyzeToneAction(text: string): Promise<ToneAnalysisResult> {
  return analyzeTone(text)
}

/**
 * Extract hashtags from text using local processing
 */
export async function suggestHashtags(text: string): Promise<string[]> {
  return extractHashtags(text)
}

/**
 * Generate engagement boosters using local processing
 */
export async function generateEngagementBoosters(text: string): Promise<string[]> {
  return generateEngagementBoostersImpl(text)
}
