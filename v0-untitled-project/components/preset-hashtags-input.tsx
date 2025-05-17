"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PresetHashtagsInputProps {
  value: string
  onChange: (value: string) => void
  onSave?: () => void
  maxLength?: number
}

export function PresetHashtagsInput({ value, onChange, onSave, maxLength = 200 }: PresetHashtagsInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const [formattedTags, setFormattedTags] = useState<string[]>([])

  // Format and validate hashtags whenever input changes
  useEffect(() => {
    const tags = formatHashtags(inputValue)
    setFormattedTags(tags)
  }, [inputValue])

  // Format hashtags: remove #, trim whitespace, filter empty, etc.
  const formatHashtags = (input: string): string[] => {
    if (!input.trim()) return []

    return input
      .split(",")
      .map((tag) => tag.trim())
      .map((tag) => (tag.startsWith("#") ? tag.substring(1) : tag))
      .filter((tag) => tag && /^[a-zA-Z0-9_]+$/.test(tag)) // Only allow alphanumeric and underscore
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      setInputValue(newValue)
      onChange(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSave) {
      e.preventDefault()
      onSave()
    }
  }

  const clearInput = () => {
    setInputValue("")
    onChange("")
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="preset-hashtags" className="text-sm font-medium">
            Preset Hashtags
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>These hashtags will be automatically added to each generated thread post.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-xs text-gray-500">
          {inputValue.length}/{maxLength}
        </span>
      </div>

      <div className="relative">
        <Input
          id="preset-hashtags"
          placeholder="AI, WebDev, TechTips"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pr-8"
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearInput}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Enter hashtags separated by commas. These will be automatically added to each generated thread.
      </p>

      {formattedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {formattedTags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
