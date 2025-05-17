import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Blog Post Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
        The blog post you're looking for doesn't exist or may have been moved to a new location.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/blog">Browse All Blog Posts</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
