"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PieChart, RotateCcw, Eye, TrendingUp, Plus } from "lucide-react"
import { useState, useEffect } from "react"

interface HashtagScores {
  relevance: Record<string, number>
  popularity: Record<string, number>
}

interface HashtagAnalysisProps {
  hashtags: string[]
  selectedHashtags: string[]
  onHashtagSelect: (tag: string) => void
  onApplyHashtags: () => void
  onReset: () => void
  showAdvanced: boolean
  onToggleAdvanced: () => void
  sortMethod: "relevance" | "popularity"
  onChangeSortMethod: (method: "relevance" | "popularity") => void
}

export function HashtagAnalysis({
  hashtags,
  selectedHashtags,
  onHashtagSelect,
  onApplyHashtags,
  onReset,
  showAdvanced,
  onToggleAdvanced,
  sortMethod,
  onChangeSortMethod,
}: HashtagAnalysisProps) {
  const [scores, setScores] = useState<HashtagScores>({
    relevance: {},
    popularity: {},
  })
  const [hashtagAnalysis, setHashtagAnalysis] = useState<{
    effectiveness: number
    coverage: number
    variety: number
  }>({ effectiveness: 0, coverage: 0, variety: 0 })

  // Generate scores when hashtags change
  useEffect(() => {
    if (hashtags.length > 0) {
      generateHashtagScores()
    }
  }, [hashtags])

  // Update analysis when selected hashtags change
  useEffect(() => {
    if (selectedHashtags.length > 0) {
      analyzeSelectedHashtags()
    } else {
      setHashtagAnalysis({ effectiveness: 0, coverage: 0, variety: 0 })
    }
  }, [selectedHashtags])

  const generateHashtagScores = () => {
    const relevance: Record<string, number> = {}
    const popularity: Record<string, number> = {}

    hashtags.forEach((tag) => {
      // Generate realistic scores
      relevance[tag] = Math.floor(40 + Math.random() * 60)
      popularity[tag] = Math.floor(20 + Math.random() * 80)
    })

    setScores({ relevance, popularity })
  }

  const analyzeSelectedHashtags = () => {
    // Calculate effectiveness based on optimal hashtag count
    const optimalCount = 3
    const countEffectiveness = Math.min(selectedHashtags.length / optimalCount, 1.5)
    const effectiveness = Math.min(100, Math.round(countEffectiveness * 70 + Math.random() * 30))

    // Calculate variety score
    const varietyScore =
      selectedHashtags.length > 1 ? Math.min(100, Math.round(Math.sqrt(selectedHashtags.length) * 40)) : 0

    // Calculate coverage (simplified)
    const coverage = Math.min(100, Math.round(effectiveness * 0.8 + varietyScore * 0.2))

    setHashtagAnalysis({
      effectiveness,
      coverage,
      variety: varietyScore,
    })
  }

  const getScoreClass = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-blue-600 dark:text-blue-400"
    if (score >= 40) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  const getProgressClass = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-amber-500"
    return "bg-red-500"
  }

  const sortHashtags = (tags: string[]) => {
    return [...tags].sort((a, b) => {
      if (sortMethod === "relevance") {
        return (scores.relevance[b] || 0) - (scores.relevance[a] || 0)
      } else {
        return (scores.popularity[b] || 0) - (scores.popularity[a] || 0)
      }
    })
  }

  return (
    <div>
      {showAdvanced && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={sortMethod === "relevance" ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={() => onChangeSortMethod("relevance")}
            >
              <Eye className="h-3 w-3 mr-1" />
              By Relevance
            </Button>
            <Button
              size="sm"
              variant={sortMethod === "popularity" ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={() => onChangeSortMethod("popularity")}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              By Popularity
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {sortHashtags(hashtags).map((tag, index) => (
          <Badge
            key={index}
            variant={selectedHashtags.includes(tag) ? "default" : "outline"}
            className={`
              ${
                selectedHashtags.includes(tag)
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-100"
              } 
              cursor-pointer flex items-center gap-1.5
            `}
            onClick={() => onHashtagSelect(tag)}
          >
            <span>#{tag}</span>
            {showAdvanced && (
              <span
                className={`text-xs ${getScoreClass(sortMethod === "relevance" ? scores.relevance[tag] || 0 : scores.popularity[tag] || 0)}`}
              >
                ({sortMethod === "relevance" ? scores.relevance[tag] || 0 : scores.popularity[tag] || 0})
              </span>
            )}
          </Badge>
        ))}
      </div>

      {selectedHashtags.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Selected: {selectedHashtags.map((t) => `#${t}`).join(" ")}</span>
            <span className="text-blue-600 dark:text-blue-400">
              {selectedHashtags.length}/{hashtags.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Effectiveness</span>
                <span className={getScoreClass(hashtagAnalysis.effectiveness)}>{hashtagAnalysis.effectiveness}%</span>
              </div>
              <Progress
                value={hashtagAnalysis.effectiveness}
                className={getProgressClass(hashtagAnalysis.effectiveness)}
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Topic Coverage</span>
                <span className={getScoreClass(hashtagAnalysis.coverage)}>{hashtagAnalysis.coverage}%</span>
              </div>
              <Progress value={hashtagAnalysis.coverage} className={getProgressClass(hashtagAnalysis.coverage)} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Variety</span>
                <span className={getScoreClass(hashtagAnalysis.variety)}>{hashtagAnalysis.variety}%</span>
              </div>
              <Progress value={hashtagAnalysis.variety} className={getProgressClass(hashtagAnalysis.variety)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-between mt-3">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs" onClick={onReset}>
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
          <Button size="sm" variant="outline" className="text-xs" onClick={onToggleAdvanced}>
            <PieChart className="h-3 w-3 mr-1" />
            {showAdvanced ? "Basic Mode" : "Advanced Mode"}
          </Button>
        </div>
        <Button size="sm" variant="default" className="text-xs" onClick={onApplyHashtags}>
          <Plus className="h-3 w-3 mr-1" />
          {selectedHashtags.length > 0 ? `Add Selected (${selectedHashtags.length})` : "Add Top 3"}
        </Button>
      </div>
    </div>
  )
}
