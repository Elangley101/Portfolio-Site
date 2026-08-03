'use client';

import { track as vercelTrack } from '@vercel/analytics';
import { analytics } from './env';

/** The four conversion events worth watching. */
export type ConversionEvent =
  | 'discovery_call_cta_clicked'
  | 'email_cta_clicked'
  | 'contact_form_submitted'
  | 'service_cta_clicked';

type EventProps = Record<string, string | number | boolean | null>;

type PlausibleFn = (event: string, options?: { props?: EventProps }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * Fire a conversion event to whichever privacy-preserving provider is
 * configured. Silently does nothing when analytics is switched off.
 */
export function trackEvent(event: ConversionEvent, props?: EventProps): void {
  if (typeof window === 'undefined') return;

  try {
    if (analytics.vercelEnabled) {
      vercelTrack(event, props ?? undefined);
    }
    if (analytics.plausibleDomain && typeof window.plausible === 'function') {
      window.plausible(event, props ? { props } : undefined);
    }
  } catch {
    // Analytics must never break an interaction.
  }
}
