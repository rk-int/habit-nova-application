import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HabitLog {
  id: string;
  habitType: string;
  severity: number;
  status: 'Resisted' | 'Slipped';
  trigger?: string;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isCrisis?: boolean;
  createdAt: string;
  suggestedAction?: {
    title: string;
    description: string;
    durationMinutes?: number;
  };
}

export interface JournalEntry {
  id: string;
  content: string;
  sentimentScore: number;
  detectedTriggers: string[];
  coachingTip?: string;
  createdAt: string;
  distortions: {
    type: string;
    quote: string;
    reframe: string;
  }[];
}

interface AppState {
  userId: string;
  userName: string;
  streakScore: number;
  maxStreak: number;
  logs: HabitLog[];
  chats: ChatMessage[];
  journals: JournalEntry[];
  theme: 'dark' | 'light';
  
  // Actions
  setUserName: (name: string) => void;
  addHabitLog: (log: Omit<HabitLog, 'id' | 'createdAt'>) => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  clearChats: () => void;
  getRiskLevel: () => 'Low' | 'Medium' | 'High';
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      userId: 'mock-user-123',
      userName: 'Alex',
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      streakScore: 4,
      maxStreak: 12,
      logs: [
        {
          id: 'log-1',
          habitType: 'Screen Time',
          severity: 5,
          status: 'Resisted',
          trigger: 'Felt tired in the evening',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'log-2',
          habitType: 'Caffeine',
          severity: 7,
          status: 'Resisted',
          trigger: 'Afternoon meeting fatigue',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'log-3',
          habitType: 'Screen Time',
          severity: 8,
          status: 'Slipped',
          trigger: 'Stress after deployment fail',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ],
      chats: [
        {
          id: 'chat-init',
          role: 'assistant',
          content: 'Hello! I am your HabitNova AI Coach. How are you navigating your habit goals today?',
          createdAt: new Date().toISOString()
        }
      ],
      journals: [
        {
          id: 'j-1',
          content: 'Today was tough, felt like I had no willpower at work.',
          sentimentScore: 4,
          detectedTriggers: ['work stress'],
          coachingTip: 'Remember, willpower is a muscle that gets tired. Structuring your environment is key.',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          distortions: [
            {
              type: 'All-or-Nothing thinking',
              quote: 'felt like I had no willpower',
              reframe: 'You maintained your tracker and recognized your vulnerability, which shows resilience.'
            }
          ]
        }
      ],

      setUserName: (name) => set({ userName: name }),
      
      addHabitLog: (newLog) => set((state) => {
        const fullLog: HabitLog = {
          ...newLog,
          id: `log-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        
        // Calculate non-punitive Resilience Streak
        let newStreak = state.streakScore;
        if (fullLog.status === 'Resisted') {
          newStreak += 1;
        } else {
          // Instead of dropping to 0 immediately, we drop by half (rounded up) to sustain motivation
          newStreak = Math.max(1, Math.ceil(newStreak / 2));
        }

        const maxStreak = Math.max(state.maxStreak, newStreak);
        
        return {
          logs: [fullLog, ...state.logs],
          streakScore: newStreak,
          maxStreak
        };
      }),

      addChatMessage: (msg) => set((state) => ({
        chats: [
          ...state.chats,
          {
            ...msg,
            id: `chat-${Date.now()}`,
            createdAt: new Date().toISOString()
          }
        ]
      })),

      addJournalEntry: (entry) => set((state) => ({
        journals: [
          {
            ...entry,
            id: `j-${Date.now()}`,
            createdAt: new Date().toISOString()
          },
          ...state.journals
        ]
      })),

      clearChats: () => set((state) => ({
        chats: [
          {
            id: 'chat-init',
            role: 'assistant',
            content: 'Hello! I am your HabitNova AI Coach. Let’s start fresh.',
            createdAt: new Date().toISOString()
          }
        ]
      })),

      getRiskLevel: () => {
        const state = get();
        if (state.logs.length === 0) return 'Low';
        
        // Relapse risk calculation based on:
        // 1. High average craving severity in recent logs (last 3 logs)
        // 2. Recent slips
        // 3. Low sentiment scores in recent journals
        const recentLogs = state.logs.slice(0, 3);
        const slipCount = recentLogs.filter(l => l.status === 'Slipped').length;
        const avgSeverity = recentLogs.reduce((sum, l) => sum + l.severity, 0) / (recentLogs.length || 1);
        
        const recentJournal = state.journals[0];
        const lowSentiment = recentJournal ? recentJournal.sentimentScore <= 4 : false;

        if (slipCount >= 2 || (avgSeverity >= 7 && lowSentiment)) {
          return 'High';
        } else if (slipCount === 1 || avgSeverity >= 5 || lowSentiment) {
          return 'Medium';
        }
        return 'Low';
      }
    }),
    {
      name: 'habit-nova-store',
    }
  )
);
