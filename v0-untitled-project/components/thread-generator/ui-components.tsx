import type { PreviewMode } from "../preview-mode-toggle"

/**
 * Gets the preview container class based on preview mode
 */
export const getPreviewContainerClass = (previewMode: PreviewMode): string => {
  switch (previewMode) {
    case "mobile":
      return "max-w-sm mx-auto border rounded-xl overflow-hidden shadow-lg"
    case "tablet":
      return "max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-lg"
    case "desktop":
      return "max-w-4xl mx-auto border rounded-xl overflow-hidden shadow-lg"
    default:
      return ""
  }
}
