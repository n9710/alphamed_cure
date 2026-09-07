import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request) {
  const session = await getSession();
  session.destroy();

  const url = new URL('/', request.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(request) {
  const session = await getSession();
  session.destroy();

  const url = new URL('/', request.url);
  return NextResponse.redirect(url, { status: 303 });
}
