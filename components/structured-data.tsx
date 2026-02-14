export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Threadify",
    url: "https://threadify.pro",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://threadify.pro/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description:
      "Create perfect social media threads for Twitter, Instagram, and LinkedIn. Split text, add hashtags, and optimize your content.",
    publisher: {
      "@type": "Organization",
      name: "Threadify",
      logo: {
        "@type": "ImageObject",
        url: "https://threadify.pro/logo.png",
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function SoftwareApplicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Threadify",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function BlogPostStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  imageUrl,
  authorName,
  url,
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  imageUrl: string
  authorName: string
  url: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Threadify",
      logo: {
        "@type": "ImageObject",
        url: "https://threadify.pro/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function FAQPageStructuredData({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function HowToStructuredData({
  name = "How to Create a Social Media Thread",
  description = "Use Threadify to split your long text into perfectly-sized posts for Twitter, Threads, LinkedIn, and more.",
}: {
  name?: string
  description?: string
} = {}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: [
      {
        "@type": "HowToStep",
        name: "Paste your text",
        text: "Paste or type your long-form content into the Threadify editor.",
      },
      {
        "@type": "HowToStep",
        name: "Select your platform",
        text: "Choose the social media platform you want to create threads for, such as Twitter/X, Threads, LinkedIn, Reddit, or Mastodon.",
      },
      {
        "@type": "HowToStep",
        name: "Generate your thread",
        text: "Click Generate Thread to automatically split your content into optimally-sized posts with proper character counts.",
      },
      {
        "@type": "HowToStep",
        name: "Copy and share",
        text: "Review your thread, make any edits, then copy the posts to share on your chosen platform.",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
