# threadify

**Free, open-source social media thread generator.** Paste long-form text and instantly split it into platform-optimized posts for X (Twitter), Threads, LinkedIn, Reddit, Mastodon, and Facebook.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://threadify.pro)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Live at [threadify.pro](https://threadify.pro)**

---

## Table of Contents

- [Features](#features)
- [Supported Platforms](#supported-platforms)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Routes](#routes)
- [Internationalization](#internationalization)
- [Theming](#theming)
- [AI Features](#ai-features)
- [Blog](#blog)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Smart text splitting** — respects semantic boundaries (headings, code blocks, lists, quotes) so posts never break mid-thought
- **Platform-aware character counting** — Twitter URLs counted as 23 chars (t.co shortener), media slots deducted, per-platform limits enforced
- **AI-powered suggestions** — opt-in hashtag recommendations, engagement boosters, sentiment analysis, and tone detection via HuggingFace
- **Content repurposing** — convert a post written for one platform into the right format for another (tone, length, hashtags, markdown)
- **Drag-and-drop reorder** — rearrange generated posts with dnd-kit
- **Undo / redo** — full history stack (up to 100 actions)
- **Media management** — upload, preview, and optimize images; alt-text editor for SEO
- **Find & replace** — search and replace across your thread text
- **Manual split-point editing** — fine-tune exactly where posts break
- **Dark mode** — system-aware with manual toggle, persisted in localStorage
- **Multi-language UI** — English, Spanish, French, German, and Japanese
- **PWA ready** — service worker, web manifest, offline-capable
- **SEO optimized** — JSON-LD structured data, Open Graph, Twitter Cards, canonical URLs, dynamic sitemap
- **Privacy first** — all text processing happens client-side; no content is stored on servers
- **Responsive design** — mobile-first layout with tailored breakpoints
- **Cookie consent** — GDPR-compliant banner with granular preferences

---

## Supported Platforms

| Platform | Character Limit | Highlights |
|----------|---------------:|------------|
| **X (Twitter)** | 280 | Thread numbering (1/n), 1-3 hashtags, hook-first formatting |
| **Threads** | 500 | Conversational tone, Instagram-aesthetic styling |
| **LinkedIn** | 3,000 | Professional tone, 3-5 hashtags, call-to-action suggestions |
| **Reddit** | 10,000 | Markdown formatting (bold, italic, headers), auto TL;DR for long posts |
| **Mastodon** | 500 | Content-warning detection and formatting |
| **Facebook** | 63,206 | Short-form optimization for engagement, emoji-friendly |

Each platform has dedicated character counting rules, formatting helpers, and best-practice tips surfaced in the UI.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router, Server Components) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.4 + CSS variables |
| **Components** | shadcn/ui + Radix UI primitives |
| **Icons** | lucide-react |
| **Theme** | next-themes (light / dark / system) |
| **Forms** | React Hook Form + Zod validation |
| **Drag & Drop** | @dnd-kit |
| **Markdown** | remark + remark-html + gray-matter |
| **Image Processing** | sharp |
| **Charts** | recharts |
| **Toasts** | sonner |
| **AI / ML** | HuggingFace Inference API (optional) |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **pnpm** (install via `npm install -g pnpm` if needed)

### Installation

```bash
# Clone the repository
git clone https://github.com/oropo015/threadily.git
cd threadily

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables (Optional)

No environment variables are required to run the app. AI features fall back to local keyword-based analysis when no API key is provided. To enable full HuggingFace AI capabilities, create a `.env.local` file:

```env
HUGGINGFACE_API_KEY=your_api_key_here
```

---

## Project Structure

```
threadily/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (providers, metadata, fonts)
│   ├── page.tsx                    # Landing page
│   ├── globals.css                 # Global styles & CSS variables
│   ├── actions/                    # Server actions (AI features)
│   ├── blog/                       # Blog system (listing, [slug], tag filtering)
│   ├── social/                     # Platform-specific tool pages
│   │   └── [slug]/page.tsx         # Dynamic route → 6 platform pages
│   ├── social-media-thread-generator/  # SEO redirect route
│   ├── faq/                        # FAQ page
│   ├── privacy/                    # Privacy policy
│   ├── terms/                      # Terms of service
│   ├── cookies/                    # Cookie policy
│   └── migrate/                    # Data migration utility
│
├── components/                     # React components (kebab-case files)
│   ├── ui/                         # shadcn/ui primitives (30+ components)
│   ├── thread-generator.tsx        # Main thread editor & splitter
│   ├── ai-thread-enhancer.tsx      # AI hashtag & engagement panel
│   ├── tone-analyzer.tsx           # Sentiment & tone analysis
│   ├── content-repurposing-tool.tsx # Cross-platform content converter
│   ├── media-uploader.tsx          # Image upload & management
│   ├── find-replace-tool.tsx       # Find & replace in text
│   ├── split-point-editor.tsx      # Manual split-point adjustment
│   ├── sortable-thread-post.tsx    # Drag-to-reorder posts
│   ├── platform-enhancements.tsx   # Platform-specific tips
│   ├── mastodon-content-warning.tsx # Mastodon CW support
│   ├── reddit-markdown-enhancer.tsx # Reddit markdown preview
│   ├── twitter-thread-numbering.tsx # Thread numbering format
│   ├── linkedin-carousel-generator.tsx # Carousel slide editor
│   ├── header.tsx                  # Navigation header
│   ├── footer.tsx                  # Footer
│   ├── landing-page.tsx            # Landing page (client)
│   ├── landing-page-server.tsx     # Landing page (server-rendered)
│   ├── cookie-consent.tsx          # GDPR cookie banner
│   ├── structured-data.tsx         # JSON-LD schema markup
│   ├── theme-provider.tsx          # Dark/light theme provider
│   ├── mode-toggle.tsx             # Theme switcher
│   └── performance-monitor.tsx     # Core Web Vitals tracking
│
├── lib/                            # Core business logic
│   ├── text-processor.ts           # Smart text splitting pipeline
│   ├── character-counter.ts        # Platform-specific character counting
│   ├── constants.ts                # Platform definitions & limits
│   ├── platform-features.ts        # Thread numbering, markdown, CW, carousel
│   ├── image-processor.ts          # Image optimization (sharp)
│   ├── huggingface-service.ts      # AI service orchestrator
│   ├── huggingface-service/        # AI modules (sentiment, hashtags, etc.)
│   ├── import-export.ts            # Thread export (JSON/text)
│   ├── blog-utils.ts               # Markdown blog parsing
│   └── utils.ts                    # General utilities
│
├── contexts/
│   └── language-context.tsx        # i18n provider (en, es, fr, de, ja)
│
├── hooks/
│   ├── use-history.ts              # Undo/redo state management
│   └── use-mobile.tsx              # Mobile breakpoint detection
│
├── blog/                           # Blog content (Markdown files)
├── public/                         # Static assets, PWA manifest, icons
├── middleware.ts                   # Route redirects & URL handling
├── next.config.mjs                 # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── components.json                 # shadcn/ui configuration
└── package.json                    # Dependencies & scripts
```

---

## Architecture

### Core Data Flow

```
User text input
    │
    ▼
text-processor.ts ── splitIntoSegments() → detect headings, code, quotes, lists, paragraphs
    │
    ▼
smartSplitText() ── split at semantic boundaries respecting platform character limits
    │
    ▼
formatForPlatform() ── apply platform-specific rules (numbering, markdown, CW, hashtags)
    │
    ▼
thread-generator.tsx ── render posts with character counters, drag-and-drop, editing tools
    │
    ▼
Platform-optimized output ready to copy
```

### Provider Hierarchy

```
<html>
  <ThemeProvider>          ← next-themes (light/dark/system)
    <LanguageProvider>     ← i18n context (5 languages)
      {page content}
    </LanguageProvider>
  </ThemeProvider>
  <CookieConsent />        ← GDPR banner (independent)
</html>
```

### Key Design Decisions

- **App Router** with Server Components for SEO-critical pages (landing, blog, legal) and Client Components for interactive tools
- **React Context only** for state management — no Redux or external stores
- **Client-side text processing** — no user content leaves the browser
- **AI features are opt-in** — the app is fully functional without any API keys
- **shadcn/ui** for consistent, accessible UI primitives with Radix under the hood

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature overview and platform cards |
| `/social/x-thread-generator` | X (Twitter) thread generator |
| `/social/threads-thread-generator` | Threads thread generator |
| `/social/linkedin-post-formatter` | LinkedIn post formatter |
| `/social/reddit-post-splitter` | Reddit post splitter |
| `/social/mastodon-post-splitter` | Mastodon post splitter |
| `/social/facebook-post-formatter` | Facebook post formatter |
| `/social-media-thread-generator` | SEO route — redirects to platform page via `?platform=` param |
| `/social` | Redirects to `/social-media-thread-generator` |
| `/blog` | Blog listing page |
| `/blog/[slug]` | Individual blog post |
| `/blog/tag/[tag]` | Posts filtered by tag |
| `/faq` | Frequently asked questions |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/cookies` | Cookie policy |

---

## Internationalization

The app supports 5 languages via React Context (`contexts/language-context.tsx`):

| Code | Language |
|------|----------|
| `en` | English (default) |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `ja` | Japanese |

Translations cover the landing page, navigation, editor labels, platform names, error/success messages, and footer. Language preference is persisted in localStorage and can be synced from the URL.

---

## Theming

- **Engine:** next-themes with `class` attribute strategy
- **Modes:** Light, Dark, System (auto-detect)
- **Storage:** `threadify-theme` key in localStorage
- **Colors:** CSS custom properties defined in `globals.css`, consumed by Tailwind
- **Primary color:** `#4169E1` (royal blue)

Toggle between themes via the sun/moon button in the header.

---

## AI Features

All AI features are **opt-in** and degrade gracefully to local keyword-based analysis when no API key is configured.

| Feature | Description |
|---------|-------------|
| **Hashtag Suggestions** | Recommends relevant hashtags based on post content, with platform-specific defaults |
| **Engagement Boosters** | Suggests calls-to-action, questions, and interaction prompts tailored to each platform |
| **Sentiment Analysis** | Detects positive, negative, neutral, or mixed tone with confidence scores |
| **Emotion Detection** | Identifies joy, sadness, anger, fear, surprise, or disgust in text |
| **Tone Analysis** | Evaluates formality (formal/neutral/casual) and readability (simple/average/complex) |
| **Content Repurposing** | Converts content from one platform's style to another (e.g., tweet → LinkedIn post) |

AI services are implemented as Next.js Server Actions in `app/actions/ai-actions.ts`, powered by `lib/huggingface-service.ts`.

---

## Blog

The blog uses Markdown files stored in the `blog/` directory, rendered with `remark` and `remark-html`, with frontmatter parsed by `gray-matter`.

Published articles include:
- AI-Powered Content Creation Strategies
- Building a Personal Brand with Threaded Content
- Content Repurposing: One Idea, Multiple Platforms
- Leveraging AI for Content Creation
- Mastering Thread Creation for Maximum Engagement
- Maximizing Engagement with Social Media Threads
- The Science of Virality: Why Content Spreads

---

## Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes following the project conventions:
   - **Files:** kebab-case (e.g., `my-component.tsx`)
   - **Components:** PascalCase (e.g., `MyComponent`)
   - **Variables/functions:** camelCase; event handlers prefixed with `handle`
   - **Constants:** UPPER_SNAKE_CASE
   - **Formatting:** 2-space indent, single quotes, semicolons, trailing commas
4. Commit with a clear message
5. Open a pull request

---

## License

This project is open source. See the repository for license details.
