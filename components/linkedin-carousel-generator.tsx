"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type CarouselSlide, extractCarouselSlides } from "@/lib/platform-features"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Copy, Plus, ArrowLeft, ArrowRight, ImageIcon, Download, Trash, PanelLeft } from "lucide-react"

interface LinkedInCarouselGeneratorProps {
  post: string
}

export function LinkedInCarouselGenerator({ post }: LinkedInCarouselGeneratorProps) {
  const [slides, setSlides] = useState<CarouselSlide[]>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [carouselTitle, setCarouselTitle] = useState("")
  const [isGenerated, setIsGenerated] = useState(false)
  const { toast } = useToast()

  const generateCarousel = () => {
    if (!post || post.length < 50) {
      toast({
        title: "Not enough content",
        description: "Please provide more content to generate carousel slides.",
        variant: "destructive",
      })
      return
    }

    // Extract title from first line or paragraph if possible
    const lines = post.split("\n").filter((line) => line.trim().length > 0)
    const potentialTitle = lines[0].trim()

    // Set carousel title if it's reasonably short
    if (potentialTitle.length < 80) {
      setCarouselTitle(potentialTitle)
    } else {
      setCarouselTitle("LinkedIn Carousel Post")
    }

    // Extract slides from content
    const extractedSlides = extractCarouselSlides(post, 10)

    // Add image prompts based on content
    const slidesWithImagePrompts = extractedSlides.map((slide) => ({
      ...slide,
      imagePrompt: generateImagePrompt(slide.title, slide.content),
    }))

    setSlides(slidesWithImagePrompts)
    setActiveSlide(0)
    setIsGenerated(true)

    toast({
      title: "Carousel generated",
      description: `Created ${slidesWithImagePrompts.length} slides for your LinkedIn carousel.`,
    })
  }

  const generateImagePrompt = (title: string, content: string): string => {
    // Simple method to generate an image prompt based on slide content
    const combinedText = `${title} ${content}`
    const words = combinedText.split(/\s+/).filter((w) => w.length > 3)

    // Get a few keywords
    const keywords = words
      .filter((word, index, self) => self.indexOf(word) === index) // Unique words
      .slice(0, 5)
      .join(", ")

    return `Professional illustration of ${keywords}`
  }

  const addNewSlide = () => {
    setSlides([
      ...slides,
      {
        title: `Slide ${slides.length + 1}`,
        content: "",
        imagePrompt: "Professional business illustration",
      },
    ])
    setActiveSlide(slides.length)
  }

  const updateSlide = (index: number, field: keyof CarouselSlide, value: string) => {
    const updatedSlides = [...slides]
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value,
    }
    setSlides(updatedSlides)
  }

  const deleteSlide = (index: number) => {
    if (slides.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one slide in your carousel.",
        variant: "destructive",
      })
      return
    }

    const updatedSlides = slides.filter((_, i) => i !== index)
    setSlides(updatedSlides)

    if (activeSlide >= updatedSlides.length) {
      setActiveSlide(updatedSlides.length - 1)
    }

    toast({
      title: "Slide deleted",
      description: "The slide has been removed from your carousel.",
    })
  }

  const downloadAsTextFile = () => {
    if (slides.length === 0) return

    const content =
      `# ${carouselTitle}\n\n` +
      slides
        .map(
          (slide, i) =>
            `## Slide ${i + 1}: ${slide.title}\n\n${slide.content}\n\nImage: ${slide.imagePrompt}\n\n---\n\n`,
        )
        .join("")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "linkedin-carousel.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Carousel downloaded",
      description: "Your carousel has been downloaded as a text file.",
    })
  }

  return (
    <Card>
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-3">
        <CardTitle className="flex items-center text-lg text-blue-700 dark:text-blue-300">
          <PanelLeft className="mr-2 h-5 w-5" />
          LinkedIn Carousel Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Transform your content into a visually engaging LinkedIn carousel post format.
          </p>

          {!isGenerated ? (
            <Button
              onClick={generateCarousel}
              className="flex items-center w-full"
              disabled={!post || post.length < 50}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Carousel from Content
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="carousel-title">Carousel Title</Label>
                <Input
                  id="carousel-title"
                  value={carouselTitle}
                  onChange={(e) => setCarouselTitle(e.target.value)}
                  placeholder="Title for your carousel post"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">
                    Slide {activeSlide + 1} of {slides.length}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                      disabled={activeSlide === 0}
                      className="h-8 w-8"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
                      disabled={activeSlide === slides.length - 1}
                      className="h-8 w-8"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {slides.length > 0 && (
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="slide-title">Slide Title</Label>
                      <Input
                        id="slide-title"
                        value={slides[activeSlide].title}
                        onChange={(e) => updateSlide(activeSlide, "title", e.target.value)}
                        placeholder="Title for this slide"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="slide-content">Slide Content</Label>
                      <Textarea
                        id="slide-content"
                        value={slides[activeSlide].content}
                        onChange={(e) => updateSlide(activeSlide, "content", e.target.value)}
                        placeholder="Content for this slide"
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="image-prompt" className="flex items-center">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Image Prompt
                      </Label>
                      <Input
                        id="image-prompt"
                        value={slides[activeSlide].imagePrompt || ""}
                        onChange={(e) => updateSlide(activeSlide, "imagePrompt", e.target.value)}
                        placeholder="Description for image generation"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => deleteSlide(activeSlide)} className="h-8">
                        <Trash className="h-4 w-4 mr-1" />
                        Delete Slide
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={addNewSlide} className="h-8">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Slide
                </Button>
                <Button variant="outline" size="sm" onClick={downloadAsTextFile} className="h-8">
                  <Download className="h-4 w-4 mr-1" />
                  Download Carousel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => {
            if (slides.length === 0) return

            const content =
              `# ${carouselTitle}\n\n` +
              slides.map((slide, i) => `## Slide ${i + 1}: ${slide.title}\n\n${slide.content}\n\n`).join("")

            navigator.clipboard.writeText(content)
            toast({
              title: "Copied to clipboard",
              description: "Your carousel content has been copied to your clipboard.",
            })
          }}
          disabled={slides.length === 0}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy Text
        </Button>

        {isGenerated && (
          <Button onClick={generateCarousel} variant="secondary" size="sm" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Regenerate
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
