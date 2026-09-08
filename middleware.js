import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('alphamed_session');

  // Protect /admin routes — require any session; role check happens in AdminLayout server component
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!sessionCookie?.value) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /dashboard — belt-and-suspenders alongside the server-side redirect in page.js
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie?.value) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Security response headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );

  return response;
}

export const config = {
  matcher: [
    // Only run on actual app routes — skip static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|assets/|public/).*)',
  ],
};
