# Hackathon Problem Statement: Breaking Bad Habits & Addiction

## 1. Context & Background
Modern digital interfaces, hyper-accessible stimulants, and persistent high-stress environments are engineered to trigger immediate dopaminergic rewards. This creates destructive habit loops (Cue $\rightarrow$ Craving $\rightarrow$ Response $\rightarrow$ Reward) that frequently escalate into behavioral addictions (such as revenge bedtime procrastination, doomscrolling) or chemical substance dependencies (such as excessive caffeine, nicotine/vaping).

Current tracking apps fail because they are **static and punitive**. When a user slips, the app resets their streak to zero, triggering shame and discouragement. Furthermore, existing solutions lack real-time context awareness, offering generic tips instead of adaptive behavioral redirection when a user is actively struggling.

---

## 2. The Problem Statement
> **How might we build a production-grade, GenAI-powered solution that helps users reduce or overcome harmful habits and addictions by providing empathetic, real-time behavioral guidance, non-punitive tracking metrics, and adaptive crisis containment?**

---

## 3. Objective & Technical Core
The objective is to design **HabitNova AI**—a clinical-grade behavioral coaching engine that uses Generative AI as its primary intelligence layer to facilitate sustained, long-term behavior change.

### Core GenAI Requirements
1.  **Adaptive AI Coach**: Real-time conversation powered by LLMs (Gemini/OpenRouter) applying Cognitive Behavioral Therapy (CBT) and BJ Fogg's Behavior Model ($B=MAP$).
2.  **Cognitive Distortion Parser**: AI-driven analysis of daily journal entries to extract emotional sentiment scores, isolate triggers, identify cognitive distortions (e.g., catastrophizing), and provide instant cognitive reframing suggestions.
3.  **Proactive Smart Nudges**: Context-aware recommendations generated dynamically when the system detects elevated relapse risks.
4.  **Clinical Safety Delimiters**: Real-time crisis detection patterns that intercept unsafe inputs and immediately route users to grounding protocols and emergency help resources.

---

## 4. Expected Outcomes & Success Metrics
*   **Resilience Maintenance**: Replacing punitive "streak resets" with a restorative "Resilience Streak" that preserves momentum post-slip.
*   **Behavioral Reduction**: Quantifiable reduction in the frequency and intensity of logged cravings over a 30-day tracking window.
*   **Emotional Reframing Velocity**: Measurable shift in journaling sentiment and reduction in detected cognitive distortions over time.
