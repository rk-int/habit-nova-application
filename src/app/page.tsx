'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Activity, ShieldAlert, Sparkles, Sun, Moon } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === 'dark';

  return (
    <main className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden font-sans transition-colors duration-500 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'
    }`}>
      
      {/* Background Video Layer - 100% full screen focus, clear and stunning */}
      {mounted && (
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-1000 ${
            isDark ? 'opacity-90' : 'opacity-98'
          }`}
        >
          <source src="/AI_platform_hero_video_1080p_202607181210.mp4" type="video/mp4" />
        </video>
      )}

      {/* Ultra-subtle vignette legibility overlay mask */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40' 
          : 'bg-gradient-to-t from-slate-50 via-transparent to-slate-50/30'
      }`} />

      {/* Navigation Header - Minimal & Floating */}
      <header className="relative z-10 mx-auto max-w-7xl w-full px-6 py-6 flex items-center justify-between">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border transition duration-300 ${
          isDark ? 'bg-slate-950/40 border-white/5' : 'bg-white/40 border-slate-200/50'
        }`}>
          <Brain className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <span className={`font-display font-bold text-sm tracking-tight ${
            isDark 
              ? 'bg-gradient-to-r from-indigo-200 via-slate-200 to-teal-200 bg-clip-text text-transparent' 
              : 'text-slate-900'
          }`}>
            HabitNova AI
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Theme Selector Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition duration-200 flex items-center justify-center backdrop-blur-md ${
                isDark 
                  ? 'bg-slate-950/40 border-white/5 text-amber-400 hover:bg-slate-950/60' 
                  : 'bg-white/40 border-slate-200/50 text-slate-700 hover:bg-white shadow-sm'
              }`}
              aria-label="Toggle visual theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <Link 
            href="/dashboard"
            className={`px-5 py-2 rounded-full text-xs font-semibold border transition duration-200 backdrop-blur-md ${
              isDark 
                ? 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 shadow-sm'
            }`}
          >
            Launch Portal
          </Link>
        </div>
      </header>

      {/* Hero Section - Highly minimal typography with deep text shadows to highlight background animation */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto py-16">
        
        {/* Dynamic Use-case Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border backdrop-blur-sm ${
          isDark 
            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' 
            : 'bg-indigo-500/5 border-indigo-500/10 text-indigo-700'
        }`}>
          <Sparkles className="h-3 w-3" />
          AI-Powered Behavioral Recovery Engine
        </div>

        {/* Hero Title with drop shadows */}
        <h1 className={`font-display text-4xl md:text-6xl font-black tracking-tight mb-4 leading-[1.08] select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          Reframe Your Habits.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            Restore Your Resilience.
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-xs md:text-sm max-w-lg mb-8 leading-relaxed font-normal filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${
          isDark ? 'text-slate-300' : 'text-slate-800'
        }`}>
          HabitNova AI combines cognitive-behavioral science with real-time AI coaching to help you understand triggers, reframe cravings, and shift addictive loops without the shame.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center w-full max-w-xs">
          <Link
            href="/dashboard"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 group ${
              isDark 
                ? 'bg-white text-slate-950 hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            Start Free Journey
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Value Proposition Deck - Highly transparent, crisp and low profile to expose video */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className={`p-4 rounded-xl border flex items-start gap-3 backdrop-blur-md transition duration-300 ${
          isDark 
            ? 'bg-slate-950/20 border-white/5 text-slate-200 hover:bg-slate-950/45' 
            : 'bg-white/20 border-slate-200/40 text-slate-800 hover:bg-white/40'
        }`}>
          <Brain className={`h-8 w-8 flex-shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <div>
            <h3 className={`font-display text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Empathetic AI Coach</h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              Real-time CBT conversation reframes screen doomscrolling and addictive loops instantly.
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border flex items-start gap-3 backdrop-blur-md transition duration-300 ${
          isDark 
            ? 'bg-slate-950/20 border-white/5 text-slate-200 hover:bg-slate-950/45' 
            : 'bg-white/20 border-slate-200/40 text-slate-800 hover:bg-white/40'
        }`}>
          <Activity className={`h-8 w-8 flex-shrink-0 mt-0.5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
          <div>
            <h3 className={`font-display text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Resilience Streaks</h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              Non-punitive tracking score. slips drop status by half to sustain recovery motivation.
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl border flex items-start gap-3 backdrop-blur-md transition duration-300 ${
          isDark 
            ? 'bg-slate-950/20 border-white/5 text-slate-200 hover:bg-slate-950/45' 
            : 'bg-white/20 border-slate-200/40 text-slate-800 hover:bg-white/40'
        }`}>
          <ShieldAlert className={`h-8 w-8 flex-shrink-0 mt-0.5 ${isDark ? 'text-rose-500' : 'text-rose-600'}`} />
          <div>
            <h3 className={`font-display text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Emergency Grounding</h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              1-click grounding loops offering box breathing stabilizers and active trigger blocks.
            </p>
          </div>
        </div>

      </section>

      <footer className="relative z-10 py-4 border-t border-white/5 text-center text-[10px] text-slate-500">
        © {new Date().getFullYear()} HabitNova AI. Built for hackathon evaluation on behavioral resilience.
      </footer>
    </main>
  );
}
