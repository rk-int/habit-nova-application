'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Activity, ShieldAlert, HeartHandshake, Sparkles, Sun, Moon } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  return (
    <main className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden font-sans transition-colors duration-500 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'
    }`}>
      
      {/* Background Video Layer - Higher visibility (opacity-65) */}
      {mounted && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-1000 ${
            isDark ? 'opacity-55' : 'opacity-65'
          }`}
        >
          <source src="/AI_platform_hero_video_1080p_202607181210.mp4" type="video/mp4" />
        </video>
      )}

      {/* Theme-Adaptive Legibility Mask */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-b from-slate-950/45 via-slate-950/65 to-slate-950' 
          : 'bg-gradient-to-b from-slate-50/45 via-slate-50/65 to-slate-50'
      }`} />
      
      {/* Aurora overlays */}
      <div className={`absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full pointer-events-none transition-opacity duration-500 ${
        isDark ? 'bg-indigo-500/10 blur-[120px]' : 'bg-indigo-500/5 blur-[100px]'
      }`} />
      <div className={`absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full pointer-events-none transition-opacity duration-500 ${
        isDark ? 'bg-teal-500/10 blur-[120px]' : 'bg-teal-500/5 blur-[100px]'
      }`} />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto max-w-7xl w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className={`h-7 w-7 ${isDark ? 'text-indigo-500' : 'text-indigo-600'}`} />
          <span className={`font-display font-bold text-xl tracking-tight ${
            isDark 
              ? 'bg-gradient-to-r from-indigo-200 via-slate-200 to-teal-200 bg-clip-text text-transparent' 
              : 'text-slate-900'
          }`}>
            HabitNova AI
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Selector Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition duration-200 flex items-center justify-center ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
              aria-label="Toggle visual theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <Link 
            href="/dashboard"
            className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition duration-200 ${
              isDark 
                ? 'glass-panel border-white/10 text-white hover:bg-white/5' 
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            Launch Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto py-16">
        
        {/* Dynamic Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-md border ${
          isDark 
            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' 
            : 'bg-indigo-500/5 border-indigo-500/10 text-indigo-700'
        }`}>
          <Sparkles className="h-3.5 w-3.5" />
          Empathetic Generative Behavioral Support
        </div>

        {/* Hero Title */}
        <h1 className={`font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08] select-none ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Reframe Your Habits.<br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
            Restore Your Resilience.
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-sm md:text-lg max-w-2xl mb-10 leading-relaxed font-light ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          HabitNova AI combines cognitive-behavioral science with real-time AI coaching to help you moderation-track, understand cravings, and shift addictive behaviors without the shame.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none">
          <Link
            href="/dashboard"
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 group ${
              isDark 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            Start Free Journey
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all border ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 backdrop-blur-md' 
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            Explore Methodology
          </Link>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className={`p-8 rounded-2xl border transition duration-300 ${
          isDark 
            ? 'glass-panel border-white/5 text-slate-100' 
            : 'bg-white/80 border-slate-200/80 text-slate-800 shadow-sm hover:shadow-md backdrop-blur-md'
        }`}>
          <Brain className={`h-10 w-10 mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <h3 className={`font-display text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Personalized AI Coach</h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Real-time, interactive CBT conversation that helps identify cognitive patterns and structures instant environment modifiers.
          </p>
        </div>
        
        <div className={`p-8 rounded-2xl border transition duration-300 ${
          isDark 
            ? 'glass-panel glass-panel-teal border-white/5 text-slate-100' 
            : 'bg-white/80 border-slate-200/80 text-slate-800 shadow-sm hover:shadow-md backdrop-blur-md'
        }`}>
          <Activity className={`h-10 w-10 mb-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
          <h3 className={`font-display text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Resilience Streaks</h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Non-punitive progression score. Slip-ups trigger recovery recommendations instead of zeroing your metrics.
          </p>
        </div>
        
        <div className={`p-8 rounded-2xl border transition duration-300 ${
          isDark 
            ? 'glass-panel glass-panel-danger border-white/5 text-slate-100' 
            : 'bg-white/80 border-slate-200/80 text-slate-800 shadow-sm hover:shadow-md backdrop-blur-md'
        }`}>
          <ShieldAlert className={`h-10 w-10 mb-4 ${isDark ? 'text-rose-500' : 'text-rose-600'}`} />
          <h3 className={`font-display text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Emergency Support</h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
