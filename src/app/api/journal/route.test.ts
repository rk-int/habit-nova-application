import { POST } from './route';
import { NextRequest } from 'next/server';
import { describe, it, expect } from 'vitest';

describe('Journal API Route Handler', () => {
  it('should return 400 status for invalid content body', async () => {
    const req = new NextRequest('http://localhost:3000/api/journal', {
      method: 'POST',
      body: JSON.stringify({ content: '' }) // too short
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid payload parameters');
  });

  it('should return 400 status for oversized payload content', async () => {
    const req = new NextRequest('http://localhost:3000/api/journal', {
      method: 'POST',
      body: JSON.stringify({ content: 'a'.repeat(4001) }) // triggers Zod max 4000 limit
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
