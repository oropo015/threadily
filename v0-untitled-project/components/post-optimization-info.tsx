import { Card, CardContent } from "@/components/ui/card"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { type PlatformKey, PLATFORMS } from "@/lib/constants"

interface PostOptimizationInfoProps {
  platform: PlatformKey
  postCount: number
}

export function PostOptimizationInfo({ platform, postCount }: PostOptimizationInfoProps) {
  const maxChars = PLATFORMS[platform].maxChars
  const optimalChars = Math.floor(maxChars * 0.85)

  return (
    <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <InfoCircledIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-700 dark:text-blue-300">Post Optimization</h3>
            <p className="mt-1 text-sm text-blue-600 dark:text-blue-200">
              Your content will be optimized to use at least 85% ({optimalChars} characters) of {platform}'s {maxChars}{" "}
              character limit for maximum engagement.
            </p>
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-200">
              {postCount > 0 ? (
                <>
                  Your content will be split into approximately <strong>{postCount}</strong> optimized posts.
                </>
              ) : (
                <>Enter your content to see how many optimized posts will be generated.</>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
