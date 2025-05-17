"use client"

import { Progress } from "@/components/ui/progress"
import type { PlatformKey } from "@/lib/constants"
import { AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CharacterCounterProps {
  text: string
  platform: PlatformKey
  maxChars: number
  className?: string
}

export function CharacterCounter({ text, platform, maxChars, className = "" }: CharacterCounterProps) {
  const characterCount = text.length
  const percentUsed = Math.min((characterCount / maxChars) * 100, 100)

  const getCounterColor = () => {
    if (characterCount === 0) return "text-gray-400"
    if (characterCount <= maxChars * 0.75) return "text-green-500"
    if (characterCount <= maxChars) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressColor = () => {
    if (characterCount === 0) return "bg-gray-200 dark:bg-gray-700"
    if (characterCount <= maxChars * 0.75) return "bg-green-500"
    if (characterCount <= maxChars) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getEstimatedPosts = () => {
    if (characterCount === 0) return 0
    return Math.ceil(characterCount / maxChars)
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getCounterColor()}`}>{characterCount}</span>
          <span className="text-xs text-gray-500">total characters</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <AlertCircle className="h-3.5 w-3.5 text-blue-500 cursor-help" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  You can write as much text as you want. Your content will be automatically split into multiple posts
                  when you generate your thread.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="font-medium">{getEstimatedPosts()}</span>
          <span>{getEstimatedPosts() === 1 ? "post" : "posts"}</span>
          <span className="text-xs text-gray-400">({maxChars} chars per post)</span>
        </div>
      </div>

      <Progress value={percentUsed} className={getProgressColor()} />

      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>{Math.floor(maxChars / 2)}</span>
        <span>{maxChars}</span>
      </div>
    </div>
  )
}
