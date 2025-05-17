"use client"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface PlatformSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  const platforms = [
    { id: "twitter-numbering", label: "Twitter" },
    { id: "reddit-markdown", label: "Reddit" },
    { id: "mastodon-cw", label: "Mastodon" },
    { id: "linkedin-carousel", label: "LinkedIn" },
    { id: "repurposing", label: "Repurpose" },
  ]

  const selectedPlatform = platforms.find((platform) => platform.id === value) || platforms[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between mb-4">
          {selectedPlatform.label}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {platforms.map((platform) => (
          <DropdownMenuItem
            key={platform.id}
            className={cn("flex items-center justify-between", value === platform.id && "font-medium")}
            onClick={() => onChange(platform.id)}
          >
            {platform.label}
            {value === platform.id && <Check className="ml-2 h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
