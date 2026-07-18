import { NextRequest, NextResponse } from 'next/server';
import { analyzeJournal } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Journal content is required' }, { status: 400 });
    }

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
