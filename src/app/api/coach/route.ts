import { NextRequest, NextResponse } from 'next/server';
import { askGeminiCoach } from '@/lib/gemini';
import { z } from 'zod';

const coachSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(2000)
  })).optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = coachSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid payload parameters' }, { status: 400 });
    }

    const { message, history } = parseResult.data;
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
