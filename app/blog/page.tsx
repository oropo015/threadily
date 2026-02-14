import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { getAllPosts, getAllTags } from "@/lib/blog-utils"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

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
    <div className="max-w-7xl mx-auto">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Threadify Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Expert tips, strategies, and insights to help you create engaging social media threads and grow your audience.
        </p>
      </div>

      {/* Popular tags */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Popular Topics</h2>
        <div className="flex flex-wrap gap-3">
          {popularTags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {sortedPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100">Featured Post</h2>
          <Link
            href={`/blog/${sortedPosts[0].slug}`}
            className="group block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {sortedPosts[0].frontmatter.image ? (
                <Image
                  src={sortedPosts[0].frontmatter.image || "/placeholder.svg"}
                  alt={sortedPosts[0].frontmatter.imageAlt || sortedPosts[0].frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                  <span className="text-white text-2xl font-bold">Threadify</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-3 text-sm text-white/90">
                  <time dateTime={sortedPosts[0].frontmatter.date}>{formatDate(sortedPosts[0].frontmatter.date)}</time>
                  <span>•</span>
                  <span>{sortedPosts[0].readingTime} min read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                  {sortedPosts[0].frontmatter.title}
                </h2>
                <p className="text-lg text-white/90 mb-4">{sortedPosts[0].frontmatter.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {sortedPosts[0].frontmatter.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                      {tag}
                    </Badge>
                  ))}
                  {sortedPosts[0].frontmatter.tags.length > 3 && (
                    <Badge variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                      +{sortedPosts[0].frontmatter.tags.length - 3} more
                    </Badge>
                  )}
                </div>
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
            className="group flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {post.frontmatter.image ? (
                <Image
                  src={post.frontmatter.image || "/placeholder.svg"}
                  alt={post.frontmatter.imageAlt || post.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                  <span className="text-white text-xl font-bold">Threadify</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.frontmatter.title}
              </h2>

              <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">{post.frontmatter.summary}</p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
