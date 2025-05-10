"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TwitterThreadNumbering } from "./twitter-thread-numbering"
import { RedditMarkdownEnhancer } from "./reddit-markdown-enhancer"
import { MastodonContentWarning } from "./mastodon-content-warning"
import { LinkedInCarouselGenerator } from "./linkedin-carousel-generator"
import { ContentRepurposingTool } from "./content-repurposing-tool"
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
        <TabsTrigger value="twitter-numbering">Twitter</TabsTrigger>
        <TabsTrigger value="reddit-markdown">Reddit</TabsTrigger>
        <TabsTrigger value="mastodon-cw">Mastodon</TabsTrigger>
        <TabsTrigger value="linkedin-carousel">LinkedIn</TabsTrigger>
        <TabsTrigger value="repurposing">Repurpose</TabsTrigger>
      </TabsList>

      <TabsContent value="twitter-numbering">
        <TwitterThreadNumbering posts={posts} onUpdatePosts={onUpdatePosts} />
      </TabsContent>

      <TabsContent value="reddit-markdown">
        <RedditMarkdownEnhancer
          post={posts.length > 0 ? posts[0] : ""}
          onUpdatePost={(updatedPost) => onUpdatePost(updatedPost, 0)}
        />
      </TabsContent>

      <TabsContent value="mastodon-cw">
        <MastodonContentWarning
          post={posts.length > 0 ? posts[0] : ""}
          onUpdatePost={(updatedPost) => onUpdatePost(updatedPost, 0)}
        />
      </TabsContent>

      <TabsContent value="linkedin-carousel">
        <LinkedInCarouselGenerator post={posts.join("\n\n")} />
      </TabsContent>

      <TabsContent value="repurposing">
        <ContentRepurposingTool
          post={posts.join("\n\n")}
          platform={platform}
          onUpdatePost={(updatedPost) => onUpdatePost(updatedPost)}
        />
      </TabsContent>
    </Tabs>
  )
}
