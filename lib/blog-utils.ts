import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "blog")

export type PostFrontmatter = {
  title: string
  date: string
  summary: string
  tags: string[]
  image?: string
  imageCredit?: string
  imageCreditUrl?: string
  imageAlt?: string
  author?: string
}

export type Post = {
  slug: string
  content: string
  frontmatter: PostFrontmatter
  readingTime: number
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    // Check if the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Blog directory does not exist:", postsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, "")
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, "utf8")

          const matterResult = matter(fileContents)
          const processedContent = await remark().use(html).process(matterResult.content)
          const content = processedContent.toString()

          const readingTime = calculateReadingTime(matterResult.content)

          return {
            slug,
            content,
            frontmatter: matterResult.data as PostFrontmatter,
            readingTime,
          }
        }),
    )

    return allPostsData
  } catch (error) {
    console.error("Error getting all posts:", error)
    return []
  }
}

// Get a post by slug
export async function getBlogData(slug: string): Promise<any | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Blog post with slug "${slug}" not found`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    const processedContent = await remark().use(html).process(matterResult.content)
    const content = processedContent.toString()

    const readingTime = calculateReadingTime(matterResult.content)

    // Extract frontmatter data
    const frontmatter = matterResult.data as PostFrontmatter

    // Return a flattened object for easier access in components
    return {
      slug,
      content,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary,
      tags: frontmatter.tags || [],
      image: frontmatter.image,
      imageCredit: frontmatter.imageCredit,
      imageCreditUrl: frontmatter.imageCreditUrl,
      imageAlt: frontmatter.imageAlt || frontmatter.title,
      author: frontmatter.author || "Threadify Team",
      readingTime,
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tagsSet = new Set<string>()

  allPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet)
}

// Get all blog slugs
export function getAllBlogSlugs(): { slug: string }[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Blog directory does not exist:", postsDirectory)
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ""),
    }))
}

// Get sorted blog data
export async function getSortedBlogsData() {
  const allPostsData = await getAllPosts()
  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1
    } else {
      return -1
    }
  })
}
