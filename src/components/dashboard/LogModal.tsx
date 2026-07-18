'use client';

import React, { useState } from 'react';
import { X, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogModal({ isOpen, onClose }: LogModalProps) {
  const addHabitLog = useStore((state) => state.addHabitLog);
  const [habitType, setHabitType] = useState('Screen Time');
  const [severity, setSeverity] = useState(5);
  const [status, setStatus] = useState<'Resisted' | 'Slipped'>('Resisted');
  const [trigger, setTrigger] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabitLog({
      habitType,
      severity,
      status,
      trigger: trigger.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    setTrigger('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel p-6 border border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <h2 className="font-display text-lg font-bold text-white">Log Craving & Activity</h2>
          <button 
            onClick={onClose}
            aria-label="Close log dialog"
            className="text-slate-400 hover:text-slate-200 p-1 hover:bg-white/5 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          
          {/* Habit Category */}
          <div>
            <label htmlFor="habitTypeSelect" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Behavior</label>
            <select
              id="habitTypeSelect"
              value={habitType}
              onChange={(e) => setHabitType(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
            >
              <option value="Screen Time">Screen Time / Doomscrolling</option>
              <option value="Caffeine">Caffeine / Energy Drinks</option>
              <option value="Nicotine">Nicotine / Vaping</option>
              <option value="Sugar">Refined Sugar / Late Night Snacks</option>
              <option value="Substance">Alcohol / Substance Moderation</option>
            </select>
          </div>

          {/* Craving Severity */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="intensitySlider" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Craving Intensity</label>
              <span className="text-sm font-bold text-indigo-400">{severity} / 10</span>
            </div>
            <input
              id="intensitySlider"
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Mild urge</span>
              <span>Intense craving</span>
            </div>
          </div>

          {/* Resist / Slip Toggles */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Result</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('Resisted')}
                className={`py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition duration-200 ${
                  status === 'Resisted'
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-400'
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                <HeartHandshake className="h-4 w-4" />
                Resisted Craving
              </button>
              <button
                type="button"
                onClick={() => setStatus('Slipped')}
                className={`py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition duration-200 ${
                  status === 'Slipped'
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                Logged a Slip
              </button>
            </div>
          </div>

          {/* Trigger Context */}
          <div>
            <label htmlFor="triggerInput" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Environmental Trigger (Optional)</label>
            <input
              id="triggerInput"
              type="text"
              placeholder="e.g. boredom, late-night screens, meeting fatigue"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notesTextarea" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes / Context (Optional)</label>
            <textarea
              id="notesTextarea"
              placeholder="How did you cope or react?"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all"
            >
              Save Entry
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
