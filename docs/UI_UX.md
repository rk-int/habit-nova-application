# UI/UX Design System Specification: HabitNova AI

This document establishes the design principles, color systems, motion timelines, and page hierarchies for HabitNova AI.

---

## 1. Visual Token System & Theme Specifications

We employ a **Glassmorphic / Dark-SaaS** aesthetic inspired by modern macOS interfaces:
*   **Backgrounds**: Translucent blur panels with sub-border glow highlights.
*   **Colors**:
    *   *Primary/Neutral*: Deep obsidian slate (`bg-slate-950` / `#020617` base).
    *   *Accent (Calming)*: Soft teal and indigo (`#0d9488` / `#4f46e5` for focus states).
    *   *System Status (Warning/Urgency)*:
        *   Amber/Orange (`#d97706` for moderate craving triggers).
        *   Rose/Red (`#e11d48` for emergency status and high risk logs).
*   **Border Radius**: Highly rounded elements (`rounded-2xl` / `rounded-3xl` for cards, `rounded-full` for interactive pills).
*   **Backdrop Blur**: `backdrop-blur-md` and `backdrop-filter` to support floating layouts.

---

## 2. Typography Scale
We use **Outfit** as our header font (for premium, clean branding) and **Inter** for readability in body copy.
*   **Hero Display**: `font-display text-5xl md:text-7xl font-bold tracking-tight`
*   **Section Title**: `text-2xl md:text-3xl font-semibold tracking-wide`
*   **Card Header**: `text-lg font-medium`
*   **Body Copy**: `text-sm md:text-base text-slate-300 leading-relaxed`

---

## 3. Motion Guidelines & Animation Mappings

We use **Framer Motion** to deliver smooth, high-fidelity micro-interactions:
*   **Page Transitions**: Fade-in with slight vertical translation.
*   **Interactive Hover Rings**: Subtle card scaling with glow radius changes.
*   **3D Landing Scene Particles**: Random rotational floating vectors powered by Three.js render frame loops. Mouse movement triggers relative camera shifts (parallax effect).
*   **Guided Breathing Circle (Emergency Mode)**: Scale cycles from $1.0 \rightarrow 1.6 \rightarrow 1.0$ synchronized with a 4s count-down timer.
