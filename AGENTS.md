# Repository Guidelines

## Project Structure & Module Organization

This is a React 18 + Vite + TypeScript frontend for Digital Degrowth with Sanity CMS integration. Application code lives in `src/`. Route screens are in `src/pages`, shared layout and site components in `src/components/common`, blog UI in `src/components/blog`, and reusable primitives in `src/components/ui`. Data hooks are in `src/hooks`, Sanity client utilities and schemas in `src/sanity`, global styles in `src/assets/styles/globals.css`, and static assets in `public/`.

Use the `@/*` path alias for imports from `src`, for example `@/components/common/Layout`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server, usually on `http://localhost:5173`.
- `npm run build`: create the production build in `dist/`.
- `npm run preview`: serve the production build locally for verification.

There is no committed lint or test script. Run `npm run build` before handoff to catch TypeScript and Vite issues.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and strict typing. Components and pages use PascalCase names such as `HomePage.tsx` and `ContactPopup.tsx`; hooks use `useName.ts`; Sanity schema files use lower camel case such as `siteSettings.ts`. Prefer named exports for reusable components.

Formatting is two-space indentation in JSX/TSX, double quotes in source files, semicolons, and Tailwind utility classes for styling. Keep global CSS variables and shared styles in `src/assets/styles/globals.css`. Use `clsx`, `tailwind-merge`, and `cn` from `src/lib/utils.ts` when composing conditional class names.

## Testing Guidelines

Automated tests are not currently configured. If adding tests, colocate them near the feature or use `src/**/*.test.tsx`, and add an npm script so contributors can run them consistently. For now, verify changes manually in `npm run dev` and confirm production compatibility with `npm run build`.

## Commit & Pull Request Guidelines

Recent history uses short, plain-language commit messages such as `added contact screen` and `blog page split`. Keep commits focused and describe the visible change or feature area.

Pull requests should include a summary, manual verification steps, linked issues or client requests when applicable, and screenshots for UI changes. Note Sanity schema or environment variable changes explicitly.

## Security & Configuration Tips

Do not commit secrets or Sanity tokens. Keep deployment configuration in `vercel.json`, Vite options in `vite.config.ts`, and Sanity setup in `sanity.config.ts`. Use environment variables for project IDs, dataset names, base paths, and API credentials.
