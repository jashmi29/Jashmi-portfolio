import { NextResponse } from 'next/server';
import { trackInteraction, getClientIp, getUserAgent, getReferrer } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ResumeType = 'uiux' | 'fullstack';

/**
 * POST /api/analytics/view
 * Body: { resumeType: 'uiux' | 'fullstack' }
 *
 * Logs a "view resume" interaction BEFORE the PDF is opened in a new tab.
 * Called fire-and-forget from the client so it never blocks the user flow.
 * Visitors who haven't provided name/email are tracked as anonymous
 * (null name/email) using IP, user-agent, referrer and timestamp.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const resumeType =
    typeof payload.resumeType === 'string'
      ? payload.resumeType.toLowerCase()
      : '';

  if (resumeType !== 'uiux' && resumeType !== 'fullstack') {
    return NextResponse.json(
      { error: 'resumeType must be "uiux" or "fullstack".' },
      { status: 400 }
    );
  }

  await trackInteraction({
    name: '',
    email: '',
    type: resumeType === 'uiux' ? 'view_resume_uiux' : 'view_resume_fullstack',
    resumeType: resumeType as ResumeType,
    ipAddress: getClientIp(request),
    userAgent: getUserAgent(request),
    referrer: getReferrer(request),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

