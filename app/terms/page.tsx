import type { Metadata } from "next"
import { BackToHome } from "@/components/back-to-home"

export const metadata: Metadata = {
  title: "Terms of Service | threadify",
  description: "Terms of Service for threadify - Learn about the rules and guidelines for using our platform.",
  alternates: {
    canonical: "https://threadify.pro/terms",
  },
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <BackToHome />

      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last updated: May 17, 2024</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to threadify. These Terms of Service ("Terms") govern your access to and use of the threadify website,
          services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be
          bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>
            <strong>"Service"</strong> refers to the threadify website, applications, and services.
          </li>
          <li>
            <strong>"User"</strong> refers to any individual who accesses or uses the Service.
          </li>
          <li>
            <strong>"Content"</strong> refers to text, images, videos, audio, and other materials that can be posted,
            uploaded, or otherwise made available through the Service.
          </li>
          <li>
            <strong>"User Content"</strong> refers to Content that Users provide to be made available through the
            Service.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Eligibility</h2>
        <p>
          You must be at least 16 years old to use the Service. By using the Service, you represent and warrant that you
          meet this eligibility requirement. If you are using the Service on behalf of an entity, organization, or
          company, you represent and warrant that you have the authority to bind that entity to these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Account Registration</h2>
        <p>
          To access certain features of the Service, you may need to register for an account. When you register, you
          agree to provide accurate, current, and complete information about yourself. You are responsible for
          maintaining the confidentiality of your account credentials and for all activities that occur under your
          account. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Content</h2>
        <p>
          You retain ownership of any User Content you submit to the Service. By submitting User Content, you grant us a
          worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate,
          distribute, and display such User Content in connection with providing and promoting the Service.
        </p>
        <p className="mt-2">
          You represent and warrant that: (i) you own or have the right to use and submit the User Content; (ii) the
          User Content does not violate the rights of any third party; and (iii) the User Content complies with these
          Terms and all applicable laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Use the Service in any way that violates any applicable law or regulation</li>
          <li>
            Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity
          </li>
          <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Use the Service to send unsolicited communications or promotions</li>
          <li>Use the Service to collect or harvest user data without consent</li>
          <li>
            Post or transmit any Content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar,
            obscene, or otherwise objectionable
          </li>
          <li>Engage in any activity that could disable, overburden, or impair the proper working of the Service</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property Rights</h2>
        <p>
          The Service and its original content (excluding User Content), features, and functionality are and will remain
          the exclusive property of threadify and its licensors. The Service is protected by copyright, trademark, and
          other laws. Our trademarks and trade dress may not be used in connection with any product or service without
          our prior written consent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Links and Services</h2>
        <p>
          The Service may contain links to third-party websites or services that are not owned or controlled by
          threadify. We have no control over, and assume no responsibility for, the content, privacy policies, or
          practices of any third-party websites or services. You acknowledge and agree that threadify shall not be
          responsible or liable for any damage or loss caused by or in connection with the use of any such third-party
          websites or services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or
          liability, for any reason, including if you breach these Terms. Upon termination, your right to use the
          Service will immediately cease. All provisions of these Terms which by their nature should survive termination
          shall survive termination, including, without limitation, ownership provisions, warranty disclaimers,
          indemnity, and limitations of liability.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
          INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
        </p>
        <p className="mt-2">
          THREADIFY DOES NOT WARRANT THAT: (A) THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY
          PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE SERVICE IS FREE OF VIRUSES
          OR OTHER HARMFUL COMPONENTS; OR (D) THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THREADIFY, ITS DIRECTORS, EMPLOYEES,
          PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
          LOSSES, RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY
          CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; AND (D)
          UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT,
          TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE
          POSSIBILITY OF SUCH DAMAGE.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless threadify and its licensees and licensors, and their
          employees, contractors, agents, officers, and directors, from and against any and all claims, damages,
          obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees)
          arising from: (a) your use of and access to the Service; (b) your violation of any term of these Terms; (c)
          your violation of any third-party right, including without limitation any copyright, property, or privacy
          right; or (d) any claim that your User Content caused damage to a third party.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
          material change will be determined at our sole discretion. By continuing to access or use our Service after
          any revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without
          regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will
          not be considered a waiver of those rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">15. Dispute Resolution</h2>
        <p>
          Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding
          arbitration in accordance with the rules of [Arbitration Association] in [Your City/State]. The arbitration
          shall be conducted in the English language. The award rendered by the arbitrator shall be final and binding
          upon the parties.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">16. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
          these Terms will remain in effect.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">17. Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between you and threadify regarding our Service and supersede all
          prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">18. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:info@techternet.com" className="text-blue-600 hover:underline dark:text-blue-400">
            info@techternet.com
          </a>
        </p>
      </div>
    </div>
  )
}
