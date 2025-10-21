import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

/**
 * Server-side helper to require authentication.
 * Use this in server components or server actions.
 * Redirects to login if not authenticated.
 */
export async function requireAuth() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return session;
}

/**
 * Server-side helper to get the current session.
 * Returns null if not authenticated.
 */
export async function getCurrentSession() {
  const session = await auth();
  return session;
}

/**
 * Server-side helper to get the current user.
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}
