/**
 * Client-safe configuration.
 *
 * NEXT_PUBLIC_* values must be referenced as full literals so Next can inline
 * them at build time — do not rewrite these as dynamic property lookups.
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Absolute site origin used for canonical URLs, sitemap and OG tags. */
export const siteUrl = (
  clean(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://ethanlangley.dev'
).replace(/\/$/, '');

/**
 * External scheduling link (Cal.com, Savvycal, Calendly, ...).
 * When unset, every discovery-call CTA falls back to the contact form.
 */
const rawSchedulingUrl = clean(process.env.NEXT_PUBLIC_SCHEDULING_URL);

export const schedulingUrl: string | undefined =
  rawSchedulingUrl && /^https?:\/\//i.test(rawSchedulingUrl) ? rawSchedulingUrl : undefined;

export const hasScheduling = schedulingUrl !== undefined;

/** Where the primary CTA points, whichever is configured. */
export const bookingHref: string = schedulingUrl ?? '/contact#contact-form';

export const analytics = {
  vercelEnabled: clean(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) === 'true',
  plausibleDomain: clean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
} as const;

export const analyticsEnabled = analytics.vercelEnabled || analytics.plausibleDomain !== undefined;
