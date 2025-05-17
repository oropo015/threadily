import type { Metadata } from "next"
import { BackToHome } from "@/components/back-to-home"

export const metadata: Metadata = {
  title: "Privacy Policy | threadify",
  description: "Privacy Policy for threadify - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last updated: May 17, 2024</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mt-0">GDPR Compliance Statement</h2>
          <p className="text-blue-700 dark:text-blue-400 mb-0">
            threadify is committed to ensuring compliance with the European Union's General Data Protection Regulation
            (GDPR). We respect your data protection rights and have implemented appropriate measures to safeguard your
            personal information. This Privacy Policy outlines how we collect, use, and protect your data in accordance
            with GDPR requirements.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          This Privacy Policy explains how threadify ("we," "our," or "us") collects, uses, and shares information about
          you when you use our website, services, or interact with us. We respect your privacy and are committed to
          protecting your personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">2.1 Information You Provide to Us</h3>
        <p>We may collect information you provide directly to us, including:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Account information (name, email address, password) when you register</li>
          <li>Profile information (username, profile picture, bio)</li>
          <li>Content you create, upload, or generate using our services</li>
          <li>Communications you send to us (support requests, feedback)</li>
          <li>Payment information if you purchase premium features</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">2.2 Information We Collect Automatically</h3>
        <p>When you use our services, we may automatically collect certain information, including:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Usage information (features used, content generated)</li>
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Log information (access times, pages viewed, referring website)</li>
          <li>Cookies and similar technologies (as described in our Cookie Policy)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including to:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and manage your account</li>
          <li>Send you technical notices, updates, and administrative messages</li>
          <li>Respond to your comments, questions, and customer service requests</li>
          <li>Communicate with you about products, services, and events</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, prevent, and address technical issues and fraudulent activities</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Legal Basis for Processing (GDPR)</h2>
        <p>Under the GDPR, we process your personal data based on the following legal grounds:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>
            <strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a
            specific purpose.
          </li>
          <li>
            <strong>Contract:</strong> Where processing is necessary for the performance of a contract with you or to
            take steps at your request before entering into a contract.
          </li>
          <li>
            <strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate interests or those
            of a third party, except where such interests are overridden by your interests or fundamental rights.
          </li>
          <li>
            <strong>Legal Obligation:</strong> Where processing is necessary for compliance with a legal obligation to
            which we are subject.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing and Disclosure</h2>
        <p>We may share your information in the following circumstances:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>With service providers who perform services on our behalf</li>
          <li>To comply with legal obligations</li>
          <li>To protect the rights, property, or safety of our users or others</li>
          <li>In connection with a business transaction (e.g., merger, acquisition)</li>
          <li>With your consent or at your direction</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
        <p>
          We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected,
          including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the
          appropriate retention period, we consider the amount, nature, and sensitivity of the data, the potential risk
          of harm from unauthorized use or disclosure, the purposes for which we process the data, and applicable legal
          requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>
            <strong>Access:</strong> The right to request copies of your personal data.
          </li>
          <li>
            <strong>Rectification:</strong> The right to request that we correct inaccurate or complete incomplete data.
          </li>
          <li>
            <strong>Erasure:</strong> The right to request that we delete your personal data.
          </li>
          <li>
            <strong>Restriction:</strong> The right to request that we restrict the processing of your data.
          </li>
          <li>
            <strong>Data Portability:</strong> The right to request that we transfer your data to another organization
            or directly to you.
          </li>
          <li>
            <strong>Objection:</strong> The right to object to our processing of your personal data.
          </li>
          <li>
            <strong>Withdraw Consent:</strong> The right to withdraw consent where we rely on consent to process your
            data.
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
            info@techternet.com
          </a>
          . We will respond to your request within 30 days.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against
          unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of
          transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
        <p>
          Your personal data may be transferred to, and processed in, countries other than the country in which you
          reside. These countries may have data protection laws that are different from the laws of your country. We
          ensure that appropriate safeguards are in place to protect your personal data when it is transferred
          internationally, including the use of standard contractual clauses approved by the European Commission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Children's Privacy</h2>
        <p>
          Our services are not directed to children under the age of 16. We do not knowingly collect personal
          information from children under 16. If you are a parent or guardian and believe that your child has provided
          us with personal information, please contact us so that we can delete the information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated
          Privacy Policy on our website or by other means.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Data Protection Officer</h2>
        <p>
          We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions regarding this
          Privacy Policy. If you have any questions about this Privacy Policy, including any requests to exercise your
          legal rights, please contact our DPO at{" "}
          <a href="mailto:dpo@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
            dpo@techternet.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
            info@techternet.com
          </a>
        </p>
      </div>
    </div>
  )
}
