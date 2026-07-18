import { NextRequest, NextResponse } from 'next/server';
import { askGeminiCoach } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message payload is required' }, { status: 400 });
    }

    const formattedHistory = Array.isArray(history) ? history : [];
    
    // Call Gemini
    const coachResult = await askGeminiCoach(message, formattedHistory);

    return NextResponse.json(coachResult);
  } catch (err) {
    console.error('API Error in /api/coach:', err);
    return NextResponse.json({
      reply: "I am having trouble parsing your input right now, but please take a slow breath. Try changing environments and practicing self-reflection.",
      isCrisis: false
    }, { status: 500 });
  }
}
