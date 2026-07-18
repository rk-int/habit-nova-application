import { NextRequest, NextResponse } from 'next/server';
import { analyzeJournal } from '@/lib/gemini';
import { z } from 'zod';

const journalSchema = z.object({
  content: z.string().min(1).max(4000)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = journalSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid payload parameters' }, { status: 400 });
    }

    const { content } = parseResult.data;

    // Call Gemini
    const journalResult = await analyzeJournal(content);

    return NextResponse.json(journalResult);
  } catch (err) {
    console.error('API Error in /api/journal:', err);
    return NextResponse.json({
      sentimentScore: 5,
      detectedTriggers: ['daily routine'],
      coachingTip: "Cravings are normal transitions. Focus on making small adjustments, and be gentle with yourself.",
      distortions: []
    }, { status: 500 });
  }
}
