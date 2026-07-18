'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, LayoutDashboard, MessageSquareText, FileText, AlertTriangle, Flame } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface SidebarProps {
  onOpenLogModal?: () => void;
}

export default function Sidebar({ onOpenLogModal }: SidebarProps) {
  const pathname = usePathname();
  const { streakScore } = useStore();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Coach', href: '/coach', icon: MessageSquareText },
    { name: 'Reflection Journal', href: '/journal', icon: FileText },
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between p-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-500" />
          <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-200 to-teal-200 bg-clip-text text-transparent">
            HabitNova AI
          </span>
        </Link>

        {/* Resilience Streak Tracker */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20">
          <Flame className="h-5 w-5 text-orange-500 fill-orange-500 animate-pulse" />
          <div>
            <div className="text-xs text-slate-400">Resilience Streak</div>
            <div className="text-sm font-bold text-orange-400">{streakScore} Days Active</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* Log Habit CTA */}
        {onOpenLogModal && (
          <button
            onClick={onOpenLogModal}
            aria-label="Log cravings or resilient actions"
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 text-sm transition-all"
          >
            + Log Cravings
          </button>
        )}

        {/* Emergency Trigger */}
        <Link
          href="/emergency"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm border transition-all ${
            pathname === '/emergency'
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
              : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20 hover:border-rose-500/40'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          Emergency Grounding
        </Link>

        {/* Quick User Badge */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-xs text-slate-500">
          <div 
            role="img" 
            aria-label="Avatar for user Alex"
            className="h-6 w-6 rounded-full bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-300"
          >
            AX
          </div>
          <div>
            <div className="font-medium text-slate-400">Alex (Persona A)</div>
            <div className="text-[10px] text-teal-500">Moderation Active</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
