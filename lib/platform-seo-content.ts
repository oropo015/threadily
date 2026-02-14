import type { PlatformKey } from "@/lib/constants"

export type PlatformSeoContent = {
  paragraphs: string[]
  tips: string[]
  faqs: { question: string; answer: string }[]
}

export const PLATFORM_SEO_CONTENT: Record<PlatformKey, PlatformSeoContent> = {
  twitter: {
    paragraphs: [
      "The X Thread Generator (formerly Twitter) helps you split long text into tweets that stay within the 280-character limit. Threads on X perform well when each post is concise and ends with a hook to the next.",
      "Paste your content, choose X as the platform, and the tool will break your text at sentence or paragraph boundaries so each tweet reads naturally. You can adjust split points manually if needed.",
      "Use our free X thread generator to turn blog posts, announcements, or long thoughts into engaging tweet threads that keep readers scrolling.",
    ],
    tips: [
      "Keep the first tweet under 280 characters with a strong hook.",
      "Use 1–3 relevant hashtags; avoid stuffing.",
      "Number threads (1/n) so readers know there’s more.",
      "End tweets mid-thought to encourage “see more” clicks.",
      "Leave a few characters for links or hashtags in the last tweet.",
    ],
    faqs: [
      {
        question: "What is the character limit for a single tweet?",
        answer: "X (Twitter) allows 280 characters per tweet. Our tool splits your text so each post stays within this limit.",
      },
      {
        question: "Can I edit the split points?",
        answer: "Yes. After generating, you can move split points or merge/split posts manually in the editor.",
      },
      {
        question: "Does the tool add thread numbering?",
        answer: "You can add numbering (e.g. 1/5, 2/5) using the platform enhancements for your thread.",
      },
    ],
  },
  threads: {
    paragraphs: [
      "The Threads thread generator formats long text into posts that fit Threads’ 500-character limit. Threads is built for conversational, story-style content, and our tool helps you split copy without losing flow.",
      "Paste your draft, select Threads, and get a series of posts sized for the platform. You can then tweak breaks and add formatting before copying to the Threads app.",
      "Whether you’re repurposing a blog post or writing a native thread, this free Threads thread generator keeps every post within limits and readable.",
    ],
    tips: [
      "Use the full 500 characters when it improves clarity.",
      "Keep a consistent tone; Threads is more casual than LinkedIn.",
      "Open with a question or bold statement to boost engagement.",
      "Use line breaks to make each post easy to scan.",
      "Consider ending the thread with a CTA or question.",
    ],
    faqs: [
      {
        question: "What is the Threads character limit?",
        answer: "Threads allows up to 500 characters per post. Our tool splits your text to stay within this limit.",
      },
      {
        question: "Can I use this for Instagram Threads?",
        answer: "Yes. This tool is designed for Meta’s Threads app (Instagram Threads), with the correct character limit.",
      },
      {
        question: "Will my thread look good on mobile?",
        answer: "Yes. We optimize for readability; you can use the preview to check how it looks before posting.",
      },
    ],
  },
  linkedin: {
    paragraphs: [
      "The LinkedIn post formatter turns long text into posts that fit LinkedIn’s 3,000-character limit while staying readable. Professional tone and clear structure matter on LinkedIn; our tool helps you keep both.",
      "Paste your article, update, or thought leadership piece and get a formatted post with sensible line breaks and length. You can then refine the copy and add hashtags before publishing.",
      "Use this free LinkedIn post formatter to create single long-form posts or to plan a short series of updates that stay within limits.",
    ],
    tips: [
      "Hook readers in the first 1–2 lines (they appear before “see more”).",
      "Use short paragraphs and line breaks for scannability.",
      "Add 3–5 relevant hashtags at the end.",
      "End with a question or CTA to encourage comments.",
      "Keep a professional tone; avoid excessive emojis unless it fits your brand.",
    ],
    faqs: [
      {
        question: "What is the LinkedIn post character limit?",
        answer: "LinkedIn allows up to 3,000 characters per post. Our formatter helps you stay within this and structure your content.",
      },
      {
        question: "Can I format a long article for LinkedIn?",
        answer: "Yes. Paste your article and the tool will format it; you can split into multiple posts if you prefer a series.",
      },
      {
        question: "Does the tool add hashtags?",
        answer: "You can add preset hashtags in the generator; we don’t auto-insert them so you keep full control.",
      },
    ],
  },
  reddit: {
    paragraphs: [
      "The Reddit post splitter divides long text into Reddit-friendly chunks. Reddit supports long posts (up to 10,000 characters in many subreddits), but readability improves with clear structure and optional markdown.",
      "Paste your content and the tool will split it at logical points. You can use the preview to see how markdown (bold, lists, etc.) will look and adjust before posting.",
      "Use this free Reddit post splitter for detailed comments, guides, or multi-part posts that stay within subreddit limits and stay easy to read.",
    ],
    tips: [
      "Use **bold** and *italic* for emphasis; Reddit supports markdown.",
      "Add a TL;DR at the top for long posts.",
      "Break long blocks into short paragraphs or bullet lists.",
      "Check the subreddit’s rules for post length and formatting.",
      "Number multi-part posts (Part 1, Part 2) for clarity.",
    ],
    faqs: [
      {
        question: "What is the Reddit character limit?",
        answer: "Reddit allows up to 10,000 characters per comment or post in most subreddits. Our splitter helps you stay within limits and structure long content.",
      },
      {
        question: "Does the tool support Reddit markdown?",
        answer: "Yes. You can use markdown in your text; the tool preserves it and platform enhancements help with Reddit-style formatting.",
      },
      {
        question: "Can I split a post into multiple comments?",
        answer: "Yes. Use the splitter to create several chunks, then paste each as a separate comment or post as needed.",
      },
    ],
  },
  mastodon: {
    paragraphs: [
      "The Mastodon post splitter helps you turn long text into posts that fit Mastodon’s 500-character limit. Many instances use similar limits, and our tool keeps each toot readable and on-topic.",
      "Paste your content and choose Mastodon; the tool splits at sentence or paragraph boundaries. You can add content warnings (CW) for sensitive topics using the platform enhancements.",
      "Use this free Mastodon post splitter for threads that respect character limits and community norms around content warnings.",
    ],
    tips: [
      "Use content warnings (CW) for sensitive or potentially triggering topics.",
      "Keep posts under 500 characters; shorter often performs better.",
      "Use hashtags for discoverability across instances.",
      "Thread with clear continuity so readers can follow the flow.",
      "Check your instance’s limit; 500 is common but can vary.",
    ],
    faqs: [
      {
        question: "What is the Mastodon character limit?",
        answer: "Most Mastodon instances use a 500-character limit per post. Our splitter keeps each post within this limit.",
      },
      {
        question: "Can I add content warnings?",
        answer: "Yes. Use the Mastodon-specific enhancements in the tool to add content warnings to your thread.",
      },
      {
        question: "Does it work with all Mastodon instances?",
        answer: "Yes. The 500-character limit is standard across most instances; you can adjust if your instance differs.",
      },
    ],
  },
  facebook: {
    paragraphs: [
      "The Facebook post formatter helps you structure long text for Facebook. Facebook allows very long posts, but shorter, well-formatted updates often get more engagement.",
      "Paste your content and the tool will suggest splits and formatting. You can keep it as one long post or split into a short series with clear paragraphs and line breaks.",
      "Use this free Facebook post formatter to create readable updates, announcements, or multi-post series that fit how people scroll on Facebook.",
    ],
    tips: [
      "Front-load the important message; many users don’t click “see more”.",
      "Use short paragraphs and line breaks for readability.",
      "1–2 hashtags are enough; Facebook is less hashtag-driven.",
      "Consider splitting long stories into a few posts for higher engagement.",
      "Add a clear CTA or question to encourage comments or shares.",
    ],
    faqs: [
      {
        question: "What is the Facebook post character limit?",
        answer: "Facebook allows up to 63,206 characters per post. Our formatter helps you structure long text and optionally split it for better engagement.",
      },
      {
        question: "Should I split long posts?",
        answer: "Shorter posts often get more engagement. Use the formatter to break long content into a few focused posts if that fits your goal.",
      },
      {
        question: "Can I format posts for Facebook Pages?",
        answer: "Yes. The same limits and formatting apply to personal profiles and Pages.",
      },
    ],
  },
}
