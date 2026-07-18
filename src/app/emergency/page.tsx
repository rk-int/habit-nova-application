'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { AlertTriangle, ShieldCheck, HeartPulse, RefreshCw } from 'lucide-react';

export default function EmergencyPage() {
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  // Breathing Box Timer Loop (4 seconds per phase)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Transition phase
          setBreathPhase((current) => {
            switch (current) {
              case 'Inhale':
                return 'Hold (Full)';
              case 'Hold (Full)':
                return 'Exhale';
              case 'Exhale':
                return 'Hold (Empty)';
              case 'Hold (Empty)':
                setCycleCount((c) => c + 1);
                return 'Inhale';
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPhaseColor = () => {
    switch (breathPhase) {
      case 'Inhale': return 'text-teal-400 border-teal-500/30 bg-teal-500/5';
      case 'Hold (Full)': return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5';
      case 'Exhale': return 'text-purple-400 border-purple-500/30 bg-purple-500/5';
      case 'Hold (Empty)': return 'text-slate-400 border-slate-500/30 bg-slate-500/5';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Grid */}
      <main className="flex-grow p-8 max-w-4xl mx-auto space-y-8 overflow-y-auto h-screen">
        
        {/* Urgent Warnings Header */}
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex gap-4 items-start">
          <AlertTriangle className="h-7 w-7 text-rose-500 flex-shrink-0 animate-bounce mt-1" />
          <div>
            <h1 className="font-display text-xl font-bold text-white">Emergency Grounding Portal</h1>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Cravings and acute anxiety peak within **10 to 15 minutes**. Let's slow your physical impulse, reframe your adrenaline, and step through immediate cognitive containment.
            </p>
          </div>
        </div>

        {/* Guided Box Breathing Widget */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2 justify-center">
              <HeartPulse className="h-5 w-5 text-teal-400" />
              Box Breathing Stabilizer
            </h2>
            <p className="text-xs text-slate-500 mt-1">Calm your autonomic nervous system using rhythmic box breaths.</p>
          </div>

          {/* Breathing Circle Ring */}
          <div className="relative h-48 w-48 flex items-center justify-center">
            {/* Animated breathing pulse backdrop */}
            <div className="absolute inset-0 rounded-full border border-teal-500/10 animate-breathe pointer-events-none" />
            
            <div className={`h-40 w-40 rounded-full border-2 flex flex-col items-center justify-center transition-colors duration-500 ${getPhaseColor()}`}>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Action</span>
              <span className="text-xl font-bold mt-1 text-white">{breathPhase}</span>
              <span className="text-2xl font-black mt-2 text-indigo-400">{secondsLeft}s</span>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Cycles Completed: <span className="font-bold text-teal-400">{cycleCount}</span> (Recommended: 4 cycles)
          </div>
        </div>

        {/* Cravings Grounding Checksheets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-teal-400" />
              Relapse Containment Steps
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">1</span>
                <span>**Remove immediate cue accessibility**: Place screen, coffee, or vaping device in a different drawer or room.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">2</span>
                <span>**Initiate temperature change**: Splash cold water on your face or hold an ice cube in your palm for 30 seconds.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">3</span>
                <span>**Write down the urge**: Document the time, location, and preceding trigger in your Reflection Journal.</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <RefreshCw className="h-4.5 w-4.5 text-indigo-400" />
              Crisis Helpline Directories
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If cravings feel physically unmanageable, or severe withdrawal risk occurs, consult local healthcare support lines immediately:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-200">Suicide & Crisis Lifeline</div>
                  <div className="text-[10px] text-slate-500">Available 24/7 in USA & Canada</div>
                </div>
                <span className="text-indigo-400 font-extrabold text-sm">Call/Text 988</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-200">SAMHSA Helpline</div>
                  <div className="text-[10px] text-slate-500">Substance abuse treatment referral</div>
                </div>
                <span className="text-indigo-400 font-extrabold text-sm">1-800-662-4357</span>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
