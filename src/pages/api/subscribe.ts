import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = { success: boolean; message: string };

function json(body: FormState, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getResendConfig(): { resend: Resend; audienceId: string } | null {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return null;
  return { resend: new Resend(apiKey), audienceId };
}

export const POST: APIRoute = async ({ request }) => {
  let email: string | undefined;

  const contentType = request.headers.get('content-type') ?? '';
  try {
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = typeof body?.email === 'string' ? body.email : undefined;
    } else {
      const formData = await request.formData();
      email = formData.get('email')?.toString();
    }
  } catch {
    return json({ success: false, message: 'Please enter a valid email address.' }, 400);
  }

  email = email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return json({ success: false, message: 'Please enter a valid email address.' }, 400);
  }

  const config = getResendConfig();
  if (!config) {
    return json({ success: false, message: 'Email signup is not configured yet.' }, 503);
  }

  try {
    await config.resend.contacts.create({
      email,
      audienceId: config.audienceId,
    });
    return json({ success: true, message: 'Subscribed. Welcome to the loop.' });
  } catch (error) {
    console.error('subscribe contact create', error);
    return json({ success: false, message: 'Something went wrong. Please try again.' }, 500);
  }
};
