# Security Plan & Compliance: HabitNova AI

This document establishes the security guidelines, risk management matrices, and compliance safety nets for HabitNova AI.

---

## 1. Security Architecture & Threat Modeling

### Threat Vectors & Mitigations
*   **Prompt Injection**: Malicious user trying to trick the AI Coach into overriding system instructions or generating offensive content.
    *   *Mitigation*: Rigid system templates with strict input truncation. The system pre-prompt is isolated from user variables using defined XML delimiters.
*   **SQL Injection**: Malicious input targeting the database layer.
    *   *Mitigation*: Absolute reliance on Prisma ORM's auto-parameterization for database operations.
*   **Cross-Site Scripting (XSS)**: Unsanitized chat messages rendering inside the browser.
    *   *Mitigation*: Standard React auto-escaping for DOM nodes. Any HTML rendering of cognitive reframes uses structured text tokens rather than `dangerouslySetInnerHTML`.
*   **Sensitive Personal Data Exposure**: Habit logs, mood tracker entries, and journal logs represent private user data.
    *   *Mitigation*: Data stored in local SQLite db. Sensitive fields can be masked on the client side. No third-party analytical trackers are injected into the page.

---

## 2. Input Validation & Verification
All incoming API requests are validated at the gateway using Zod schemas.

*   **API Validation**: Any request failing schema validation immediately returns a `400 Bad Request` before invoking any database transactions or external AI services.
*   **String Truncation**: Text inputs for AI processing (journals, chats) are constrained to a maximum of 4000 characters to prevent buffer issues and excessive API costs.

---

## 3. Rate Limiting Strategy
To protect Gemini API quotas and server resources:
*   **Route Protection**: Next.js middleware implements a lightweight token bucket algorithm using local memory or HTTP headers.
*   **Limits**:
    *   AI Chat: Max 20 requests per minute per IP.
    *   Journal Analysis: Max 5 entries per hour per IP.
    *   Habit Logging: Max 60 entries per hour per IP.
