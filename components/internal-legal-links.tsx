import Link from "next/link"

/**
 * Cross-links between legal and support pages for better internal linking and navigation.
 */
export function InternalLegalLinks() {
  return (
    <nav
      className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800"
      aria-label="Related policies and support"
    >
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Related</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <li>
          <Link
            href="/faq"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            href="/privacy"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/terms"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Terms of Service
          </Link>
        </li>
        <li>
          <Link
            href="/cookies"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Cookie Policy
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  )
}
