# Copilot Instructions for Digital Degrowth

## Build & Development Commands

- `npm install` — Install dependencies from `package-lock.json`
- `npm run dev` — Start Vite dev server (typically `http://localhost:5173`)
- `npm run build` — Create production build in `dist/`; run before handoff to catch TypeScript and Vite issues
- `npm run preview` — Serve production build locally for verification

**No automated tests or linters are configured.** Verify changes manually in `npm run dev` and confirm production compatibility with `npm run build`.

## Architecture Overview

This is a **React 18 + Vite + TypeScript SPA** with **Sanity.io CMS** integration.

### Directory Structure
- `src/pages/` — Route screens (HomePage, BlogPage, etc.)
- `src/components/common/` — Shared layout and site components (Layout, Header, Footer)
- `src/components/blog/` — Blog-specific UI components
- `src/components/ui/` — Reusable primitive components
- `src/hooks/` — Custom data-fetching hooks for Sanity (e.g., `useSettings.ts`)
- `src/sanity/` — Sanity client utilities (`lib/`), schema definitions (`schema/`), desk structure
- `src/lib/utils.ts` — Utility functions like `cn()` for Tailwind class composition
- `src/assets/styles/globals.css` — Global styles, CSS variables, font imports
- `public/` — Static assets

### Routing
- Uses **React Router v7** with declarative routes in `App.tsx`
- Top-level `Layout` component wraps all routes for consistent structure
- Route patterns: `/`, `/blog`, `/blog/:slug`, `/contact`, `/studio/*`

### Sanity Integration
- **Singleton documents**: `siteSettings`, `homeSettings`, `author` (single instance per document type)
- **Custom hooks** like `useSettings()` encapsulate data fetching from Sanity with caching
- **Schema types** defined in `src/sanity/schema/` with custom desk structure and filtered actions
- **Environment variables**: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (stored in `.env.local`)
- Data fetched client-side using `@sanity/client` and custom hooks; leverage caching patterns

### Styling System
- **Tailwind CSS 3** with custom configuration in `tailwind.config.js`
- **CSS variables** (oklch color space) in `:root` of `globals.css`: `--bg`, `--ink`, `--accent`, `--line`, `--shadow`, etc.
- **Font stack**: 
  - Display: `Cormorant Garamond` (serif)
  - Body: `IBM Plex Sans` (sans-serif)
- **Dark mode**: Enabled via class-based strategy
- **Component libraries**: shadcn/ui and Radix UI for accessible components
- **Animations**: Framer Motion for UI animations, custom Tailwind keyframes (`fade`)

## Code Conventions

### TypeScript & React
- **Strict mode enabled** (`strict: true` in tsconfig.json)
- **Function components only**, PascalCase for component names (`HomePage.tsx`, `BlogCard.tsx`)
- **Named exports** for reusable components
- **Hooks** use camelCase with `use` prefix (`usePosts.ts`, `useSettings.ts`)
- **Sanity schema files** use lower camelCase (`siteSettings.ts`, `homeSettings.ts`)

### Formatting & Style
- **2-space indentation** (JSX and all code)
- **Double quotes** for strings in source code
- **Semicolons** required
- **Path alias**: `@/*` resolves to `src/` (use `@/components/common/Layout` not `../../../components/...`)
- **Class composition**: Use `cn()` from `src/lib/utils.ts` (combines clsx + tailwind-merge) for conditional Tailwind classes:
  ```tsx
  className={cn(
    "base-classes",
    isActive && "active-classes",
    variant === "primary" && "primary-classes"
  )}
  ```

### Global Styles & Variables
- Keep **shared styles and CSS variables** in `src/assets/styles/globals.css`
- Reference CSS custom properties: `color: var(--ink)`, `background: var(--bg)`
- Use Tailwind utilities for layout and spacing; reserve CSS variables for design tokens

### Vite & Build Configuration
- **Vite configuration** in `vite.config.ts` handles React plugin, path aliases, and asset naming
- **Base path** configurable via `VITE_BASE_PATH` environment variable
- **Rollup output rules** organize images separately in `assets/images/`

## Git & Collaboration

- **Commit messages**: Short, plain-language, descriptive of visible changes (e.g., `added contact screen`, `blog page split`)
- **Pull requests**: Include summary, manual verification steps, linked issues/client requests, and screenshots for UI changes
- **Sanity changes**: Explicitly note schema updates or environment variable requirements in PR description
- **No secrets in commits**: Use `.env.local` (not committed) for Sanity tokens and sensitive config

## Environment Setup

Configuration files and their purposes:
- `.env.example` — Template for environment variables (reference only)
- `.env.local` — Local overrides (not committed); contains `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, etc.
- `vite.config.ts` — Build and dev server config, path aliases
- `sanity.config.ts` — Sanity Studio setup (project ID, dataset, plugins, schema filtering)
- `vercel.json` — Deployment configuration for Vercel

## Testing & Verification

- **No test runner configured.** To add tests later:
  - Colocate test files with features or use `src/**/*.test.tsx` pattern
  - Add npm script so contributors can run consistently
- **Manual verification**: Test changes in `npm run dev` against all affected routes
- **Production verification**: Run `npm run build` to catch TypeScript and Vite errors before handoff

## Key Dependencies & Patterns

- **@sanity/client** — Client-side Sanity data fetching
- **@portabletext/react** — Rendering rich text/block content from Sanity
- **react-router-dom** — Client-side routing
- **framer-motion** — Animations and transitions
- **react-helmet-async** — Dynamic head/meta tag management
- **tailwindcss** — Utility-first CSS framework
- **shadcn/ui** — Pre-built, accessible UI components
- **radix-ui** — Unstyled accessible component primitives

## MCP Servers

### Playwright MCP
Enables browser automation and end-to-end testing support:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-playwright"]
    }
  }
}
```

**Setup:**
1. Install: `npm install --save-dev @modelcontextprotocol/server-playwright`
2. Configure in your Copilot environment with the JSON above
3. Use for: Automated browser testing, visual validation, interaction testing

**Use cases in this project:**
- Test Sanity content rendering in the browser
- Validate responsive design across breakpoints
- Verify client-side routing and animations
- Test form submissions and user interactions

---

For more detailed project overview, see `GEMINI.md` and `AGENTS.md`.
