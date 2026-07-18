'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import LogModal from '@/components/dashboard/LogModal';
import { useStore } from '@/store/useStore';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Heart, ShieldAlert, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

export default function Dashboard() {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { userName, streakScore, maxStreak, logs, getRiskLevel } = useStore();
  const riskLevel = getRiskLevel();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Format Recharts data (last 7 logs, ordered chronological)
  const chartData = [...logs]
    .slice(0, 7)
    .reverse()
    .map(log => ({
      date: new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      severity: log.severity,
      status: log.status
    }));

  const totalResisted = logs.filter(l => l.status === 'Resisted').length;

  // Adaptive recommendation depending on risk level
  const getAiNudge = () => {
    if (riskLevel === 'High') {
      return {
        title: "Relapse Prevention Protocol",
        desc: "Multiple slips and high cravings detected. Let's try to adjust your immediate access: place screens outside the bedroom and try an active AI Coach session to reframe the triggers.",
        icon: ShieldAlert,
        color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
      };
    }
    if (riskLevel === 'Medium') {
      return {
        title: "High-Urge Advisory",
        desc: "Craving patterns are elevating. We recommend taking a proactive 2-minute box breathing break in our Emergency Support Mode to reset your nervous system.",
        icon: AlertTriangle,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
      };
    }
    return {
      title: "Daily Habit Reinforcement",
      desc: "Excellent steady resilience. Consider writing a Reflection Journal entry today to trace your morning motivations and anchor your progress.",
      icon: Sparkles,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    };
  };

  const nudge = getAiNudge();
  const NudgeIcon = nudge.icon;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar onOpenLogModal={() => setIsLogOpen(true)} />

      {/* Main Grid */}
      <main className="flex-grow p-8 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">Welcome back, {userName}</h1>
            <p className="text-slate-400 text-sm">Empathetic behavioral tracking and recovery portal.</p>
          </div>
          
          {/* AI Trigger Risk Score Card */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel border border-white/10 text-sm">
            <span className="text-slate-400">Trigger Risk Level:</span>
            <span className={`font-bold flex items-center gap-1.5 ${
              riskLevel === 'High' ? 'text-rose-400' : riskLevel === 'Medium' ? 'text-amber-400' : 'text-teal-400'
            }`}>
              <span className={`h-2.5 w-2.5 rounded-full ${
                riskLevel === 'High' ? 'bg-rose-500' : riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-teal-500'
              }`} />
              {riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Dynamic AI Nudges Banner */}
        <div className={`p-5 rounded-2xl border flex gap-4 items-start ${nudge.color}`}>
          <NudgeIcon className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" />
              {nudge.title}
            </h4>
            <p className="text-sm mt-1 leading-relaxed opacity-90">{nudge.desc}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Resilience</div>
            <div className="text-3xl font-extrabold text-white mt-2 flex items-baseline gap-1.5">
              {streakScore} <span className="text-xs font-normal text-slate-400">Days</span>
            </div>
            <div className="text-[10px] text-teal-400 mt-2 font-medium">Non-punitive moderation logging</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Best Streak</div>
            <div className="text-3xl font-extrabold text-white mt-2 flex items-baseline gap-1.5">
              {maxStreak} <span className="text-xs font-normal text-slate-400">Days</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-2">All-time record</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Urges Resisted</div>
            <div className="text-3xl font-extrabold text-teal-400 mt-2">
              {totalResisted}
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Successful coping modifications</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total logged logs</div>
            <div className="text-3xl font-extrabold text-indigo-400 mt-2">
              {logs.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Self-awareness inputs collected</div>
          </div>
        </div>

        {/* Chart & Recent activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trend Chart */}
          <div className="glass-panel p-6 rounded-2xl lg:col-span-2 flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                Craving Intensity Timeline
              </h3>
              <p className="text-xs text-slate-500">Craving peaks over the last 7 logged behaviors.</p>
            </div>
            
            <div className="h-60 mt-6 w-full">
              {isMounted && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis domain={[1, 10]} stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      labelStyle={{ color: '#94a3b8', fontSize: 11 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="severity" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 0, fill: '#6366f1' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-600">
                  No tracking logs recorded yet. Click &apos;+ Log Cravings&apos; above.
                </div>
              )}
            </div>
          </div>

          {/* Trigger logs */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-400" />
                Recent Slip/Urge contexts
              </h3>
              <p className="text-xs text-slate-500">Triggers logged on high urge records.</p>
            </div>

            <div className="flex-grow mt-6 space-y-4">
              {logs.slice(0, 3).map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{log.habitType}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      log.status === 'Resisted' 
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  {log.trigger && (
                    <div className="text-xs text-slate-400 mt-1">
                      <span className="text-slate-500">Trigger:</span> {log.trigger}
                    </div>
                  )}
                  <div className="text-[10px] text-slate-500 mt-1">
                    {isMounted ? `${new Date(log.createdAt).toLocaleDateString()} at ${new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                  </div>
                </div>
              ))}

              {logs.length === 0 && (
                <div className="h-full flex items-center justify-center text-xs text-slate-600 text-center py-12">
                  Logs list empty.<br />Log an event to seed insights.
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* Habits Log Modal */}
      <LogModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
    </div>
  );
}
