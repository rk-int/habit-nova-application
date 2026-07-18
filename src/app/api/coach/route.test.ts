import { POST } from './route';
import { NextRequest } from 'next/server';
import { describe, it, expect } from 'vitest';

describe('Coach API Route Handler', () => {
  it('should return 400 status for invalid body payload', async () => {
    const req = new NextRequest('http://localhost:3000/api/coach', {
      method: 'POST',
      body: JSON.stringify({ message: '' }) // triggers Zod validation fail (too short)
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid payload parameters');
  });

  it('should return 400 status for missing payload properties', async () => {
    const req = new NextRequest('http://localhost:3000/api/coach', {
      method: 'POST',
      body: JSON.stringify({})
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
