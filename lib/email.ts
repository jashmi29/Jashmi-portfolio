import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'jashmiks29@gmail.com';
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

export const PORTFOLIO_URL = 'https://jashmi.dev';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/jashmi-ks-35a5552a9';
export const GITHUB_URL = 'https://github.com/jashmi29';

export const SITE_NAME = 'Jashmi KS';
export const SITE_TAGLINE = 'Frontend Engineer & Full-Stack Developer';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * Shared HTML email shell with premium, on-brand styling.
 */
function wrap(body: string): string {
  return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;background:#070b14;">
  <body style="margin:0;padding:0;background:#070b14;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#eef2f7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070b14;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d1524;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:32px 40px;background:linear-gradient(135deg,rgba(56,189,248,0.16),rgba(52,211,153,0.10),rgba(250,204,21,0.10));">
                <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(135deg,#38bdf8,#34d399,#facc15);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:#38bdf8;">Jashmi KS</div>
                <div style="font-size:13px;color:#8fa3bd;margin-top:4px;">Frontend Engineer &amp; Full-Stack Developer</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;color:#eef2f7;font-size:15px;line-height:1.7;">${body}</td>
            </tr>
            <tr>
              <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);background:#0a111f;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="left" style="font-size:13px;color:#8fa3bd;line-height:1.8;">
                      <strong style="color:#eef2f7;">Jashmi KS</strong><br />
                      <a href="${PORTFOLIO_URL}" style="color:#38bdf8;text-decoration:none;">Portfolio</a>
                      &nbsp;&nbsp;·&nbsp;&nbsp;
                      <a href="${LINKEDIN_URL}" style="color:#38bdf8;text-decoration:none;">LinkedIn</a>
                      &nbsp;&nbsp;·&nbsp;&nbsp;
                      <a href="${GITHUB_URL}" style="color:#38bdf8;text-decoration:none;">GitHub</a>
                    </td>
                    <td align="right" style="font-size:12px;color:#5f7391;">
                      © ${new Date().getFullYear()} ${SITE_NAME}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Escape user-provided strings to keep the email HTML safe. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;');
}

/**
 * Contact submission notification sent to Jashmi.
 */
export function contactNotificationHtml(input: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  subject?: string;
  message: string;
}): string {
  const rows = [
    ['Name', input.name],
    ['Email', input.email],
    ['Company', input.company || '—'],
    ['Role', input.role || '—'],
    ['Subject', input.subject || '—'],
  ];
  const fields = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;width:140px;font-size:13px;color:#8fa3bd;vertical-align:top;">${escapeHtml(
          k
        )}</td><td style="padding:8px 0;font-size:14px;color:#eef2f7;">${escapeHtml(v)}</td></tr>`
    )
    .join('');

  return wrap(`
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#ffffff;">New Contact Message ✨</h2>
    <p style="margin:0 0 24px;color:#8fa3bd;font-size:14px;">Someone reached out through your portfolio contact form.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
      ${fields}
    </table>
    <div style="background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.2);border-radius:12px;padding:16px 18px;margin-bottom:16px;">
      <div style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">Message</div>
      <div style="font-size:14px;color:#eef2f7;white-space:pre-line;">${escapeHtml(input.message)}</div>
    </div>
    <a href="mailto:${escapeHtml(input.email)}" style="display:inline-block;background:#38bdf8;color:#070b14;font-weight:700;font-size:14px;padding:12px 22px;border-radius:10px;text-decoration:none;">Reply to ${escapeHtml(
      input.name
    )}</a>
  `);
}

/**
 * Auto-reply confirmation email sent to the visitor.
 */
export function autoReplyHtml(input: {
  name: string;
  message: string;
}): string {
  return wrap(`
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#ffffff;">Thanks for reaching out, ${escapeHtml(
      input.name
    )}! 🙌</h2>
    <p style="margin:0 0 20px;color:#8fa3bd;font-size:14px;">
      I received your message and will get back to you as soon as possible.
    </p>
    <div style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);border-radius:12px;padding:16px 18px;margin-bottom:20px;">
      <div style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#34d399;margin-bottom:6px;">Your message</div>
      <div style="font-size:14px;color:#eef2f7;white-space:pre-line;">${escapeHtml(input.message)}</div>
    </div>
    <p style="margin:0 0 24px;color:#8fa3bd;font-size:14px;">
      In the meantime, feel free to explore my work and connect with me:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 8px 0 0;"><a href="${PORTFOLIO_URL}" style="display:inline-block;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">🌐 Portfolio</a></td>
        <td style="padding:0 8px;"><a href="${LINKEDIN_URL}" style="display:inline-block;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">💼 LinkedIn</a></td>
        <td style="padding:0 0 0 8px;"><a href="${GITHUB_URL}" style="display:inline-block;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">🐙 GitHub</a></td>
      </tr>
    </table>
  `);
}

/**
 * Resume delivery email with attachment sent to the visitor.
 */
export function resumeDeliveryHtml(input: {
  name: string;
  resumeLabel: string;
}): string {
  return wrap(`
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#ffffff;">Hi ${escapeHtml(
      input.name
    )}, here's my ${escapeHtml(input.resumeLabel)} 📄</h2>
    <p style="margin:0 0 20px;color:#8fa3bd;font-size:14px;">
      Thanks for your interest! Please find my resume attached to this email.
    </p>
    <p style="margin:0 0 20px;color:#8fa3bd;font-size:14px;line-height:1.8;">
      I'm <strong style="color:#eef2f7;">Jashmi KS</strong>, a Frontend Engineer &amp; Full-Stack Developer
      currently pursuing my B.Tech in Computer Science at Garden City University. I craft
      premium, accessible digital products with React, Next.js, and TypeScript — blending
      engineering precision with thoughtful design and motion. I'm open to internships,
      freelance work, and collaborations that care about craft.
    </p>
    <p style="margin:0 0 24px;color:#8fa3bd;font-size:14px;">Let's connect:</p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 8px 0 0;"><a href="${PORTFOLIO_URL}" style="display:inline-block;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">🌐 Portfolio</a></td>
        <td style="padding:0 8px;"><a href="${LINKEDIN_URL}" style="display:inline-block;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">💼 LinkedIn</a></td>
        <td style="padding:0 0 0 8px;"><a href="${GITHUB_URL}" style="display:inline-block;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;text-decoration:none;">🐙 GitHub</a></td>
      </tr>
    </table>
  `);
}

/**
 * Notification to Jashmi when someone requests a resume.
 */
export function resumeRequestNotificationHtml(input: {
  name: string;
  email: string;
  resumeLabel: string;
}): string {
  return wrap(`
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#ffffff;">Resume Request 📬</h2>
    <p style="margin:0 0 20px;color:#8fa3bd;font-size:14px;">
      Someone requested your <strong style="color:#eef2f7;">${escapeHtml(
        input.resumeLabel
      )}</strong>.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
      <tr><td style="padding:8px 0;width:140px;font-size:13px;color:#8fa3bd;">Name</td><td style="padding:8px 0;font-size:14px;color:#eef2f7;">${escapeHtml(input.name)}</td></tr>
      <tr><td style="padding:8px 0;width:140px;font-size:13px;color:#8fa3bd;">Email</td><td style="padding:8px 0;font-size:14px;color:#eef2f7;">${escapeHtml(input.email)}</td></tr>
      <tr><td style="padding:8px 0;width:140px;font-size:13px;color:#8fa3bd;">Resume</td><td style="padding:8px 0;font-size:14px;color:#eef2f7;">${escapeHtml(input.resumeLabel)}</td></tr>
    </table>
    <a href="mailto:${escapeHtml(input.email)}" style="display:inline-block;background:#38bdf8;color:#070b14;font-weight:700;font-size:14px;padding:12px 22px;border-radius:10px;text-decoration:none;">Reply to ${escapeHtml(input.name)}</a>
  `);
}

export { resend };

