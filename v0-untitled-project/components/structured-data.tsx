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
