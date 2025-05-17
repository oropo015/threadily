import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { getAllPosts, getAllTags } from "@/lib/blog-utils"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Threadify",
  description:
    "Read the latest articles about social media thread creation, content optimization, and digital marketing.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const allTags = await getAllTags()

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )

  // Get top tags (tags with the most posts)
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Threadify Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Expert tips, strategies, and insights to help you create engaging social media threads and grow your audience.
        </p>
      </div>

      {/* Popular tags */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Popular Topics</h2>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
              <Badge
                variant="outline"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {sortedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Featured Post</h2>
          <Link
            href={`/blog/${sortedPosts[0].slug}`}
            className="group block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {sortedPosts[0].frontmatter.image ? (
                <Image
                  src={sortedPosts[0].frontmatter.image || "/placeholder.svg"}
                  alt={sortedPosts[0].frontmatter.imageAlt || sortedPosts[0].frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-blue-100 dark:bg-blue-900">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">Threadify</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={sortedPosts[0].frontmatter.date}>{formatDate(sortedPosts[0].frontmatter.date)}</time>
                <span>•</span>
                <span>{sortedPosts[0].readingTime} min read</span>
              </div>

              <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {sortedPosts[0].frontmatter.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{sortedPosts[0].frontmatter.summary}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {sortedPosts[0].frontmatter.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {sortedPosts[0].frontmatter.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{sortedPosts[0].frontmatter.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Blog posts grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.slice(1).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {post.frontmatter.image ? (
                <Image
                  src={post.frontmatter.image || "/placeholder.svg"}
                  alt={post.frontmatter.imageAlt || post.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-blue-100 dark:bg-blue-900">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">Threadify</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>

              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.frontmatter.title}
              </h2>

              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{post.frontmatter.summary}</p>

              <div className="mt-auto flex flex-wrap gap-2">
                {post.frontmatter.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
