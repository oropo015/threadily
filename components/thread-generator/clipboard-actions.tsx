import { toast } from "@/hooks/use-toast"

/**
 * Copies the provided text to the clipboard
 * @param text Text to copy to clipboard
 */
export const copyTextToClipboard = async (text: string | undefined): Promise<void> => {
  if (!text) {
    toast({
      title: "Nothing to copy",
      description: "The text area is empty.",
      variant: "destructive",
    })
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    })
  } catch (error) {
    console.error("Failed to copy text: ", error)
    toast({
      title: "Copy failed",
      description: "Could not copy text to clipboard. Please try again.",
      variant: "destructive",
    })
  }
}

/**
 * Pastes text from clipboard into the editor
 * @param setText Function to set the text content
 */
export const pasteTextFromClipboard = async (setText: (text: string) => void): Promise<void> => {
  try {
    const clipboardText = await navigator.clipboard.readText()
    if (!clipboardText) {
      toast({
        title: "Nothing to paste",
        description: "Your clipboard is empty.",
        variant: "destructive",
      })
      return
    }

    setText(clipboardText)
    toast({
      title: "Text pasted",
      description: "Clipboard content has been pasted into the editor.",
    })
  } catch (error) {
    console.error("Failed to paste text: ", error)
    toast({
      title: "Paste failed",
      description: "Could not access clipboard. Please check permissions and try again.",
      variant: "destructive",
    })
  }
}

/**
 * Copies all thread posts to clipboard
 * @param threadPosts Array of thread posts to copy
 */
export const copyAllToClipboard = (threadPosts: string[]): void => {
  const allText = threadPosts.join("\n\n")
  navigator.clipboard.writeText(allText)
  toast({
    title: "All posts copied",
    description: "All thread posts have been copied to your clipboard.",
  })
}

/**
 * Copies a single post to clipboard
 * @param text Text to copy
 */
export const copyPostToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text)
  toast({
    title: "Copied",
    description: "Post has been copied to your clipboard.",
  })
}
