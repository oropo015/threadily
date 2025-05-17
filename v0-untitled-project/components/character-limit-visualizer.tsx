import { type PlatformKey, PLATFORMS } from "@/lib/constants"
import { countCharactersForPlatform, getCharacterCountStatus } from "@/lib/character-counter"
import type { MediaItem } from "./media-uploader"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CharacterLimitVisualizerProps {
  text: string
  platform: PlatformKey
  mediaItems?: MediaItem[]
}

export function CharacterLimitVisualizer({ text, platform, mediaItems = [] }: CharacterLimitVisualizerProps) {
  const count = countCharactersForPlatform(text, platform, mediaItems)
  const maxChars = PLATFORMS[platform].maxChars
  const percentage = Math.min(100, (count / maxChars) * 100)
  const status = getCharacterCountStatus(text, platform, mediaItems)

  let statusColor = "text-green-500"
  let progressColor = "bg-green-500"
  let StatusIcon = CheckCircle

  if (status === "warning") {
    statusColor = "text-yellow-500"
    progressColor = "bg-yellow-500"
    StatusIcon = AlertTriangle
  }

  if (status === "error") {
    statusColor = "text-red-500"
    progressColor = "bg-red-500"
    StatusIcon = AlertCircle
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <StatusIcon className={`h-4 w-4 ${statusColor}`} />
          <span className={`text-sm font-medium ${statusColor}`}>
            {count} / {maxChars} characters
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xs text-gray-500">
                {status === "success" && "Within limit"}
                {status === "warning" && "Approaching limit"}
                {status === "error" && "Exceeds limit"}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {status === "success" && `You have ${maxChars - count} characters remaining.`}
                {status === "warning" && `You're approaching the ${platform} character limit.`}
                {status === "error" &&
                  `You've exceeded the ${platform} character limit by ${count - maxChars} characters.`}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Progress value={percentage} className={progressColor} />

      {status === "error" && (
        <div className="text-xs text-red-500">
          Your post exceeds the {platform} character limit by {count - maxChars} characters. It will be automatically
          split when generating threads.
        </div>
      )}
    </div>
  )
}
