import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function UnlimitedTextBanner() {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <InfoIcon className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700 dark:text-blue-300">Enter your text</AlertTitle>
      <AlertDescription className="text-blue-600 dark:text-blue-200">
        <p>
          Your content will be intelligently split into multiple posts optimized to use at least 85% of each platform's character limit for maximum engagement.
        </p>
      </AlertDescription>
    </Alert>
  )
}
