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
