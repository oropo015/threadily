import type { Metadata } from "next"
import { BackToHome } from "@/components/back-to-home"

export const metadata: Metadata = {
  title: "Cookie Policy | threadify",
  description: "Cookie Policy for threadify - Learn how we use cookies and similar technologies.",
  alternates: {
    canonical: "https://threadify.pro/cookies",
  },
}

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last updated: May 17, 2024</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mt-0">Cookie Preferences</h2>
          <p className="text-blue-700 dark:text-blue-400 mb-2">
            You can customize your cookie preferences at any time by clicking the "Cookie Settings" button below.
          </p>
          <button
            id="open-cookie-preferences"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Cookie Settings
          </button>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.getElementById('open-cookie-preferences').addEventListener('click', function() {
                  // This will trigger the cookie preferences dialog
                  window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
                });
              `,
            }}
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          This Cookie Policy explains how threadify ("we," "our," or "us") uses cookies and similar technologies to
          recognize you when you visit our website. It explains what these technologies are and why we use them, as well
          as your rights to control our use of them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. What Are Cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website.
          Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as
          to provide reporting information.
        </p>
        <p className="mt-2">
          Cookies set by the website owner (in this case, threadify) are called "first-party cookies." Cookies set by
          parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party
          features or functionality to be provided on or through the website (e.g., advertising, interactive content,
          and analytics).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
        <h3 className="text-xl font-medium mt-6 mb-3">3.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as
          security, network management, and account access. You may disable these by changing your browser settings, but
          this may affect how the website functions.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">3.2 Performance and Analytics Cookies</h3>
        <p>
          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of
          our site. They help us know which pages are the most and least popular and see how visitors move around the
          site.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">3.3 Functionality Cookies</h3>
        <p>
          These cookies enable the website to provide enhanced functionality and personalization. They may be set by us
          or by third-party providers whose services we have added to our pages.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">3.4 Targeting and Advertising Cookies</h3>
        <p>
          These cookies may be set through our site by our advertising partners. They may be used by those companies to
          build a profile of your interests and show you relevant advertisements on other sites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Specific Cookies We Use</h2>
        <div className="overflow-x-auto mt-4 mb-6">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie Name</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Purpose</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Duration</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_threadify_session</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maintains user session state</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Session</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Essential</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_threadify_preferences</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Stores user preferences</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Functionality</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_threadify_analytics</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Collects anonymous usage data</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 years</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Analytics</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_threadify_consent</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Stores cookie consent preferences
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 year</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Essential</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. How to Control Cookies</h2>
        <p>
          You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies,
          you may still use our website though your access to some functionality and areas may be restricted.
        </p>
        <p className="mt-2">
          The specific way to refuse cookies through your web browser controls varies from browser to browser. Please
          visit your browser's help menu for more information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
          deliver advertisements, and so on. These cookies may include:
        </p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Analytics cookies from services like Google Analytics</li>
          <li>Social media cookies from platforms like Twitter, Facebook, and LinkedIn</li>
          <li>Advertising cookies from our marketing partners</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. GDPR and Cookie Compliance</h2>
        <p>Under the GDPR and similar data protection laws, we are required to:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Inform you about the cookies we use</li>
          <li>Obtain your consent before placing non-essential cookies on your device</li>
          <li>Provide you with the ability to control which cookies you accept</li>
          <li>Allow you to withdraw your consent at any time</li>
        </ul>
        <p>
          Our cookie consent banner and preferences center are designed to comply with these requirements. You can
          change your cookie preferences at any time by clicking the "Cookie Settings" button at the top of this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
          business practices. Any changes will become effective when we post the revised Cookie Policy on our website.
          We encourage you to periodically review this page for the latest information on our cookie practices.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
            info@techternet.com
          </a>
        </p>
      </div>
    </div>
  )
}
