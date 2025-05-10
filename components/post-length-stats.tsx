import { Progress } from "@/components/ui/progress"
import { type PlatformKey, PLATFORMS } from "@/lib/constants"

interface PostLengthStatsProps {
  posts: string[]
  platform: PlatformKey
}

export function PostLengthStats({ posts, platform }: PostLengthStatsProps) {
  if (posts.length === 0) return null

  const maxChars = PLATFORMS[platform].maxChars
  const optimalChars = Math.floor(maxChars * 0.85)

  // Calculate stats
  const totalPosts = posts.length
  const optimalPosts = posts.filter((post) => post.length >= optimalChars).length
  const percentOptimal = Math.round((optimalPosts / totalPosts) * 100)

  // Calculate average post length
  const totalChars = posts.reduce((sum, post) => sum + post.length, 0)
  const avgLength = Math.round(totalChars / totalPosts)
  const avgPercent = Math.round((avgLength / maxChars) * 100)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Post Length Optimization</h3>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Optimized Posts</span>
          <span className="font-medium">
            {optimalPosts}/{totalPosts} ({percentOptimal}%)
          </span>
        </div>
        <Progress value={percentOptimal} className="h-2" />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Average Post Length</span>
          <span className="font-medium">
            {avgLength}/{maxChars} chars ({avgPercent}%)
          </span>
        </div>
        <Progress value={avgPercent} className="h-2" />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Target: At least {optimalChars} chars ({Math.round((optimalChars / maxChars) * 100)}% of limit) per post
      </p>
    </div>
  )
}
