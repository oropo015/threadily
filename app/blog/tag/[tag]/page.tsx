import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostsByTag, getAllTags } from "@/lib/blog-utils"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

type Props = {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)

  return {
    title: `${decodedTag} - Threadify Blog`,
    description: `Articles tagged with "${decodedTag}" on the Threadify blog.`,
    openGraph: {
      title: `${decodedTag} - Threadify Blog`,
      description: `Articles tagged with "${decodedTag}" on the Threadify blog.`,
      url: `https://threadify.pro/blog/tag/${params.tag}`,
    },
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(decodedTag)

  if (!posts.length) {
    notFound()
  }

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )

  return (
    <div className="max-w-5xl mx-auto">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: decodedTag, href: `/blog/tag/${encodeURIComponent(decodedTag)}` },
        ]}
      />
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
        aria-label="Back to all blog posts"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all posts
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-50">
          Articles tagged "<span className="text-blue-600 dark:text-blue-400">{decodedTag}</span>"
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Found {posts.length} article{posts.length !== 1 ? "s" : ""} with this tag
        </p>
      </div>

      {/* Blog posts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>

              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.frontmatter.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.frontmatter.summary}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {post.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant={tag === decodedTag ? "default" : "secondary"} className="text-xs">
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
