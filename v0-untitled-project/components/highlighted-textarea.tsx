"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import type { PlatformKey } from "@/lib/constants"

interface HighlightedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  platform: PlatformKey
  className?: string
  highlightClassName?: string
}

export function HighlightedTextarea({
  value,
  onChange,
  platform,
  className = "",
  highlightClassName = "",
  ...props
}: HighlightedTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const [highlightedText, setHighlightedText] = useState("")

  // Sync scroll position between textarea and highlight div
  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  // Update highlighted text when value changes
  useEffect(() => {
    const highlighted = highlightText(value, platform)
    setHighlightedText(highlighted)
  }, [value, platform])

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto"
      // Set the height to the scrollHeight to fit all content
      const newHeight = Math.max(200, Math.min(600, textareaRef.current.scrollHeight))
      textareaRef.current.style.height = `${newHeight}px`
    }
  }, [value])

  // Highlight problematic characters based on platform
  const highlightText = (text: string, platform: PlatformKey): string => {
    if (!text) return ""

    // Define problematic patterns for each platform
    const patterns: Record<PlatformKey, { pattern: RegExp; className: string }[]> = {
      twitter: [
        { pattern: /[^\x00-\x7F]/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Non-ASCII chars
        { pattern: /#[^\s#]{31,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Hashtags > 30 chars
        { pattern: /@[^\s@]{16,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Mentions > 15 chars
        { pattern: /https?:\/\/\S{24,}/g, className: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" }, // URLs (counted as 23 chars)
      ],
      threads: [
        { pattern: /[^\x00-\x7F]/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Non-ASCII chars
        { pattern: /#[^\s#]{31,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Hashtags > 30 chars
      ],
      reddit: [
        { pattern: /\[([^\]]+)\]$$[^)]+$$/g, className: "text-green-500 bg-green-100 dark:bg-green-900/30" }, // Markdown links
        { pattern: /\*\*([^*]+)\*\*/g, className: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" }, // Bold text
        { pattern: /\*([^*]+)\*/g, className: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" }, // Italic text
        { pattern: /^#+\s+.+$/gm, className: "text-orange-500 bg-orange-100 dark:bg-orange-900/30" }, // Headers
      ],
      mastodon: [
        { pattern: /[^\x00-\x7F]/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Non-ASCII chars
        { pattern: /#[^\s#]{31,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Hashtags > 30 chars
        { pattern: /@[^\s@]{31,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Mentions > 30 chars
      ],
      linkedin: [
        { pattern: /[^\x00-\x7F]/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Non-ASCII chars
        { pattern: /#[^\s#]{31,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Hashtags > 30 chars
        { pattern: /https?:\/\/\S{100,}/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Very long URLs
        { pattern: /\n{5,}/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Too many line breaks
      ],
      facebook: [
        { pattern: /[^\x00-\x7F]/g, className: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" }, // Non-ASCII chars
        { pattern: /#[^\s#]{51,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Hashtags > 50 chars (Facebook allows longer hashtags)
        { pattern: /@[^\s@]{51,}/g, className: "text-red-500 bg-red-100 dark:bg-red-900/30" }, // Mentions > 50 chars
      ],
    }

    // Apply highlighting
    let result = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>")
      .replace(/\s/g, "&nbsp;")

    // Apply platform-specific highlighting
    patterns[platform].forEach(({ pattern, className }) => {
      result = result.replace(
        pattern,
        (match) => `<span class="${className}" style="word-wrap: break-word; white-space: pre-wrap;">${match}</span>`,
      )
    })

    return result
  }

  return (
    <div className="relative">
      <div
        ref={highlightRef}
        className={`absolute top-0 left-0 right-0 bottom-0 whitespace-pre-wrap pointer-events-none overflow-auto p-3 text-transparent ${className} ${highlightClassName}`}
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          overflowX: "hidden", // Hide horizontal scrollbar
          wordWrap: "break-word", // Ensure long words wrap
        }}
      />
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onScroll={syncScroll}
        className={`relative bg-transparent ${className}`}
        style={{
          caretColor: "black",
          minHeight: "200px",
          maxHeight: "600px",
          whiteSpace: "pre-wrap", // Ensure text wrapping
          overflowX: "hidden", // Hide horizontal scrollbar
          wordWrap: "break-word", // Ensure long words wrap
        }}
        {...props}
      />
    </div>
  )
}
