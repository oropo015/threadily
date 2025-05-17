import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export function BackToHome() {
  return (
    <div className="mb-6">
      <Button variant="ghost" size="sm" asChild className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
        <Link href="/">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </Button>
    </div>
  )
}
