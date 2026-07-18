'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Activity, ShieldAlert, HeartHandshake, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 font-sans">
      
      {/* Background Video Layer */}
      {mounted && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 transition-opacity duration-1000"
        >
          <source src="/AI_platform_hero_video_1080p_202607181210.mp4" type="video/mp4" />
        </video>
      )}

      {/* Glassmorphic Gradient Overlay to ensure readability and WCAG contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950 z-0 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto max-w-7xl w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-indigo-500" />
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-200 via-slate-200 to-teal-200 bg-clip-text text-transparent">
            HabitNova AI
          </span>
        </div>
        
        <Link 
          href="/dashboard"
          className="px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs font-semibold hover:bg-white/5 transition duration-200"
        >
          Launch Portal
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto py-16">
        
        {/* Dynamic Nudge Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          Empathetic Generative Behavioral Support
        </div>

        {/* Dynamic Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] select-none">
          Reframe Your Habits.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-teal-300 bg-clip-text text-transparent">
            Restore Your Resilience.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
          HabitNova AI combines cognitive-behavioral science with real-time AI coaching to help you moderation-track, understand cravings, and shift addictive behaviors without the shame.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 group"
          >
            Start Free Journey
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-medium backdrop-blur-md transition-all"
          >
            Explore Methodology
          </Link>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-8 rounded-2xl border border-white/5">
          <Brain className="h-10 w-10 text-indigo-400 mb-4" />
          <h3 className="font-display text-lg font-bold text-white mb-2">Personalized AI Coach</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Real-time, interactive CBT conversation that helps identify cognitive patterns and structures instant environment modifiers.
          </p>
        </div>
        
        <div className="glass-panel glass-panel-teal p-8 rounded-2xl border border-white/5">
          <Activity className="h-10 w-10 text-teal-400 mb-4" />
          <h3 className="font-display text-lg font-bold text-white mb-2">Resilience Streaks</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Non-punitive progression score. Slip-ups trigger recovery recommendations instead of zeroing your metrics.
          </p>
        </div>
        
        <div className="glass-panel glass-panel-danger p-8 rounded-2xl border border-white/5">
          <ShieldAlert className="h-10 w-10 text-rose-500 mb-4" />
          <h3 className="font-display text-lg font-bold text-white mb-2">Emergency Support</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            One-click panic sequence rendering cyclic box breathing widgets and instant trigger redirection protocols.
          </p>
        </div>

      </section>

      <footer className="relative z-10 py-6 border-t border-white/5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} HabitNova AI. Built for hackathon evaluation on behavioral resilience.
      </footer>
    </main>
  );
}
