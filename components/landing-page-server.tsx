import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, AtSign, Linkedin, Hash } from "lucide-react"

/**
 * Server-rendered landing content for SEO. Crawlers receive full H1, description, and key copy in initial HTML.
 */
export function LandingPageServer() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-4 tracking-tight">
                Create Perfect Social Media Threads
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto md:mx-0">
                Our powerful social media thread generator helps you format your long text into{" "}
                <strong>perfectly-sized posts</strong> for Twitter, Threads, and LinkedIn. Split content, add hashtags,
                and optimize engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/social-media-thread-generator">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[160px]">
                    Start Creating
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="min-w-[160px]">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Trusted by <strong>10,000+</strong> content creators and social media managers
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full max-w-lg mx-auto md:mx-0 md:ml-auto rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/social-media-thread-app.png"
                  alt="Threadify app interface showing thread creation"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Create Threads for All Major Platforms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Twitter className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">X (Twitter)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Create engaging tweet threads with perfect character counts
              </p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <AtSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Threads</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Optimize your content for Meta&apos;s Threads platform
              </p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Linkedin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Create professional content for business networking
              </p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <Hash className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Reddit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Format your posts for Reddit&apos;s community discussions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Thread Generator Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                The Ultimate Social Media Thread Generator
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Transform your ideas into engaging social media content with our powerful thread generator. Whether
                you&apos;re a content creator, marketer, or business owner, our tool helps you create perfectly
                formatted threads that capture attention and drive engagement.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">
                    <strong>Smart Content Splitting</strong> - Automatically breaks your content into optimal post lengths
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">
                    <strong>Platform Optimization</strong> - Tailors content for each social media platform&apos;s
                    requirements
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">
                    <strong>Engagement Boost</strong> - Includes features to maximize reach and interaction
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Why Choose Our Social Media Thread Generator?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mr-2">•</span>
                    Save hours of manual formatting time
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mr-2">•</span>
                    Maintain consistent brand voice
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mr-2">•</span>
                    Optimize for each platform&apos;s algorithm
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 mr-2">•</span>
                    Increase engagement with smart formatting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
            Powerful Features for Content Creators
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Our social media thread generator provides everything you need to create engaging, professional social media
            threads that drive engagement and grow your audience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Smart Text Splitting</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Automatically split your long content into <strong>perfectly-sized posts</strong> that respect character
                limits and natural break points.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Hashtag Optimization</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Generate and analyze relevant hashtags to <strong>increase your content&apos;s discoverability</strong> and
                reach a wider audience.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Engagement Analytics</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get insights on how to <strong>improve your content&apos;s performance</strong> with readability scores
                and engagement predictions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Media Integration</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Easily add and optimize images for your threads to <strong>create visually appealing content</strong> that
                stands out in feeds.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Scheduling Assistant</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get recommendations for the <strong>best times to post</strong> your content based on
                platform-specific engagement patterns.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Cross-Platform Compatibility
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create content that works seamlessly across <strong>multiple social platforms</strong> with
                platform-specific optimizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">SM</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sarah M.</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Social Media Manager</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                &quot;Threadify has <strong>revolutionized my workflow</strong>. I can now create a week&apos;s worth of
                Twitter threads in just an hour!&quot;
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">James D.</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                &quot;The hashtag suggestions alone have <strong>increased my reach by 40%</strong>. This tool is a
                game-changer for anyone serious about social media.&quot;
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">AL</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Aisha L.</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Digital Marketer</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                &quot;I manage multiple client accounts, and Threadify helps me <strong>maintain consistent quality</strong>{" "}
                across all platforms. Highly recommended!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Create Engaging Social Media Threads?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of content creators who are using Threadify to grow their audience and save time.
          </p>
          <Link href="/social-media-thread-generator">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 min-w-[200px]">
              Start Creating For Free
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Is Threadify free to use?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes, Threadify offers a free plan with all essential features. We also offer premium plans with advanced
                features for power users and teams.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Which social media platforms does Threadify support?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Threadify currently supports Twitter (X), Instagram Threads, LinkedIn, Reddit, Facebook, and Mastodon.
                We&apos;re constantly adding support for more platforms.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Can Threadify post directly to my social media accounts?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Currently, Threadify helps you format and optimize your content. You can easily copy the formatted
                threads to post manually or use with your favorite scheduling tools.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                How does the hashtag suggestion feature work?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our AI-powered system analyzes your content and suggests relevant hashtags based on trending topics and
                engagement patterns specific to each platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Latest from Our Blog</h2>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              View all articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/blog/maximizing-engagement-social-media-threads" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Maximizing Engagement: The Art of Crafting Compelling Social Media Threads
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Learn proven strategies to create threads that capture attention and drive meaningful engagement.
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Read article →</span>
                </div>
              </div>
            </Link>
            <Link href="/blog/leveraging-ai-content-creation" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Leveraging AI for Efficient Content Creation in Social Media Marketing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Discover how AI tools can help you create better content faster and with less effort.
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Read article →</span>
                </div>
              </div>
            </Link>
            <Link href="/blog/building-personal-brand-threaded-content" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Top Strategies for Building a Personal Brand Through Threaded Content
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Learn how to establish yourself as an authority in your niche using strategic thread creation.
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Read article →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
