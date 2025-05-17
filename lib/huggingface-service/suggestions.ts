import type { ToneAnalysisResult, ToneSuggestion } from "./types"

/**
 * Generate suggestions based on analysis
 */
export function generateSuggestions(text: string, analysis: ToneAnalysisResult): ToneSuggestion[] {
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
