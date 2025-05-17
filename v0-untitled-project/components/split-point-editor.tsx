"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SplitPointEditorProps {
  text: string
  onSplitPointsChange: (splitPoints: number[]) => void
  splitPoints: number[]
}

export function SplitPointEditor({ text, onSplitPointsChange, splitPoints }: SplitPointEditorProps) {
  const [localSplitPoints, setLocalSplitPoints] = useState<number[]>(splitPoints)
  const { toast } = useToast()

  useEffect(() => {
    setLocalSplitPoints(splitPoints)
  }, [splitPoints])

  const addSplitPoint = (index: number) => {
    if (localSplitPoints.includes(index)) return

    const newSplitPoints = [...localSplitPoints, index].sort((a, b) => a - b)
    setLocalSplitPoints(newSplitPoints)
    onSplitPointsChange(newSplitPoints)

    toast({
      title: "Split point added",
      description: `Added split point at position ${index}.`,
    })
  }

  const removeSplitPoint = (index: number) => {
    const newSplitPoints = localSplitPoints.filter((point) => point !== index)
    setLocalSplitPoints(newSplitPoints)
    onSplitPointsChange(newSplitPoints)

    toast({
      title: "Split point removed",
      description: `Removed split point at position ${index}.`,
    })
  }

  // Split text into segments based on split points
  const segments = []
  let lastIndex = 0

  for (const point of localSplitPoints) {
    segments.push(text.substring(lastIndex, point))
    lastIndex = point
  }

  segments.push(text.substring(lastIndex))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Split Point Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add or remove split points to control where your text is divided into separate posts.
          </p>

          <div className="space-y-2">
            {segments.map((segment, index) => (
              <div key={index} className="relative border rounded-md p-3">
                <p className="whitespace-pre-wrap text-sm">{segment}</p>

                {index < segments.length - 1 && (
                  <div className="flex justify-center -mb-6 mt-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6 rounded-full z-10"
                      onClick={() => removeSplitPoint(localSplitPoints[index])}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {index === segments.length - 1 && segment.length > 0 && (
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => addSplitPoint(text.length - segment.length + Math.floor(segment.length / 2))}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Split Point
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
