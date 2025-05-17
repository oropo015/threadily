"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"

interface LazyComponentProps {
  children: ReactNode
  threshold?: number
  placeholder?: ReactNode
  className?: string
}

export function LazyComponent({ children, threshold = 200, placeholder, className = "" }: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: `${threshold}px`,
      },
    )

    if (componentRef.current) {
      observer.observe(componentRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold, isVisible])

  return (
    <div ref={componentRef} className={className}>
      {isVisible
        ? children
        : placeholder || <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md" />}
    </div>
  )
}
