# Functional Features: HabitNova AI

This document maps out the core feature catalog, user flows, and interface requirements for HabitNova AI.

---

## 1. Feature Specifications

### A. Personalized AI Coach
*   **Description**: A chat interface that acts as an empathetic coach. It utilizes cognitive-behavioral techniques (CBT) to help users address cravings, build better habits, and understand triggers.
*   **Flow**: User initiates chat $\rightarrow$ UI loads conversation history from state $\rightarrow$ User submits text $\rightarrow$ API responds with real-time text stream containing structured coping methods.
*   **Clinical Guardrails**: If keywords matching crisis or self-harm are detected, the chat automatically pauses, displays emergency hotlines, and offers grounding exercises.

### B. Adaptive Behavior Tracking & Streak System
*   **Description**: A non-punitive tracking ledger. Users log when they perform their target habit or resist a craving.
*   **Streak Mechanics**: Traditional streaks break on failure. HabitNova AI implements a "Resilience Streak." The system counts total successful days and consecutive resistances. Logging a slip does not reset the score to 0; instead, it triggers a "Reflect & Recover" flow, preserving user motivation.

### C. Mood & Reflection Journal
*   **Description**: A daily journal prompt. The AI parses the entry to detect mood fluctuations, stress indicators, and cognitive distortions.
*   **Visual Output**: Highlights specific text phrases where the user exhibited self-blame, catastrophizing, or black-and-white thinking, along with an AI-generated cognitive reframe.

### D. Habit Risk Prediction
*   **Description**: Analyzes historical mood logs, sleep logs, and trigger logs to predict the likelihood of a relapse.
*   **Visual Indicators**: Displays a warning status (Low, Medium, High Risk) on the dashboard with a proactive checklist for high-risk days.

### E. Emergency Support Mode
*   **Description**: A prominent, single-tap red button on the sidebar.
*   **Actions**: Immediately launches full-screen calming exercises (guided box breathing, tactile instructions, and pre-selected coping tasks).

---

## 2. Interface Layout & Wireframes

### App Layout Hierarchy
```
+-------------------------------------------------------------+
| Sidebar        | Main Workspace                             |
|                |                                             |
| [Logo]         | [Header: Welcome back, User]   [Risk Score] |
|                |                                             |
| ( ) Dashboard  | +-----------------------+ +---------------+ |
| ( ) AI Coach   | | Activity / Streak Ring| | Predict Chart | |
| ( ) Journal    | |                       | |               | |
| ( ) Analytics  | +-----------------------+ +---------------+ |
|                |                                             |
| [EMERGENCY]    | +-----------------------------------------+ |
|                | | AI Nudges & Dynamic Recommendations     | |
|                | +-----------------------------------------+ |
+-------------------------------------------------------------+
```
*   **Sidebar**: Persistent navigation with a high-contrast [EMERGENCY] button for rapid grounding.
*   **Header**: Quick status indicators, profile, and the Habit Risk assessment card.
*   **Main Workspace**: Two-column layout on desktop, stacking gracefully to single-column on mobile.
