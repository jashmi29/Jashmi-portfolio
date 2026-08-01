export type InteractionType =
  | 'contact_form'
  | 'view_resume_uiux'
  | 'view_resume_fullstack'
  | 'email_resume_uiux'
  | 'email_resume_fullstack';

export interface InteractionPayload {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  type: InteractionType;
  resumeType?: 'uiux' | 'fullstack';
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

export function getClientIp(request: Request): string | undefined {
  const header = request.headers.get('x-forwarded-for') ?? request.headers.get('cf-connecting-ip');
  return header?.split(',')[0]?.trim() || undefined;
}

export function getUserAgent(request: Request): string | undefined {
  return request.headers.get('user-agent') || undefined;
}

export function getReferrer(request: Request): string | undefined {
  return request.headers.get('referer') || undefined;
}

export async function trackInteraction(_payload: InteractionPayload): Promise<void> {
  // Analytics is intentionally disabled in this portfolio deployment.
  // The app keeps its architecture focused on Next.js + Resend only.
}
