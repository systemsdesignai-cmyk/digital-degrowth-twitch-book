# Project Overview: digital-degrowth-v2

This project is a modern web application built with React and Vite, utilizing TypeScript for type safety. It serves as the frontend for "Digital Degrowth," integrating with Sanity.io as its headless Content Management System (CMS). The application features dynamic content rendering, client-side routing, and responsive design with Tailwind CSS. Framer Motion is used for animations, enhancing the user experience.

## Key Technologies:
*   **Frontend Framework:** React (with TypeScript)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **CMS Integration:** Sanity.io (via `@sanity/client` and custom hooks)
*   **Animations:** Framer Motion
*   **Head Management:** React Helmet Async

## Architecture and Structure:
*   **Single-Page Application (SPA):** The application is a React-based SPA with client-side routing managed by `react-router-dom`.
*   **Component-Based:** Follows a component-driven architecture, with reusable UI components found in `src/components`.
*   **Page-Based Routing:** Top-level routes are mapped to page components in `src/pages`.
*   **Custom Hooks:** Data fetching from Sanity is encapsulated in custom hooks within `src/hooks`, promoting reusability and separation of concerns.
*   **Sanity Integration:**
    *   Sanity Studio configuration is defined in `sanity.config.ts`, using environment variables for project details.
    *   Schema types are defined in `src/sanity/schema`.
    *   Specific documents like `author`, `homeSettings`, and `siteSettings` are treated as singletons in Sanity.
*   **Styling:** Global styles and CSS variables are defined in `src/assets/styles/globals.css`, leveraging Tailwind CSS for utility-first styling.
*   **Path Aliases:** The `@` alias is configured in `vite.config.ts` to resolve to the `src` directory, simplifying imports (e.g., `@/components`).

## Building and Running:

### Development:
To start the development server:
```bash
npm install
npm run dev
```
This will typically launch the application at `http://localhost:5173` (or another available port).

### Production Build:
To build the application for production:
```bash
npm install
npm run build
```
This command compiles and optimizes the project files into the `dist/` directory.

### Preview Production Build:
To locally serve the production build:
```bash
npm install
npm run build
npm run preview
```

## Development Conventions:

*   **TypeScript:** The project is written entirely in TypeScript, promoting type safety and better code maintainability.
*   **ESLint/Prettier:** Although not explicitly configured in `package.json` scripts, the presence of `package.json` suggests standard linting and formatting tools are likely used or should be integrated.
*   **Vite Configuration:** `vite.config.ts` handles build processes, React plugin integration, and path aliases.
*   **Sanity Data Fetching:** Data from Sanity should be fetched using the custom hooks provided in `src/hooks/useSettings.ts` or similar patterns, leveraging `cachedFetch` for performance.
*   **Global Styles:** Custom CSS variables and global utility classes are defined in `src/assets/styles/globals.css`.
*   **Routing:** `react-router-dom` is used for declarative routing, with a top-level `Layout` component providing consistent structure.
*   **Animations:** `framer-motion` is the preferred library for UI animations.