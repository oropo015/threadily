import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const GENERATOR_PATH = "/social-media-thread-generator"
const PLATFORM_QUERY_TO_PATH: Record<string, string> = {
  x: "/social/x-thread-generator",
  twitter: "/social/x-thread-generator",
  threads: "/social/threads-thread-generator",
  linkedin: "/social/linkedin-post-formatter",
  reddit: "/social/reddit-post-splitter",
  mastodon: "/social/mastodon-post-splitter",
  facebook: "/social/facebook-post-formatter",
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // /social (exact) → 301 to keyword-rich main tool URL
  if (pathname === "/social") {
    const url = request.nextUrl.clone()
    url.pathname = GENERATOR_PATH
    return NextResponse.redirect(url, 301)
  }

  // /social-media-thread-generator with ?platform=xxx → 301 to platform-specific page
  if (pathname === GENERATOR_PATH || pathname === `${GENERATOR_PATH}/`) {
    const platform = searchParams.get("platform")?.toLowerCase()?.trim()
    const destination = platform && PLATFORM_QUERY_TO_PATH[platform]
    if (destination) {
      const url = request.nextUrl.clone()
      url.pathname = destination
      url.search = searchParams.toString()
      url.searchParams.delete("platform")
      return NextResponse.redirect(url, 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/social", "/social-media-thread-generator", "/social-media-thread-generator/"],
}
