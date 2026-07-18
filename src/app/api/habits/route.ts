import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const habitLogSchema = z.object({
  habitType: z.enum(['Screen Time', 'Caffeine', 'Nicotine', 'Sugar', 'Substance']),
  severity: z.union([
    z.number().int().min(1).max(10),
    z.string().transform(v => parseInt(v)).refine(v => v >= 1 && v <= 10)
  ]),
  status: z.enum(['Resisted', 'Slipped']),
  trigger: z.string().max(300).optional(),
  notes: z.string().max(500).optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = habitLogSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid payload parameters' }, { status: 400 });
    }

    const { habitType, severity, status, trigger, notes } = parseResult.data;

    const userId = 'mock-user-123';

    // Ensure our mock user exists in the SQLite database
    let user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: 'alex@persona-a.com',
          name: 'Alex',
          streakScore: 4,
          maxStreak: 12
        }
      });
    }

    // Insert the Habit Log
    const newLog = await prisma.habitLog.create({
      data: {
        userId,
        habitType,
        severity: severity,
        status,
        trigger: trigger || null,
        notes: notes || null
      }
    });

    // Calculate non-punitive Resilience Streak in Database
    let newStreak = user.streakScore;
    if (status === 'Resisted') {
      newStreak += 1;
    } else {
      newStreak = Math.max(1, Math.ceil(newStreak / 2));
    }
    const maxStreak = Math.max(user.maxStreak, newStreak);

    // Update user in Database
    await prisma.user.update({
      where: { id: userId },
      data: {
        streakScore: newStreak,
        maxStreak,
        lastLogDate: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      logId: newLog.id,
      streakScore: newStreak,
      maxStreak
    });

  } catch (err) {
    console.error('API Error in /api/habits:', err);
    return NextResponse.json({ error: 'Failed to record habit log' }, { status: 500 });
  }
}
