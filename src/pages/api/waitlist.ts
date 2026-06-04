import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../lib/supabase';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const email = body.email?.trim().toLowerCase() ?? '';
  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Valid email required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const source = (body.source || 'unknown').slice(0, 120);
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Waitlist not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error } = await supabase.from('waitlist_signups').insert({
    email,
    source,
    metadata: { user_agent: request.headers.get('user-agent')?.slice(0, 500) ?? null },
  });

  if (error) {
    if (error.code === '23505') {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('waitlist insert', error);
    return new Response(JSON.stringify({ error: 'Could not save signup' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
