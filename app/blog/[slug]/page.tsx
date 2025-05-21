import { getAllBlogSlugs, getBlogData } from "@/lib/blog-utils"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Twitter, Linkedin, Facebook } from "lucide-react"
import { BlogPostStructuredData } from "@/components/structured-data"
import { BlogImage } from "@/components/blog-image"
import { notFound } from "next/navigation"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Use a local constant to ensure type safety
  const slug = params.slug
  const post = await getBlogData(slug)

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
  // Use a local constant to ensure type safety
  const slug = params.slug
  const post = await getBlogData(slug)

  // If post doesn't exist, show 404 page
  if (!post) {
    notFound()
  }

  const postUrl = `https://threadify.pro/blog/${post.slug}`

  // Default image for the blog post if none is provided
  const defaultImage = "https://threadify.pro/og-image.png"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Page Header */}
      <header className="py-10 mb-8 bg-white dark:bg-gray-900 shadow">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 dark:text-blue-300">
            Threadify Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Insights, strategies, and updates for content creators
          </p>
        </div>
      </header>

      {/* Blog Post */}
      <main className="max-w-4xl mx-auto px-4">
        {/* Add structured data for SEO */}
        <BlogPostStructuredData
          title={post.title}
          description={post.summary}
          datePublished={post.date}
          imageUrl={post.image || defaultImage}
          authorName={post.author || "Threadify Team"}
          url={postUrl}
        />

        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </Link>

        <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-12">
          {/* Hero section */}
          <div className="relative">
            {post.image && (
              <div className="relative aspect-[21/9] w-full">
                <BlogImage
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  credit={post.imageCredit}
                  creditUrl={post.imageCreditUrl}
                  priority={true}
                  className="w-full h-full"
                />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {/* Title and metadata */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-white/90">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                  <Badge 
                    variant="secondary" 
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Main content */}
            <div
              className="prose prose-lg prose-blue max-w-none dark:prose-invert prose-headings:text-blue-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share section */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Share this article
                </h3>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
