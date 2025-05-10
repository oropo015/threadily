# Threadify

## Project Overview
Threadify is a sophisticated social media content creation and optimization tool built with Next.js. It helps users create, enhance, and optimize content for various social media platforms, with a particular focus on thread-based content.

## Tech Stack
- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context
- **Package Manager**: PNPM

## Core Features
1. **Thread Generation**
   - AI-powered thread content generation
   - Thread post organization and management
   - Character counting and limits
   - Split point editing

2. **Content Enhancement**
   - AI thread enhancement
   - Tone analysis
   - Platform-specific optimizations
   - Media optimization

3. **Media Management**
   - Image optimization
   - Media upload and preview
   - Font optimization
   - CSS optimization

4. **Platform-Specific Features**
   - LinkedIn carousel generation
   - Twitter thread numbering
   - Reddit markdown enhancement
   - Mastodon content warnings

## Project Structure
```
threadify/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── thread-generator/ # Thread generation components
│   └── thread-enhancer/  # Thread enhancement components
├── contexts/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

## Development Guidelines
1. **Component Organization**
   - Feature-based organization in components directory
   - Reusable UI components in ui/ subdirectory
   - Clear separation of concerns

2. **Code Style**
   - TypeScript strict mode
   - Functional components with hooks
   - Tailwind CSS for styling
   - Proper error handling and boundaries

3. **Performance**
   - Image optimization
   - Lazy loading
   - Code splitting
   - Resource hints

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Color contrast
   - Screen reader support

## Future Plans
1. Enhanced AI capabilities for content generation
2. Additional platform integrations
3. Advanced analytics and insights
4. Collaborative features
5. Performance optimizations

## Getting Started
1. Install dependencies: `pnpm install`
2. Run development server: `pnpm dev`
3. Build for production: `pnpm build`
4. Start production server: `pnpm start`

## Contributing
1. Follow the established code style and naming conventions
2. Write clear commit messages
3. Add appropriate tests
4. Update documentation as needed 