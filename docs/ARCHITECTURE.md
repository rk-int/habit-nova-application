# System Architecture: HabitNova AI

This document details the system design, runtime interactions, data flow, and components of HabitNova AI.

---

## 1. Architectural Overview
HabitNova AI is designed as a monolithic Next.js application deploying both server-side components (SSR) and client-side interactive structures. This design minimizes network overhead, streamlines database access, and provides clean deployment paths to Vercel/Cloud Run.

### Components
1.  **Presentation Layer**: Built with React (App Router), styled with TailwindCSS and Radix UI components (shadcn/ui). Includes Framer Motion for UI animations and React Three Fiber (R3F) for the 3D visual engine on the landing page.
2.  **State Management Layer**: Local component state managed via React hooks; global application state (user preferences, streak logic, active session logs) managed using **Zustand** with local storage persistence.
3.  **Data Access Layer**: Database queries are managed via **Prisma ORM** connecting to a local **SQLite** database, optimizing serverless execution times and minimizing setup complexity.
4.  **AI Engine Layer**: Outbound HTTP requests to the Gemini API, utilizing structured JSON output parsing to ensure responses are conformant to UI configurations.

---

## 2. Directory Architecture & Separation of Concerns
The application follows a **feature-first** organization structure within the App Router:
*   `src/app/api`: Server-only routes serving JSON endpoints for AI Coach chat and journal reflection processing.
*   `src/components`: Separation between generic UI primitives (`/ui`) and feature-specific components (`/landing`, `/dashboard`).
*   `src/lib`: Stateless service layers (e.g. database client instances, Gemini wrappers).

---

## 3. Data Flow Pipelines

### A. Habit Log Pipeline
1.  User clicks "+ Log Habit" on the dashboard.
2.  A local Zustand store updates immediate UI state (optimistic rendering).
3.  An API call is dispatched to `/api/habits` with the payload (mood, cravings level, timestamp).
4.  The server validates the input with Zod, inserts the row via Prisma into SQLite, and returns a 201 response.
5.  If cravings are logged above a threshold of 7/10, the server triggers a **Smart Nudge** generator in the background to return a customized alternative action.

### B. Reflection Journal Pipeline
1.  User submits a reflection journal entry.
2.  Frontend streams the text input to `/api/journal`.
3.  The server fetches historical entries for the past 7 days from SQLite.
4.  A structured prompt is compiled and sent to Gemini.
5.  Gemini analyzes:
    *   *Mood Score* (1-10)
    *   *Cognitive Distortion identified* (e.g., "Catastrophizing", "All-or-Nothing thinking")
    *   *Empathetic re-framing suggestions*
6.  The server saves the analyzed data into the SQLite database and returns the structured JSON to the client.
7.  The dashboard dynamically re-renders charts and trigger lists based on this analysis.

---

## 4. Performance & Caching
*   **Static vs. Dynamic Rendering**: The landing page is statically optimized. The dashboard and tracking components use Next.js dynamic routing with SSR.
*   **Asset Lazy Loading**: Three.js components are dynamically imported (`next/dynamic` with `ssr: false`) to avoid blocking the initial page load bundle.
*   **SQLite Caching**: Prisma connection pooling is configured to maintain warm connections during server execution.
