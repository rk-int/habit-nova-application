# Deployment & CI/CD Guide: HabitNova AI

This document outlines the deployment strategy, production optimization checklists, and environment settings.

---

## 1. Hosting Architecture
*   **Frontend & API**: Hosted on **Vercel** for automatic edge routing, instant previews, and global CDN delivery.
*   **Database**: Since SQLite is a flat-file database (`dev.db`), a standard serverless deployment (which is stateless) requires either:
    1.  Writing SQLite files to temporary directories (`/tmp`) for session-only data.
    2.  Connecting Prisma to a hosted PostgreSQL/MySQL instance (such as Neon, Supabase, or Google Cloud SQL) for production.
    *   *Hackathon Configuration*: The database schema uses SQLite for absolute speed and local verification. For Vercel production hosting, we provide an alternative connection string parameter in Prisma so it can be swapped to PostgreSQL/MySQL via environment variables without code modification.

---

## 2. Production Checklist

### Pre-Deployment Checks
*   [ ] Run `npm run build` to verify there are zero TypeScript compiler warnings or bundling errors.
*   [ ] Confirm Tailwind config does not import unused styles (run PurgeCSS through standard build).
*   [ ] Validate Prisma schema is pushed: `npx prisma db push`.
*   [ ] Ensure all environment variables are correctly registered in the host provider settings.

### Environment Variables
Configure these in the Vercel dashboard:

| Variable Name | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | Prisma connection string | `file:./dev.db` (SQLite) or `postgres://...` |
| `GEMINI_API_KEY` | Gemini API Auth Key | `AIzaSy...` |
| `NEXT_PUBLIC_APP_URL` | Live URL of the platform | `https://habit-nova.vercel.app` |
| `NODE_ENV` | Production environment flag | `production` |

---

## 3. GitHub Actions CI/CD Pipeline
A simple workflow file (`.github/workflows/deploy.yml`) is prepared to run:
1.  **Checkout & Cache**: Check out code and cache `node_modules` for speed.
2.  **Lint & Formatter**: Run `npm run lint` and `npx prettier --check .`.
3.  **Build Validation**: Compile TypeScript and construct the Next.js production build (`npm run build`).
4.  **Automatic Preview**: If the build succeeds, Vercel CLI automatically deploys the branch to a staging URL.
