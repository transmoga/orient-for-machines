import type { APIContext, AstroCookies } from 'astro';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'orient_session';
const SESSION_PAYLOAD = 'orient-internal-v1';

function getSecret(): string {
  const secret = import.meta.env.SESSION_SECRET || import.meta.env.SITE_PASSWORD;
  if (!secret) return '';
  return secret;
}

export function signSession(): string {
  const secret = getSecret();
  if (!secret) return '';
  return createHmac('sha256', secret).update(SESSION_PAYLOAD).digest('base64url');
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const expected = signSession();
  if (!expected) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isAuthenticated(context: APIContext): boolean {
  return verifySession(context.cookies.get(SESSION_COOKIE)?.value);
}

export function setSessionCookie(cookies: AstroCookies): void {
  const token = signSession();
  if (!token) return;
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function checkPassword(password: string): boolean {
  const expected = import.meta.env.SITE_PASSWORD;
  if (!expected) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const PRIVATE_PATHS = ['/pricing', '/strategy', '/questions'];
