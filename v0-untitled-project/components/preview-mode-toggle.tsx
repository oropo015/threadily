"use client"

import { Button } from "@/components/ui/button"
import { Eye, Smartphone, Monitor, Tablet } from "lucide-react"

export type PreviewMode = "compact" | "mobile" | "tablet" | "desktop"

interface PreviewModeToggleProps {
  mode: PreviewMode
  onChange: (mode: PreviewMode) => void
}

export function PreviewModeToggle({ mode, onChange }: PreviewModeToggleProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 w-full">
      <Button
        variant={mode === "compact" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("compact")}
        className="h-8 px-2 sm:px-3 flex-1"
      >
        <Eye className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline text-xs">Compact</span>
      </Button>

      <Button
        variant={mode === "mobile" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("mobile")}
        className="h-8 px-2 sm:px-3 flex-1"
      >
        <Smartphone className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline text-xs">Mobile</span>
      </Button>

      <Button
        variant={mode === "tablet" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("tablet")}
        className="h-8 px-2 sm:px-3 flex-1"
      >
        <Tablet className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline text-xs">Tablet</span>
      </Button>

      <Button
        variant={mode === "desktop" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("desktop")}
        className="h-8 px-2 sm:px-3 flex-1"
      >
        <Monitor className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline text-xs">Desktop</span>
      </Button>
    </div>
  )
}
