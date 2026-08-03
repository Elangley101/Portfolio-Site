'use client';

import { type ButtonSize, type ButtonVariant, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cta, site } from '@/content/site';
import { trackEvent } from '@/lib/analytics';
import { bookingHref, hasScheduling } from '@/lib/env';

type TrackedProps = {
  /** Where on the site the click happened, recorded with the event. */
  location: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
};

/**
 * Primary conversion action. Opens the scheduling link when
 * NEXT_PUBLIC_SCHEDULING_URL is set, otherwise routes to the contact form.
 */
export function BookCallButton({
  location,
  variant = 'primary',
  size = 'lg',
  className,
  label,
}: TrackedProps) {
  return (
    <ButtonLink
      href={bookingHref}
      variant={variant}
      size={size}
      className={className}
      onClick={() =>
        trackEvent('discovery_call_cta_clicked', { location, scheduling: hasScheduling })
      }
    >
      <Icon name="calendar" size={17} />
      {label ?? cta.primary}
    </ButtonLink>
  );
}

const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  'Data platform project',
)}&body=${encodeURIComponent(
  `Hi Ethan,\n\nCompany:\nWhat we're trying to solve:\nCurrent stack:\nRough timeline:\n\n`,
)}`;

/** Secondary conversion action. */
export function EmailButton({
  location,
  variant = 'secondary',
  size = 'lg',
  className,
  label,
}: TrackedProps) {
  return (
    <ButtonLink
      href={mailtoHref}
      variant={variant}
      size={size}
      className={className}
      onClick={() => trackEvent('email_cta_clicked', { location })}
    >
      <Icon name="mail" size={17} />
      {label ?? cta.secondary}
    </ButtonLink>
  );
}

type ServiceCtaProps = {
  projectType: string;
  label: string;
  serviceSlug: string;
};

/** Per-service CTA that pre-selects the project type on the contact form. */
export function ServiceCtaLink({ projectType, label, serviceSlug }: ServiceCtaProps) {
  return (
    <ButtonLink
      href={`/contact?type=${projectType}#contact-form`}
      variant="ghost"
      size="md"
      className="text-accent -ml-4 hover:bg-[var(--accent-soft)]"
      onClick={() => trackEvent('service_cta_clicked', { service: serviceSlug })}
    >
      {label}
      <Icon name="arrowRight" size={16} />
    </ButtonLink>
  );
}
