import { getAllBlogSlugs, getBlogData } from "@/lib/blog-utils"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { BlogPostStructuredData } from "@/components/structured-data"
import { BlogImage } from "@/components/blog-image"
import { notFound } from "next/navigation"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogData(params.slug)

  // If post doesn't exist, return default metadata
  if (!post) {
    return {
      title: "Post Not Found | Threadify Blog",
      description: "The blog post you're looking for doesn't exist or has been moved.",
    }
  }

  return {
    title: `${post.title} | Threadify Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      url: `https://threadify.pro/blog/${post.slug}`,
      tags: post.tags,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.imageAlt || post.title,
            },
          ]
        : [
            {
              url: "https://threadify.pro/og-image.png",
              width: 1200,
              height: 630,
              alt: "Threadify Blog",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.image || "https://threadify.pro/twitter-image.png"],
    },
  }
}

export async function generateStaticParams() {
  const paths = getAllBlogSlugs()
  return paths
}

export default async function BlogPost({ params }: Props) {
  const post = await getBlogData(params.slug)

  // If post doesn't exist, show 404 page
  if (!post) {
    notFound()
  }

  const postUrl = `https://threadify.pro/blog/${post.slug}`

  // Default image for the blog post if none is provided
  const defaultImage = "https://threadify.pro/og-image.png"

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Add structured data for SEO */}
      <BlogPostStructuredData
        title={post.title}
        description={post.summary}
        datePublished={post.date}
        imageUrl={post.image || defaultImage}
        authorName={post.author || "Threadify Team"}
        url={postUrl}
      />

      <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all posts
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {post.image && (
            <BlogImage
              src={post.image}
              alt={post.imageAlt || post.title}
              credit={post.imageCredit}
              creditUrl={post.imageCreditUrl}
              priority={true}
              className="aspect-[21/9] md:aspect-[16/9]"
            />
          )}
        </header>

        <div
          className="prose prose-blue max-w-none dark:prose-invert prose-img:rounded-lg prose-headings:text-blue-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="Share on Twitter"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="Share on LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="Share on Facebook"
            >
              Facebook
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
