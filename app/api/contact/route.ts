import { NextResponse } from 'next/server';
import {
  resend,
  CONTACT_EMAIL,
  FROM_EMAIL,
  contactNotificationHtml,
  autoReplyHtml,
} from '@/lib/email';
import { trackInteraction, getClientIp, getUserAgent, getReferrer } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, max = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * POST /api/contact
 * Body: { name, email, message, company?, role?, subject? }
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = sanitize(payload.name, 120);
  const email = sanitize(payload.email, 200);
  const message = sanitize(payload.message, 5000);
  const company = sanitize(payload.company, 120);
  const role = sanitize(payload.role, 120);
  const subject = sanitize(payload.subject, 200);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }
  if (name.length < 2 || message.length < 10) {
    return NextResponse.json(
      { error: 'Please provide a more complete message.' },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  if (!resend) {
    console.error('[contact] RESEND_API_KEY is not configured.');
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    );
  }

  try {
    // 1. Notify Jashmi about the new submission.
    const notification = await resend.emails.send({
      from: `${'Jashmi Portfolio'} <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `✨ New message from ${name}${subject ? ` — ${subject}` : ''}`,
      html: contactNotificationHtml({ name, email, company, role, subject, message }),
    });

    if (notification.error) {
      console.error('[contact] Notification failed:', notification.error);
      throw new Error(notification.error.message);
    }

    // 2. Auto-reply to the sender.
    const autoReply = await resend.emails.send({
      from: `${'Jashmi KS'} <${FROM_EMAIL}>`,
      to: [email],
      replyTo: CONTACT_EMAIL,
      subject: 'Thanks for reaching out — I\'ll get back to you soon!',
      html: autoReplyHtml({ name, message }),
    });

    if (autoReply.error) {
      console.error('[contact] Auto-reply failed:', autoReply.error);
      throw new Error(autoReply.error.message);
    }

    // 3. Record the interaction locally (best-effort, non-blocking).
    await trackInteraction({
      name,
      email,
      company: company || undefined,
      role: role || undefined,
      type: 'contact_form',
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      referrer: getReferrer(request),
    });

    return NextResponse.json(
      { ok: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[contact] Send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please try again.' },
      { status: 500 }
    );
  }
}

