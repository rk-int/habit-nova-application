# System Design Specification: HabitNova AI

This document defines the database schemas, API endpoints, component structures, and runtime sequences of the HabitNova AI platform.

---

## 1. Database Schema & ER Diagram
We use **Prisma ORM** with an **SQLite** database. The relational structure is designed to track user logs, mood levels, journaling sessions, and coaching conversations.

### Prisma Schema (`prisma/schema.prisma`)
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String        @id @default(uuid())
  email        String        @unique
  name         String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  logs         HabitLog[]
  journals     Journal[]
  chats        ChatMessage[]
  streakScore  Int           @default(0)
  maxStreak    Int           @default(0)
  lastLogDate  DateTime?
}

model HabitLog {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  habitType   String   // e.g. "Screen Time", "Caffeine", "Substance"
  severity    Int      // 1-10 craving scale
  status      String   // "Resisted" or "Slipped"
  trigger     String?  // Environmental trigger text
  notes       String?
  createdAt   DateTime @default(now())
}

model Journal {
  id             String             @id @default(uuid())
  userId         String
  user           User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  content        String             // Raw journal text
  sentimentScore Int                // 1-10 analyzed score
  coachingTip    String?            // AI-generated guidance
  createdAt      DateTime           @default(now())
  distortions    CognitiveDistortion[]
}

model CognitiveDistortion {
  id          String   @id @default(uuid())
  journalId   String
  journal     Journal  @relation(fields: [journalId], references: [id], onDelete: Cascade)
  type        String   // e.g. "Catastrophizing"
  quote       String   // Original user snippet
  reframe     String   // CBT Reframed prompt
}

model ChatMessage {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role      String   // "user" or "assistant"
  content   String
  createdAt DateTime @default(now())
}
```

---

## 2. API Route Specifications & Contracts

### A. AI Coach Chat
*   **Endpoint**: `POST /api/coach`
*   **Request Payload**:
    ```json
    {
      "message": "I'm having a strong craving to vape right now after work."
    }
    ```
*   **Response Payload (200 OK)**:
    ```json
    {
      "reply": "I understand that transition times like finishing work can trigger cravings. Let's try to substitute that habit with a brief 2-minute breathing exercise.",
      "isCrisis": false,
      "suggestedAction": {
        "title": "Box Breathing Exercise",
        "description": "Breathe in for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat 3 times.",
        "durationMinutes": 2
      }
    }
    ```

### B. Daily Habit Logging
*   **Endpoint**: `POST /api/habits`
*   **Request Payload**:
    ```json
    {
      "habitType": "Screen Time",
      "severity": 6,
      "status": "Resisted",
      "trigger": "Felt bored in the bedroom"
    }
    ```
*   **Response Payload (201 Created)**:
    ```json
    {
      "success": true,
      "logId": "a90f1110-1234-abcd-ef01-23456789abcd",
      "streakScore": 5
    }
    ```

### C. AI Reflection Journal
*   **Endpoint**: `POST /api/journal`
*   **Request Payload**:
    ```json
    {
      "content": "I feel like a complete failure today. I had a cup of coffee late afternoon even though I wanted to stop."
    }
    ```
*   **Response Payload (200 OK)**:
    ```json
    {
      "sentimentScore": 3,
      "detectedTriggers": ["afternoon slump", "coffee cravings"],
      "distortions": [
        {
          "type": "All-or-Nothing thinking",
          "quote": "I feel like a complete failure today",
          "reframe": "One late cup of coffee does not erase your morning success. Cravings are part of recovery, and tomorrow is another opportunity."
        }
      ],
      "coachingTip": "Consider substituting afternoon caffeine with a hot herbal tea or a brisk walk."
    }
    ```
