"use client"

import { useState, useCallback } from "react"

interface UseHistoryOptions<T> {
  maxHistory?: number
  initialValue?: T
}

export function useHistory<T>(options: UseHistoryOptions<T> = {}) {
  const { maxHistory = 100, initialValue } = options
  const [value, setValue] = useState<T | undefined>(initialValue)
  const [past, setPast] = useState<T[]>([])
  const [future, setFuture] = useState<T[]>([])

  const push = useCallback(
    (newValue: T) => {
      setPast((prev) => {
        const newPast = [...prev]
        if (value !== undefined) {
          newPast.push(value)
          // Limit history size
          if (newPast.length > maxHistory) {
            newPast.shift()
          }
        }
        return newPast
      })
      setValue(newValue)
      setFuture([])
    },
    [value, maxHistory],
  )

  const undo = useCallback(() => {
    if (past.length === 0) return false

    const newPast = [...past]
    const previousValue = newPast.pop()
    setPast(newPast)

    if (value !== undefined) {
      setFuture((prev) => [value, ...prev])
    }
    setValue(previousValue)
    return true
  }, [past, value])

  const redo = useCallback(() => {
    if (future.length === 0) return false

    const newFuture = [...future]
    const nextValue = newFuture.shift()
    setFuture(newFuture)

    if (value !== undefined) {
      setPast((prev) => [...prev, value])
    }
    setValue(nextValue)
    return true
  }, [future, value])

  const clear = useCallback(() => {
    setPast([])
    setFuture([])
    setValue(initialValue)
  }, [initialValue])

  const canUndo = past.length > 0
  const canRedo = future.length > 0

  return {
    value,
    push,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    history: { past, present: value, future },
  }
}
