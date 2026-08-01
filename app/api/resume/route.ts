import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  resend,
  CONTACT_EMAIL,
  FROM_EMAIL,
  resumeDeliveryHtml,
  resumeRequestNotificationHtml,
} from '@/lib/email';
import { trackInteraction, getClientIp, getUserAgent, getReferrer } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ResumeType = 'uiux' | 'fullstack';

const RESUME_MAP: Record<
  ResumeType,
  { label: string; file: string; filename: string }
> = {
  uiux: {
    label: 'UI/UX Resume',
    file: 'Jashmi_KS_UIUX_Resume.pdf',
    filename: 'Jashmi_KS_UIUX_Resume.pdf',
  },
  fullstack: {
    label: 'Full-Stack Resume',
    file: 'Jashmi_KS_FullStack_Resume.pdf',
    filename: 'Jashmi_KS_FullStack_Resume.pdf',
  },
};

function sanitize(value: unknown, max = 200): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * POST /api/resume
 * Body: { name, email, resumeType: 'uiux' | 'fullstack' }
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
  const resumeType = sanitize(payload.resumeType, 20).toLowerCase();

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required.' },
      { status: 400 }
    );
  }
  if (name.length < 2) {
    return NextResponse.json(
      { error: 'Please enter your full name.' },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const resume = RESUME_MAP[resumeType as ResumeType];
  if (!resume) {
    return NextResponse.json(
      { error: 'Please choose a valid resume type.' },
      { status: 400 }
    );
  }

  if (!resend) {
    console.error('[resume] RESEND_API_KEY is not configured.');
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    );
  }

  try {
    // Read the resume PDF from the public folder.
    const filePath = path.join(process.cwd(), 'public', 'resume', resume.file);
    let attachment: Buffer;
    try {
      attachment = await fs.readFile(filePath);
    } catch {
      console.error(`[resume] Missing resume file: ${filePath}`);
      return NextResponse.json(
        { error: 'The requested resume is temporarily unavailable.' },
        { status: 500 }
      );
    }

    // 1. Send the resume to the visitor with a professional intro.
    const delivery = await resend.emails.send({
      from: `${'Jashmi KS'} <${FROM_EMAIL}>`,
      to: [email],
      replyTo: CONTACT_EMAIL,
      subject: `Here's my ${resume.label} — Jashmi KS`,
      html: resumeDeliveryHtml({ name, resumeLabel: resume.label }),
      attachments: [{ filename: resume.filename, content: attachment }],
    });

    if (delivery.error) {
      console.error('[resume] Delivery failed:', delivery.error);
      throw new Error(delivery.error.message);
    }

    // 2. Notify Jashmi that someone requested the resume.
    const notification = await resend.emails.send({
      from: `${'Jashmi Portfolio'} <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `📬 Resume request: ${name} (${resume.label})`,
      html: resumeRequestNotificationHtml({ name, email, resumeLabel: resume.label }),
    });

    if (notification.error) {
      console.error('[resume] Notification failed:', notification.error);
      throw new Error(notification.error.message);
    }

    // 3. Record the interaction locally after the email is successfully sent.
    await trackInteraction({
      name,
      email,
      type:
        resumeType === 'uiux' ? 'email_resume_uiux' : 'email_resume_fullstack',
      resumeType: resumeType as ResumeType,
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      referrer: getReferrer(request),
    });

    return NextResponse.json(
      { ok: true, message: 'Resume sent! Check your inbox.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[resume] Send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending the resume. Please try again.' },
      { status: 500 }
    );
  }
}

