"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IMAGE_SOURCES } from "@/lib/image-sources"
import { getRelevantImageKeywords } from "@/lib/image-guidelines"

interface ImageSearchToolProps {
  blogTags: string[]
  blogTitle: string
  onSelectImage: (imageData: {
    url: string
    credit: string
    creditUrl: string
    source: string
  }) => void
}

export function ImageSearchTool({ blogTags, blogTitle, onSelectImage }: ImageSearchToolProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState(IMAGE_SOURCES[0].name.toLowerCase())
  const [isLoading, setIsLoading] = useState(false)

  // Get suggested keywords based on blog content
  const suggestedKeywords = getRelevantImageKeywords(blogTags, blogTitle)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // In a real implementation, this would search the selected image source API
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleSelectKeyword = (keyword: string) => {
    setSearchTerm(keyword)
    handleSearch(keyword)
  }

  const handleSelectImage = (imageData: any) => {
    // In a real implementation, this would select the image and pass data to parent
    onSelectImage({
      url: imageData.url,
      credit: imageData.photographer || "Unknown",
      creditUrl: imageData.photographerUrl || "",
      source: activeTab,
    })
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Find the Perfect Image</h2>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search for images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => handleSearch(searchTerm)}>Search</Button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Suggested keywords:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords.map((keyword) => (
              <Button key={keyword} variant="outline" size="sm" onClick={() => handleSelectKeyword(keyword)}>
                {keyword}
              </Button>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            {IMAGE_SOURCES.map((source) => (
              <TabsTrigger key={source.name} value={source.name.toLowerCase()}>
                {source.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {IMAGE_SOURCES.map((source) => (
            <TabsContent key={source.name} value={source.name.toLowerCase()}>
              <div className="text-sm mb-4">
                <p>License: {source.license}</p>
                <p>Attribution: {source.attribution}</p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {searchTerm
                      ? `Search for "${searchTerm}" on ${source.name}`
                      : `Enter a search term to find images on ${source.name}`}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open(`${source.searchUrl}${encodeURIComponent(searchTerm)}`, "_blank")}
                  >
                    Search on {source.name}
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
