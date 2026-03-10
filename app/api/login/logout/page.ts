import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', '', { maxAge: 0, path: '/' });
  const response = NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  return NextResponse.json({ ok: true });
}
