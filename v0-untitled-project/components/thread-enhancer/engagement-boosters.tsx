"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Share2, TrendingUp, MessageCircle } from "lucide-react"
import type { PlatformKey } from "@/lib/constants"

interface EngagementBoostersProps {
  boosters: string[]
  onApplyBooster: (booster: string) => void
  onReset: () => void
  platform: PlatformKey
}

export function EngagementBoosters({ boosters, onApplyBooster, onReset, platform }: EngagementBoostersProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Add questions or calls-to-action to boost engagement with your post. Optimized for {platform}.
      </p>

      <div className="space-y-3">
        {boosters.map((booster, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-md transition-all
              ${
                index === 0
                  ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800"
                  : "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900"
              }
            `}
          >
            <div className="flex items-start gap-2">
              {index === 0 ? (
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              ) : (
                <MessageCircle className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">{booster}</p>
                <div className="flex justify-between mt-2">
                  <Badge variant="outline" className="text-xs">
                    {index === 0 ? "Top pick" : `Option ${index + 1}`}
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => onApplyBooster(booster)}>
                    <Share2 className="h-3 w-3 mr-1" />
                    Use This
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Button size="sm" variant="outline" className="text-xs" onClick={onReset}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Generate New Ideas
        </Button>
      </div>
    </div>
  )
}
