import type { APIRoute } from 'astro';
import { checkPassword, setSessionCookie, clearSessionCookie } from '../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!import.meta.env.SITE_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Auth not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const password = body.password?.trim() ?? '';
  if (!checkPassword(password)) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  setSessionCookie(cookies);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ cookies }) => {
  clearSessionCookie(cookies);
  return new Response(null, { status: 204 });
};
