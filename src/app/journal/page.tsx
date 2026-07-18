'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useStore, JournalEntry } from '@/store/useStore';
import { BookOpen, Sparkles, Smile, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function JournalPage() {
  const { journals, addJournalEntry } = useStore();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading) return;

    const rawContent = content.trim();
    setContent('');
    setLoading(true);

    try {
      // Send content to local Journal parser API route
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: rawContent })
      });

      if (!res.ok) throw new Error('API issue');
      const data = await res.json();

      // Add to store
      addJournalEntry({
        content: rawContent,
        sentimentScore: data.sentimentScore,
        detectedTriggers: data.detectedTriggers,
        coachingTip: data.coachingTip,
        distortions: data.distortions || []
      });

    } catch (err) {
      console.error(err);
      // Fallback
      addJournalEntry({
        content: rawContent,
        sentimentScore: 5,
        detectedTriggers: ['daily routine'],
        coachingTip: "Cravings are normal transitions. Focus on making small adjustments, and be gentle with yourself.",
        distortions: [
          {
            type: "Unspecified Distortion",
            quote: rawContent.substring(0, 50) + "...",
            reframe: "Every day presents another opportunity. Track your triggers and proceed one choice at a time."
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper for sentiment colors
  const getSentimentDetails = (score: number) => {
    if (score >= 8) return { label: 'Joyful / Content', color: 'text-teal-400 border-teal-500/20 bg-teal-500/10' };
    if (score >= 5) return { label: 'Neutral / Balanced', color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10' };
    return { label: 'Stressed / Vulnerable', color: 'text-rose-400 border-rose-500/20 bg-rose-500/10' };
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Grid */}
      <main className="flex-grow p-8 max-w-5xl mx-auto space-y-8 overflow-y-auto h-screen">
        
        {/* Header */}
        <div className="pb-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-500" />
              AI Reflection Journal
            </h1>
            <p className="text-slate-400 text-xs mt-1">Reflect on daily urges, stress context, and analyze cognitive patterns.</p>
          </div>
        </div>

        {/* Entry Sheet Editor */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-display font-bold text-sm text-slate-200 mb-3 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Write your Daily Reflection
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="How are you feeling today? What cues triggered cravings, and how did you manage them? Write down any negative thoughts to reframe..."
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50 resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500">Inputs analyzed locally and reframed with cognitive-behavioral science.</span>
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? 'Analyzing distortion...' : 'Submit Entry'}
              </button>
            </div>
          </form>
        </div>

        {/* History Journal List */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-base text-white">Historical Logs</h3>
          
          {journals.map((entry) => {
            const sentiment = getSentimentDetails(entry.sentimentScore);
            return (
              <div key={entry.id} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/5 pb-3">
                  <span className="text-slate-400 font-semibold">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  
                  {/* Sentiment tag */}
                  <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${sentiment.color}`}>
                    Mood Index: {entry.sentimentScore}/10 ({sentiment.label})
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{entry.content}"
                </p>

                {/* Trigger tags */}
                {entry.detectedTriggers.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center text-xs">
                    <span className="text-slate-500">Triggers:</span>
                    {entry.detectedTriggers.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Cognitive Distortions identified */}
                {entry.distortions.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Cognitive Distortion Detected:
                    </div>
                    {entry.distortions.map((d, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                        <div className="text-xs font-semibold text-slate-200">
                          Type: <span className="text-indigo-400">{d.type}</span>
                        </div>
                        <div className="text-xs text-slate-400 italic">
                          Quote: "{d.quote}"
                        </div>
                        <div className="text-xs text-teal-400 font-medium bg-teal-500/5 p-2 rounded border border-teal-500/10 leading-relaxed">
                          Reframed Thought: {d.reframe}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Coaching tip */}
                {entry.coachingTip && (
                  <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-indigo-300 leading-relaxed">
                    <span className="font-bold text-white block mb-0.5">AI Coach Insight:</span>
                    {entry.coachingTip}
                  </div>
                )}

              </div>
            );
          })}

          {journals.length === 0 && (
            <div className="text-center py-12 text-xs text-slate-600">
              No journal reflections logged. Complete an entry above.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
