# Technology Stack & Standards: HabitNova AI

This document establishes the technical stack, runtime constraints, accessibility guidelines, and scoring criteria targets.

---

## 1. Technical Stack Specs

### Frontend Core
*   **Framework**: Next.js (App Router) with full Server Components (RSC) integration.
*   **Language**: TypeScript configured with strict type-checking flags (`noImplicitAny: true`, `strictNullChecks: true`).
*   **Styling**: TailwindCSS with CSS variables configured for custom semantic palettes (Slate, Indigo, Amber, and Rose accents).
*   **UI Components**: `shadcn/ui` built on Radix UI primitives for keyboard-accessible overlays and modals.
*   **Animations**: Framer Motion for smooth transitions, layout changes, and slide-ins.
*   **3D Elements**: React Three Fiber (R3F) and Three.js for rendering the floating visual scene on the landing page.
*   **Icons**: Lucide React for consistent vector symbols.
*   **State Management**: Zustand with persistent storage middleware for fast, local caching of logs.
*   **Charts**: Recharts for responsive SVG rendering of habit analytics and craving tracking.

### Backend & Storage
*   **Server Engine**: Next.js Route Handlers (Node.js runtime).
*   **ORM**: Prisma client for type-safe database queries.
*   **Database**: Local SQLite database stored as a flat-file (`dev.db`), ensuring zero external infrastructure setup costs.

### AI Integration
*   **LLM Provider**: Gemini API (utilizing `gemini-2.5-flash` for high-speed, cost-effective processing of chat logs and text journals).
*   **Output Mode**: Configured with Structured JSON Outputs to guarantee schema adherence on reflection responses and action-step suggestions.

---

## 2. Performance Engineering
*   **Dynamic Code Splitting**: Heavy components like 3D canvasses and Recharts graphs are dynamically imported with `next/dynamic` to minimize initial bundle size.
*   **Font Optimization**: Custom Google Fonts (e.g., *Outfit* and *Inter*) are served directly from Next.js server storage via `next/font/google` to prevent render-blocking layout shifts.
*   **Image Compression**: All UI assets use Next.js `<Image />` tags to perform automatic WebP conversion and device-responsive scaling.
*   **Resource Pre-fetching**: Next.js `<Link>` components automatically pre-fetch page paths in the background to achieve near-instant transitions.

---

## 3. Accessibility Standards (WCAG 2.2 AA)
*   **Contrast Ratios**: Body text maintains a minimum contrast ratio of 4.5:1, and large headings maintain 3.0:1.
*   **Keyboard Operation**: All buttons, links, and forms can be fully navigated and operated using standard tab keys and shortcuts. Focus indicators are styled with clear high-visibility rings.
*   **Reduced Motion**: Framer Motion configurations use standard `useReducedMotion` hooks to deactivate intensive animations when the operating system requests reduced motion.
*   **Screen Reader Navigation**: Interactive components utilize proper ARIA landmarks, roles, and `aria-label` tags to guarantee correct interpretation by screen readers.
