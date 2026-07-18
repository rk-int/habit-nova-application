'use client';

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useStore } from '@/store/useStore';
import { Send, Sparkles, Brain, AlertOctagon, HeartHandshake } from 'lucide-react';

export default function CoachPage() {
  const { chats, addChatMessage } = useStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat window
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessageContent = input.trim();
    setInput('');
    setLoading(true);

    // Save user message in Zustand
    addChatMessage({
      role: 'user',
      content: userMessageContent,
    });

    try {
      // Send history + new message to our local Next API endpoint
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessageContent,
          // Send last 6 messages as history
          history: chats.slice(-6).map(c => ({ role: c.role, content: c.content }))
        })
      });

      if (!res.ok) throw new Error('API issue');
      const data = await res.json();

      // Save assistant message in Zustand
      addChatMessage({
        role: 'assistant',
        content: data.reply,
        isCrisis: data.isCrisis,
        suggestedAction: data.suggestedAction
      });

    } catch (err) {
      console.error(err);
      // Fallback message saved
      addChatMessage({
        role: 'assistant',
        content: "Sorry, I am having trouble connecting. Cravings usually fade in 10 minutes. Try standing up, changing rooms, and practicing slow breathing."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Chat Workspace */}
      <main className="flex-grow flex flex-col justify-between h-screen p-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="pb-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Brain className="h-6 w-6 text-indigo-500" />
              Empathetic AI Coach
            </h1>
            <p className="text-slate-400 text-xs mt-1">CBT coaching and behavioral loop adjustments in real-time.</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            CBT Reframer
          </div>
        </div>

        {/* Scrollable Conversation Panel */}
        <div className="flex-grow overflow-y-auto py-6 space-y-6 pr-2">
          {chats.map((chat) => {
            const isUser = chat.role === 'user';
            return (
              <div 
                key={chat.id} 
                className={`flex flex-col max-w-[80%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                
                {/* Text Bubble */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  isUser 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : chat.isCrisis 
                      ? 'bg-rose-500/10 border border-rose-500/30 text-rose-200 rounded-tl-none'
                      : 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none'
                }`}>
                  {chat.isCrisis && (
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 text-xs mb-2">
                      <AlertOctagon className="h-4 w-4" />
                      CRISIS RESOURCES INITIATED:
                    </div>
                  )}
                  {chat.content}
                </div>

                {/* Coping Suggested Action Card */}
                {!isUser && chat.suggestedAction && (
                  <div className="mt-3 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 max-w-sm flex items-start gap-3">
                    <HeartHandshake className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wide">Coping Recommendation</h5>
                      <h4 className="text-sm font-semibold text-white mt-1">{chat.suggestedAction.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{chat.suggestedAction.description}</p>
                      {chat.suggestedAction.durationMinutes && (
                        <span className="inline-block mt-2 px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px]">
                          Duration: {chat.suggestedAction.durationMinutes} mins
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-slate-600 mt-1 px-1">
                  {mounted ? new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            );
          })}

          {loading && (
            <div className="flex mr-auto items-start max-w-[80%]">
              <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 text-sm text-slate-400 flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce delay-200" />
                </span>
                AI Coach is thinking...
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

         {/* Input Bar Form */}
        <form onSubmit={handleSend} className="relative mt-2">
          <label htmlFor="coachMessageInput" className="sr-only">Message to AI Coach</label>
          <input
            id="coachMessageInput"
            type="text"
            placeholder="Type craving trigger context or message to your Coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message to AI Coach"
            className="absolute right-3 top-2.5 p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-40 disabled:hover:bg-indigo-600"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>

      </main>
    </div>
  );
}
