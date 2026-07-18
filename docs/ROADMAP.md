# Development Roadmap & Sprint Plan: HabitNova AI

This document establishes the project milestones, timeline, backlog, and sprint plan for HabitNova AI.

---

## 1. Project Milestones & Timeline

*   **Milestone 1**: Project Discovery and Scientific Foundations mapping. (Phase 1)
*   **Milestone 2**: Architecture design, Database schema syncing, and dependency installation. (Phase 2-3)
*   **Milestone 3**: UI design tokens, animations, page layouts, and wireframing. (Phase 4)
*   **Milestone 4**: Scaffold implementation, 3D landing page development, and layout coding. (Phase 5)
*   **Milestone 5**: Next.js route compiling and production testing verification. (Phase 5)

---

## 2. Sprint Plan (Sprint 1: The Core Platform)

### Goal
Implement a fully functional 3D landing page, interactive dashboard, SQLite persistence layer, and the Gemini AI Integration for Coach and Journal features.

### Sprints & Backlog Items

#### Week 1 / Sprint 1 (Sprint Objective: MVP Development)
1.  **Backlog Item 1**: Configure Next.js directory tree, Prisma client, and local SQLite schema (`prisma/schema.prisma`).
2.  **Backlog Item 2**: Implement the Apple WWDC style 3D Landing Page with floating canvas elements, lighting, and parallax.
3.  **Backlog Item 3**: Design a dark/light glassmorphic dashboard featuring:
    *   Streak rings & Habit Log button.
    *   Recharts visualization representing craving trends over time.
    *   AI Trigger Risk score card.
4.  **Backlog Item 4**: Establish the `/api/coach` route, streaming conversations and executing strict guardrails.
5.  **Backlog Item 5**: Develop the `/api/journal` page, parsing user reflection entries for cognitive reframing.
6.  **Backlog Item 6**: Create the Emergency Support Mode with immediate deep breathing widgets and redirection overlays.

---

## 3. Architecture Decision Records (ADR)

### ADR 1: SQLite for Persistence
*   **Context**: We need a fast, low-friction database for habit logging and journaling that does not require external setup or paid database provisioning.
*   **Decision**: SQLite (`dev.db` via Prisma ORM) is selected.
*   **Consequences**: The system is fully self-contained. Deployment to serverless hosting (e.g. Vercel) requires using SQLite in read/write local temporary files or pairing it with a small persistence adapter. For hackathon execution speed, local SQLite inside the workspace is optimal.

### ADR 2: Zustand for Local Client-side State
*   **Context**: We need lightweight, global state to track logs, chat messages, and UI themes across pages.
*   **Decision**: Zustand is chosen over Redux or React Context.
*   **Consequences**: Eliminates boilerplate. Zero unnecessary re-renders. Integrates seamlessly with `localStorage` for offline habit tracking.
