export interface CoachResponse {
  reply: string;
  isCrisis: boolean;
  suggestedAction?: {
    title: string;
    description: string;
    durationMinutes?: number;
  };
}

export interface DistortionAnalysis {
  type: string;
  quote: string;
  reframe: string;
}

export interface JournalResponse {
  sentimentScore: number;
  detectedTriggers: string[];
  distortions: DistortionAnalysis[];
  coachingTip: string;
}

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function askGeminiCoach(message: string, history: { role: string; content: string }[]): Promise<CoachResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackCoachResponse(message);
  }

  const systemInstruction = `You are the HabitNova AI Coach, an empathetic, non-judgmental behavioral guide trained in Cognitive Behavioral Therapy (CBT) and BJ Fogg's Behavior Model (B=MAP).
Your goal is to help the user reduce harmful habits (e.g., substance use, excessive screen time) through behavioral adjustment.

CRITICAL DIRECTIVES:
1. NEVER offer a medical or clinical diagnosis. If the user asks for diagnostic advice, state: "I am an AI coach, not a medical professional. For clinical support, please consult a licensed provider."
2. CRISIS DETECTION: If the user indicates self-harm, severe withdrawal, or crisis, set 'isCrisis: true' in your JSON response, abort normal conversation, and output: "I'm here for you, but I want to make sure you are safe. Please contact a professional or reach out to: Suicide & Crisis Lifeline: call/text 988 (USA) or your local emergency line."
3. BEHAVIOR REFRAMING: When users express cravings or slips, do not use punitive language. Focus on recovery, identifying triggers (Cues), and substituting healthier, small actions (e.g. 2-minute breathing exercises).
4. OUTPUT FORMAT: You MUST return a JSON object matches this typescript interface:
{
  "reply": string,
  "isCrisis": boolean,
  "suggestedAction"?: { "title": string, "description": string, "durationMinutes": number }
}
Do not include any markdown backticks or explanation outside the JSON.`;

  // Compile contents array
  const contents = [
    {
      role: 'user',
      parts: [{ text: systemInstruction }]
    },
    ...history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    })),
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  try {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          responseMimeType: 'application/json'
        }
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini status code: ${res.status}`);
    }

    const data = await res.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error('Empty response from Gemini');

    return JSON.parse(responseText.trim()) as CoachResponse;
  } catch (err) {
    console.error('Error contacting Gemini API:', err);
    return getFallbackCoachResponse(message);
  }
}

export async function analyzeJournal(content: string): Promise<JournalResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackJournalResponse(content);
  }

  const systemInstruction = `Analyze the user's daily journal entry. Identify:
1. The overall emotional tone (Sentiment score between 1 and 10, where 1 is deeply negative/anxious and 10 is joyful/content).
2. Triggers: Locate environmental, emotional, or social cues mentioned.
3. Cognitive Distortions: Check for common patterns: "All-or-Nothing thinking", "Catastrophizing", "Emotional reasoning", "Should statements".
4. Reframe: Suggest a supportive re-evaluation of negative statements.

Output must be in JSON format matching this structure:
{
  "sentimentScore": number (1 to 10),
  "detectedTriggers": string[],
  "distortions": Array<{ "type": string, "quote": string, "reframe": string }>,
  "coachingTip": string
}
Do not output markdown code blocks or text outside the JSON.`;

  try {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemInstruction + '\n\nJournal entry:\n' + content }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini status code: ${res.status}`);
    }

    const data = await res.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error('Empty response from Gemini');

    return JSON.parse(responseText.trim()) as JournalResponse;
  } catch (err) {
    console.error('Error contacting Gemini API for journal:', err);
    return getFallbackJournalResponse(content);
  }
}

// Fallback logic if API key is missing or offline
function getFallbackCoachResponse(message: string): CoachResponse {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hurt') || lowerMsg.includes('die') || lowerMsg.includes('suicide')) {
    return {
      reply: "I am here for you, but I want to make sure you are safe. Please reach out to the Suicide & Crisis Lifeline by calling or texting 988 immediately, or contact local medical professionals.",
      isCrisis: true
    };
  }

  if (lowerMsg.includes('vape') || lowerMsg.includes('smoke') || lowerMsg.includes('nicotine')) {
    return {
      reply: "Cravings typically peak within 10-15 minutes. Let's redirect your physical impulse right now. Let's do a quick breathing sequence or step away from your current environment.",
      isCrisis: false,
      suggestedAction: {
        title: "Change Environments",
        description: "Stand up, drink a cold glass of water, and walk into a different room or step outside for 2 minutes.",
        durationMinutes: 2
      }
    };
  }

  return {
    reply: "I hear you, and it's completely normal to feel challenged when adjusting habit patterns. What is one small adjustment we can make in your immediate environment right now to make this habit harder to access?",
    isCrisis: false,
    suggestedAction: {
      title: "Self-Reflection Pause",
      description: "Close your eyes and trace where in your body you feel the craving. Write down the physical sensation.",
      durationMinutes: 3
    }
  };
}

function getFallbackJournalResponse(content: string): JournalResponse {
  const lowerContent = content.toLowerCase();
  const triggers: string[] = [];
  const distortions: DistortionAnalysis[] = [];

  if (lowerContent.includes('work') || lowerContent.includes('boss') || lowerContent.includes('deadline')) {
    triggers.push('work stress');
  }
  if (lowerContent.includes('night') || lowerContent.includes('evening') || lowerContent.includes('late')) {
    triggers.push('evening transition');
  }
  if (triggers.length === 0) {
    triggers.push('general stress trigger');
  }

  if (lowerContent.includes('never') || lowerContent.includes('always') || lowerContent.includes('failure') || lowerContent.includes('failed')) {
    distortions.push({
      type: "All-or-Nothing thinking",
      quote: content.substring(0, 60) + '...',
      reframe: "Adjusting habits is not binary. A minor slip is a trigger data-point to learn from, not a total reset of your commitment."
    });
  }

  return {
    sentimentScore: content.length > 100 ? 5 : 6,
    detectedTriggers: triggers,
    distortions: distortions,
    coachingTip: "Focus on identifying your cues. When this cue triggers, replace the behavior with a low-friction 2-minute alternative."
  };
}
