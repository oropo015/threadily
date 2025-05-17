"use client"

import { useState } from "react"
import { TwitterThreadNumbering } from "./twitter-thread-numbering"
import { RedditMarkdownEnhancer } from "./reddit-markdown-enhancer"
import { MastodonContentWarning } from "./mastodon-content-warning"
import { LinkedInCarouselGenerator } from "./linkedin-carousel-generator"
import { ContentRepurposingTool } from "./content-repurposing-tool"
import { PlatformSelector } from "./platform-selector"
import type { PlatformKey } from "@/lib/constants"

interface PlatformEnhancementsProps {
  posts: string[]
  platform: PlatformKey
  onUpdatePosts: (posts: string[]) => void
  onUpdatePost: (post: string, index?: number) => void
}

export function PlatformEnhancements({ posts, platform, onUpdatePosts, onUpdatePost }: PlatformEnhancementsProps) {
  const [activeTab, setActiveTab] = useState(getDefaultTabForPlatform(platform))

  function getDefaultTabForPlatform(platform: PlatformKey): string {
    switch (platform) {
      case "twitter":
        return "twitter-numbering"
      case "reddit":
        return "reddit-markdown"
      case "mastodon":
        return "mastodon-cw"
      case "linkedin":
        return "linkedin-carousel"
      default:
        return "repurposing"
    }
  }

  return (
    <div className="w-full">
      <PlatformSelector value={activeTab} onChange={setActiveTab} />

      <div className="relative mt-2">
        {activeTab === "twitter-numbering" && (
          <div className="block">
            <TwitterThreadNumbering posts={posts} onUpdatePosts={onUpdatePosts} />
          </div>
        )}

        {activeTab === "reddit-markdown" && (
          <div className="block">
            <RedditMarkdownEnhancer
              post={posts.length > 0 ? posts[0] : ""}
              onUpdatePost={(updatedPost) => onUpdatePost(updatedPost, 0)}
            />
          </div>
        )}

        {activeTab === "mastodon-cw" && (
          <div className="block">
            <MastodonContentWarning
              post={posts.length > 0 ? posts[0] : ""}
              onUpdatePost={(updatedPost) => onUpdatePost(updatedPost, 0)}
            />
          </div>
        )}

        {activeTab === "linkedin-carousel" && (
          <div className="block">
            <LinkedInCarouselGenerator post={posts.join("\n\n")} />
          </div>
        )}

        {activeTab === "repurposing" && (
          <div className="block">
            <ContentRepurposingTool
              post={posts.join("\n\n")}
              platform={platform}
              onUpdatePost={(updatedPost) => onUpdatePost(updatedPost)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
