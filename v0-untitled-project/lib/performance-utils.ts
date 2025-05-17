/**
 * Calculates the optimal image size based on device pixel ratio and viewport
 * @param originalWidth The original width of the image
 * @returns The optimized width for the current device
 */
export function getOptimizedImageSize(originalWidth: number): number {
  if (typeof window === "undefined") return originalWidth

  // Get device pixel ratio (default to 1 if not available)
  const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

  // Calculate optimal size based on pixel ratio
  // Cap at original size to prevent upscaling
  return Math.min(Math.round(originalWidth * pixelRatio), originalWidth)
}

/**
 * Debounces a function to prevent excessive calls
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttles a function to limit how often it can be called
 * @param func The function to throttle
 * @param limit Limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Checks if an element is in the viewport
 * @param element The element to check
 * @param offset Optional offset to consider element visible before it enters viewport
 */
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  if (!element) return false

  const rect = element.getBoundingClientRect()

  return (
    rect.top - offset <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left - offset <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom + offset >= 0 &&
    rect.right + offset >= 0
  )
}
