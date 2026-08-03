import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import {
  coerceContactPayload,
  hasErrors,
  labelForProjectType,
  labelForTimeline,
  validateContact,
} from '@/lib/contact-schema';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_WINDOW_MS = 10 * 60 * 1000;
/** Successful sends per window. Rejected submissions do not count against it. */
const SEND_LIMIT = 5;
/** Total requests per window, so failed validation cannot be used to hammer the route. */
const BURST_LIMIT = 30;
const MAX_BODY_BYTES = 16_000;

const TOO_MANY =
  'Too many messages from this connection. Please try again shortly, or email me directly.';

type ContactResponse = {
  ok: boolean;
  /** False when the message was accepted but email delivery is unconfigured. */
  delivered?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips CR/LF so a submitted value can never inject extra headers into the
 * outgoing email.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  const client = clientKey(request.headers);

  const burst = rateLimit(`contact:burst:${client}`, BURST_LIMIT, RATE_WINDOW_MS);
  if (!burst.allowed) {
    return json({ ok: false, message: TOO_MANY }, 429, {
      'Retry-After': String(burst.retryAfter),
    });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, message: 'That message is too long to send.' }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: 'Malformed request.' }, 400);
  }

  const values = coerceContactPayload(parsed);
  if (!values) {
    return json({ ok: false, message: 'Malformed request.' }, 400);
  }

  // Honeypot. Respond as though it succeeded so bots get no signal.
  if (values.website.trim() !== '') {
    return json({ ok: true, delivered: true }, 200);
  }

  const errors = validateContact(values);
  if (hasErrors(errors)) {
    return json(
      {
        ok: false,
        message: 'Please check the highlighted fields.',
        errors: errors as Record<string, string>,
      },
      422,
    );
  }

  // Only a genuine send consumes the budget, so someone correcting a validation
  // error a few times is never locked out.
  const send = rateLimit(`contact:send:${client}`, SEND_LIMIT, RATE_WINDOW_MS);
  if (!send.allowed) {
    return json({ ok: false, message: TOO_MANY }, 429, {
      'Retry-After': String(send.retryAfter),
    });
  }

  const name = singleLine(values.name);
  const company = singleLine(values.company);
  const email = singleLine(values.email);
  const projectType = labelForProjectType(values.projectType);
  const timeline = labelForTimeline(values.timeline);
  const details = values.details.trim();

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  // Graceful degradation: without credentials the submission is still accepted
  // and logged, and the client is told delivery could not be confirmed.
  if (!apiKey || !from) {
    console.warn(
      '[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL missing).',
      JSON.stringify({ name, company, email, projectType, timeline, length: details.length }),
    );
    return json({ ok: true, delivered: false }, 200);
  }

  const subject = `New enquiry — ${projectType} — ${company}`;
  const text = [
    `Name:         ${name}`,
    `Company:      ${company}`,
    `Email:        ${email}`,
    `Project type: ${projectType}`,
    `Timeline:     ${timeline}`,
    '',
    'Details:',
    details,
  ].join('\n');

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#12161b">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from ${escapeHtml(company)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:4px 16px 4px 0;color:#6b7683">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7683">Company</td><td>${escapeHtml(company)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7683">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7683">Project type</td><td>${escapeHtml(projectType)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7683">Timeline</td><td>${escapeHtml(timeline)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;border-left:3px solid #0e7c63;padding-left:14px">${escapeHtml(details)}</div>
    </div>
  `;

  try {
    // Called over REST rather than through the SDK to keep the dependency out.
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('[contact] Resend rejected the message', response.status, body.slice(0, 500));
      return json(
        {
          ok: false,
          message: `Your message could not be sent right now. Please email ${site.email} directly.`,
        },
        502,
      );
    }

    return json({ ok: true, delivered: true }, 200);
  } catch (error) {
    console.error('[contact] Delivery failed', error);
    return json(
      {
        ok: false,
        message: `Your message could not be sent right now. Please email ${site.email} directly.`,
      },
      502,
    );
  }
}

export function GET(): NextResponse {
  return NextResponse.json({ ok: false, message: 'Method not allowed.' }, { status: 405 });
}
