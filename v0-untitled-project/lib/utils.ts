import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Updated formatDate function to handle different date formats
export function formatDate(dateString: string): string {
  try {
    // Try to parse the date
    const date = new Date(dateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date format: ${dateString}`)
      return dateString // Return the original string if parsing fails
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error)
    return dateString // Return the original string if an error occurs
  }
}
