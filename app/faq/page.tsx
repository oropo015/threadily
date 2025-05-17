import type { Metadata } from "next"
import { BackToHome } from "@/components/back-to-home"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | threadify",
  description: "Find answers to common questions about threadify and how to use our thread generator tool.",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">General Questions</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">What is threadify?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                threadify is a tool that helps you create perfectly-sized posts for social media threads. It
                automatically splits your long text into optimal chunks for platforms like Twitter, Instagram, and
                LinkedIn, while preserving the flow and readability of your content.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Is threadify free to use?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, threadify is free to use for basic features. We offer premium features for users who need advanced
                functionality, but the core thread generation capabilities are available at no cost.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Do I need to create an account?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, you don't need to create an account to use the basic features of threadify. However, creating an
                account allows you to save your threads, access premium features, and sync your content across devices.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Using threadify</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">How do I create a thread?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply paste your long text into the editor and click "Generate Thread." threadify will automatically
                split your content into optimally-sized posts for your selected platform. You can then edit each post,
                reorder them, and add hashtags before sharing.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">What platforms does threadify support?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                threadify currently supports Twitter/X, Instagram, LinkedIn, Threads, Mastodon, and Reddit. We're
                constantly adding support for more platforms based on user feedback.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Can I customize how my text is split?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, threadify offers several customization options. You can adjust the character limit per post, choose
                where to split your text (at sentences, paragraphs, or custom points), and manually edit the generated
                posts.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Features and Functionality</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Can threadify generate hashtags for my content?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, threadify can analyze your content and suggest relevant hashtags to increase your post's
                visibility. You can select which hashtags to include and add your own custom hashtags as well.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Does threadify support media attachments?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upload images to include with your thread posts. Premium users can access additional media
                features like image optimization and scheduling.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Can I save my threads for later?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, threadify allows you to save your threads locally. Premium users can save threads to their account
                and access them from any device.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Privacy and Data</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">How does threadify handle my data?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We take your privacy seriously. Your content is processed securely, and we don't store your thread
                content on our servers unless you explicitly save it to your account. For more details, please read our{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Is my content used to train AI models?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, we do not use your content to train AI models. Your data is only used to provide the service you
                requested.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Can I delete my data from threadify?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can delete any saved threads from your account at any time. If you have an account, you can
                also request a complete deletion of all your data by contacting us at{" "}
                <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
                  info@techternet.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Support and Contact</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">How can I get help with threadify?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you have questions or need assistance, you can:
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    Check our{" "}
                    <Link href="/faq" className="text-blue-600 hover:underline dark:text-blue-400">
                      FAQ page
                    </Link>{" "}
                    for common questions
                  </li>
                  <li>
                    Visit our{" "}
                    <Link href="/blog" className="text-blue-600 hover:underline dark:text-blue-400">
                      blog
                    </Link>{" "}
                    for tutorials and tips
                  </li>
                  <li>
                    Contact us at{" "}
                    <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
                      info@techternet.com
                    </a>
                  </li>
                </ul>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-2">Can I suggest new features?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We love hearing from our users. Send your feature suggestions to{" "}
                <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
                  info@techternet.com
                </a>{" "}
                or reach out to us on social media.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
