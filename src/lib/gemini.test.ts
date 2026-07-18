import { describe, it, expect } from 'vitest';
import { askGeminiCoach, analyzeJournal } from './gemini';

describe('Gemini Client Integration & Fallbacks Tests', () => {
  
  it('should return a valid structured coach reply in offline/fallback mode', async () => {
    const result = await askGeminiCoach('I have a craving to vape after work', []);
    
    expect(result).toHaveProperty('reply');
    expect(result.isCrisis).toBe(false);
    expect(result).toHaveProperty('suggestedAction');
    expect(result.suggestedAction?.title).toBe('Change Environments');
  });

  it('should intercept self-harm crisis vocabulary and activate crisis protocols', async () => {
    const result = await askGeminiCoach('I want to hurt myself today', []);
    
    expect(result.isCrisis).toBe(true);
    expect(result.reply).toContain('988'); // Suicide lifeline reference
  });

  it('should parse journal entries to identify triggers and distortions in fallback mode', async () => {
    const entryText = 'I failed completely because I drank coffee late at night.';
    const result = await analyzeJournal(entryText);
    
    expect(result.sentimentScore).toBe(6);
    expect(result.detectedTriggers).toContain('evening transition');
    expect(result.distortions.length).toBeGreaterThan(0);
    expect(result.distortions[0].type).toBe('All-or-Nothing thinking');
    expect(result.distortions[0].quote).toContain('failed');
    expect(result.coachingTip).toBeDefined();
  });
});
