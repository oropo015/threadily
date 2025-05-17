import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import { type PlatformKey, PLATFORMS } from "@/lib/constants"

interface OptimizationTipsProps {
  platform: PlatformKey
}

export function OptimizationTips({ platform }: OptimizationTipsProps) {
  const getPlatformSpecificTips = () => {
    switch (platform) {
      case "twitter":
        return [
          "Use hashtags strategically - 1-2 relevant hashtags perform better than many",
          "End with a question to encourage replies",
          "Include a call to action like 'RT if you agree'",
          "Use emojis sparingly to highlight key points",
        ]
      case "linkedin":
        return [
          "Start with a hook or surprising statistic",
          "Use line breaks between paragraphs for readability",
          "Include industry-specific hashtags",
          "End with a thought-provoking question for professionals",
        ]
      case "facebook":
        return [
          "Include personal stories or experiences",
          "Ask for opinions to drive engagement",
          "Use emojis to add personality",
          "Tag relevant people or pages when appropriate",
        ]
      case "reddit":
        return [
          "Use proper markdown formatting for better readability",
          "Include TL;DR for longer posts",
          "Be authentic and conversational",
          "Ask specific questions to encourage discussion",
        ]
      case "threads":
        return [
          "Keep individual posts concise but substantial",
          "Use emojis and special characters to stand out",
          "Include a hook in your first post",
          "End with an open-ended question",
        ]
      case "mastodon":
        return [
          "Use CW (content warning) tags appropriately",
          "Include relevant hashtags for discoverability",
          "Engage with the community by mentioning others",
          "Use ALT text for images",
        ]
      default:
        return [
          "Keep your content concise and focused",
          "Include a call to action",
          "Ask questions to encourage engagement",
          "Use formatting to highlight key points",
        ]
    }
  }

  const tips = getPlatformSpecificTips()

  return (
    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-700 dark:text-amber-300">
              Optimization Tips for {PLATFORMS[platform].name}
            </h3>
            <ul className="mt-1 text-sm text-amber-600 dark:text-amber-200 space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="mr-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
