import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export  async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', '', { maxAge: 0, path: '/' });

  // Redirect to home page
  return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
