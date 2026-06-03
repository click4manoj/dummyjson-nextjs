import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password , rememberMe} = await req.json();
  const expiresInMins = rememberMe ? 10080 : 30; // 7 days (10080 mins) vs 30 mins

  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const data = await res.json();

  const cookieStore = await cookies(); 
  // In any API route or server component
  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 : 30 * 60, // 7 days vs 30 minutes in seconds
    path: '/',
  });

  return NextResponse.json({ 
    user: data,
    redirectTo: "/dashboard",
   });
}
