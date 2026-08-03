import { BookCallButton, EmailButton } from '@/components/cta/CtaButtons';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';
import { hasScheduling } from '@/lib/env';
import { cn } from '@/lib/utils';

type CtaBandProps = {
  location: string;
  heading?: string;
  body?: string;
  /** Quieter treatment for project pages, where the CTA should not dominate. */
  subtle?: boolean;
};

export function CtaBand({ location, heading, body, subtle = false }: CtaBandProps) {
  const title = heading ?? 'Have a data platform problem worth solving?';
  const copy =
    body ??
    'A 20-minute call is enough to work out whether this is something I can help with, and what a sensible first engagement would look like. No pitch deck.';

  return (
    <section
      className={cn(
        'border-t border-[var(--border)]',
        subtle ? 'py-14 sm:py-16' : 'bg-bg-muted py-20 sm:py-24',
      )}
    >
      <div className="container-page">
        <Reveal
          className={cn(
            'flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12',
            subtle && 'bg-surface rounded-xl border border-[var(--border)] p-7 sm:p-9',
          )}
        >
          <div className="max-w-xl">
            <h2
              className={cn(
                'text-fg',
                subtle ? 'text-xl sm:text-2xl' : 'text-[1.75rem] leading-tight sm:text-4xl',
              )}
            >
              {title}
            </h2>
            <p className="text-fg-muted mt-3 leading-relaxed">{copy}</p>
            <p className="text-fg-subtle mt-4 text-sm">
              {site.availabilityNote}{' '}
              {hasScheduling
                ? 'Pick a time that suits you.'
                : 'Send a few details and I will reply personally.'}
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <BookCallButton location={location} size={subtle ? 'md' : 'lg'} />
            <EmailButton location={location} size={subtle ? 'md' : 'lg'} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
