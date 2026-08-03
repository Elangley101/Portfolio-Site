import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { analytics } from '@/lib/env';

/**
 * Privacy-preserving analytics, off unless explicitly configured.
 * Set NEXT_PUBLIC_ENABLE_ANALYTICS=true for Vercel Analytics, and/or
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN for Plausible.
 */
export function SiteAnalytics() {
  return (
    <>
      {analytics.vercelEnabled ? <VercelAnalytics /> : null}
      {analytics.plausibleDomain ? (
        <Script
          defer
          data-domain={analytics.plausibleDomain}
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
