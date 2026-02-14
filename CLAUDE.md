# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Threadily (branded as "threadify") is a free social media thread generator web app. Users paste long text and it gets split into platform-optimized posts for Twitter/X, Threads, Reddit, Mastodon, and LinkedIn. Built with Next.js 15 (App Router), React 19, TypeScript, and deployed on Vercel.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (ESLint and TypeScript errors are ignored via next.config.mjs)
- `pnpm lint` — run ESLint
- No test framework is configured

## Architecture

**App Router structure** (`app/`): The main tool lives at `/social-media-thread-generator`. The landing page is at `/`. Other routes: `/blog`, `/faq`, `/privacy`, `/terms`, `/cookies`.

**Core data flow**: User text → `lib/text-processor.ts` (smart splitting, format detection, platform-specific rules) → `components/thread-generator.tsx` (main UI) → platform-specific post output with character counting via `lib/character-counter.ts`.

**Key directories**:
- `components/` — all UI components (kebab-case files, PascalCase exports). UI primitives in `components/ui/` via shadcn/ui
- `lib/` — business logic: `text-processor.ts` (core splitting pipeline), `character-counter.ts`, `platform-features.ts`, `image-processor.ts`, `constants.ts`
- `contexts/language-context.tsx` — i18n via React Context (supports en, es, fr, de, ja)
- `hooks/` — `use-history.ts`, `use-mobile.tsx`, `use-toast.ts`

**Provider hierarchy** (in `app/layout.tsx`): `ThemeProvider` (next-themes) → `LanguageProvider` → page content + `CookieConsent`.

**UI stack**: shadcn/ui + Radix UI primitives + Tailwind CSS + lucide-react icons. Component config in `components.json`. Path aliases use `@/*` mapping to project root.

## Conventions

- **Files**: kebab-case for all `.ts`/`.tsx` files (e.g., `thread-generator.tsx`)
- **Components**: PascalCase names (e.g., `ThreadGenerator`)
- **Variables/functions**: camelCase; event handlers prefixed with `handle`
- **Types**: PascalCase, no `I` prefix for interfaces
- **Constants**: UPPER_SNAKE_CASE for primitives
- **Formatting**: 2-space indent, single quotes, semicolons, trailing commas
- **State management**: React Context only (no Redux)
- **Client components**: use `"use client"` directive only when necessary
- **AI features**: must be opt-in, preserving user content, with revert capability
