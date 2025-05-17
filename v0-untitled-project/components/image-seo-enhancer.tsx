import type { Metadata } from "next"

interface ImageSEOProps {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  pageUrl: string
  publishDate: string
  modifiedDate?: string
  authorName: string
}

export function generateImageSEOMetadata({
  title,
  description,
  imageUrl,
  imageAlt,
  pageUrl,
}: Omit<ImageSEOProps, "publishDate" | "authorName" | "modifiedDate">): Metadata {
  return {
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    },
  }
}

export function ImageStructuredData({
  title,
  description,
  imageUrl,
  imageAlt,
  pageUrl,
  publishDate,
  modifiedDate,
  authorName,
}: ImageSEOProps) {
  const imageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: imageUrl,
    description: imageAlt,
    name: title,
    datePublished: publishDate,
    ...(modifiedDate && { dateModified: modifiedDate }),
    author: {
      "@type": "Person",
      name: authorName,
    },
    isPartOf: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageStructuredData) }} />
}
