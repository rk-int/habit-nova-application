import { POST } from './route';
import { NextRequest } from 'next/server';
import { describe, it, expect } from 'vitest';

describe('Habits Logging API Route Handler', () => {
  it('should return 400 status for invalid habit categories', async () => {
    const req = new NextRequest('http://localhost:3000/api/habits', {
      method: 'POST',
      body: JSON.stringify({
        habitType: 'Doomscrolling', // triggers Zod validation fail (must match enum)
        severity: 5,
        status: 'Resisted'
      })
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid payload parameters');
  });

  it('should return 400 status for out-of-bounds craving severity level', async () => {
    const req = new NextRequest('http://localhost:3000/api/habits', {
      method: 'POST',
      body: JSON.stringify({
        habitType: 'Screen Time',
        severity: 11, // triggers Zod validation fail (max 10)
        status: 'Resisted'
      })
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
