"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Twitter, MessageSquare, Linkedin, Hash, Zap, BarChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-600 mb-4">
                Create Perfect Social Media Threads
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Format your long text into perfectly-sized posts for Twitter, Threads, and LinkedIn threads.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="text-lg px-8 py-6 rounded-lg bg-blue-600 hover:bg-blue-700">
                  <Link href="/app" className="flex items-center gap-2">
                    Start Creating <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-lg">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/social-media-thread-app.png"
                  alt="threadily app interface showing thread creation"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Support Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Create Threads for All Major Platforms</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Twitter className="h-8 w-8 text-blue-600" />
              </div>
              <span className="font-medium">X (Twitter)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-medium">Threads</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Linkedin className="h-8 w-8 text-blue-700" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                <Hash className="h-8 w-8 text-red-600" />
              </div>
              <span className="font-medium">Reddit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Content Creators</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to create engaging, professional social media threads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Text Splitting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically split your text into perfectly-sized posts that respect word and sentence boundaries.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Hash className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hashtag Generator</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate relevant hashtags for your content to increase visibility and engagement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tone Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze the tone of your content to ensure it matches your intended audience and message.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Thread Enhancement</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use AI to enhance your threads, improve readability, and increase engagement.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Platform-Specific Tips</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get platform-specific tips to optimize your content for each social media platform.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Character Counter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track character count for each post to ensure you stay within platform limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose threadily?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Save time and create more engaging content with our specialized tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">For Content Creators</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Save hours of manual formatting and splitting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Create more consistent and professional-looking threads</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Increase engagement with optimized content</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Generate relevant hashtags to expand your reach</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">For Businesses</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Maintain consistent brand voice across platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Streamline your social media workflow</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Analyze content tone to match your target audience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Create more engaging social media campaigns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of content creators who love using threadily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">S</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah K.</h4>
                  <p className="text-sm text-gray-500">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "threadily has completely transformed how I create Twitter threads. What used to take me an hour now
                takes minutes!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-xl">M</span>
                </div>
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-sm text-gray-500">Digital Marketer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The hashtag generator and tone analysis features have helped us maintain a consistent brand voice
                across all platforms."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold text-xl">J</span>
                </div>
                <div>
                  <h4 className="font-bold">Jessica R.</h4>
                  <p className="text-sm text-gray-500">Freelance Writer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I use threadily daily for my clients' social media content. The AI enhancement feature is a
                game-changer for engagement."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Better Social Media Threads?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of content creators who use threadily to save time and create more engaging content.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 rounded-lg bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/app" className="flex items-center gap-2">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "threadily",
            applicationCategory: "SocialNetworkingApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Format your long text into perfectly-sized posts for social media threads. Split text, add hashtags, analyze tone, and optimize your content.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "127",
            },
          }),
        }}
      />
    </div>
  )
}
