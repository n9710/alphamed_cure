import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions = {
  password: process.env.SESSION_SECRET || 'alphamed-cure-super-secret-complex-password-32chars-min!',
  cookieName: 'alphamed_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
};

/**
 * Get iron session from cookies in Server Components, Server Actions, or Route Handlers
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  return session;
}

/**
 * Verify if current session user has active verified status or admin
 */
export function isUserVerified(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.role === 'customer' && user.status === 'verified';
}

/**
 * Helper to require authentication
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    return { error: 'Unauthorized', status: 401 };
  }
  return { user: session.user };
}

/**
 * Helper to require admin role
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.role !== 'admin') {
    return { error: 'Forbidden', status: 403 };
  }
  return { user: session.user };
}
