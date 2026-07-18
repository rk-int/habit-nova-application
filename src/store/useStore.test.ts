import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('Zustand App Store Tests', () => {
  beforeEach(() => {
    // Clear Zustand storage/state before each run
    useStore.setState({
      userName: 'Alex',
      streakScore: 4,
      maxStreak: 12,
      logs: [],
      chats: [],
      journals: []
    });
  });

  it('should initialize with standard default credentials', () => {
    const state = useStore.getState();
    expect(state.userName).toBe('Alex');
    expect(state.streakScore).toBe(4);
    expect(state.maxStreak).toBe(12);
  });

  it('should increment streak score when habit resisted', () => {
    const { addHabitLog } = useStore.getState();
    
    addHabitLog({
      habitType: 'Screen Time',
      severity: 5,
      status: 'Resisted',
      trigger: 'Boredom after work'
    });

    const state = useStore.getState();
    expect(state.logs.length).toBe(1);
    expect(state.logs[0].habitType).toBe('Screen Time');
    expect(state.logs[0].status).toBe('Resisted');
    expect(state.streakScore).toBe(5); // 4 + 1
    expect(state.maxStreak).toBe(12); // remains 12
  });

  it('should not zero out but rather halve the streak when slip logged (Resilience Streak)', () => {
    const { addHabitLog } = useStore.getState();
    
    addHabitLog({
      habitType: 'Nicotine',
      severity: 7,
      status: 'Slipped',
      trigger: 'Stressful meeting'
    });

    const state = useStore.getState();
    expect(state.logs.length).toBe(1);
    expect(state.logs[0].status).toBe('Slipped');
    // Halves original streak of 4 (4 / 2 = 2) to maintain resilience motivation
    expect(state.streakScore).toBe(2);
  });

  it('should calculate risk level correctly based on slip logs', () => {
    const { addHabitLog, getRiskLevel } = useStore.getState();
    
    expect(getRiskLevel()).toBe('Low');

    // Add first slip
    addHabitLog({
      habitType: 'Screen Time',
      severity: 6,
      status: 'Slipped'
    });
    expect(getRiskLevel()).toBe('Medium');

    // Add second slip
    addHabitLog({
      habitType: 'Screen Time',
      severity: 8,
      status: 'Slipped'
    });
    expect(getRiskLevel()).toBe('High');
  });

  it('should append chat messages to the conversation stack', () => {
    const { addChatMessage } = useStore.getState();
    
    addChatMessage({
      role: 'user',
      content: 'I need support'
    });

    const state = useStore.getState();
    expect(state.chats.length).toBe(1);
    expect(state.chats[0].role).toBe('user');
    expect(state.chats[0].content).toBe('I need support');
  });
});
