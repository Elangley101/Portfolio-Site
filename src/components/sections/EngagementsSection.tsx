import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { engagements, engagementsIntro } from '@/content/services';
import { cn } from '@/lib/utils';

export function EngagementsSection({ tone = 'muted' }: { tone?: 'default' | 'muted' }) {
  return (
    <Section id="engagements" tone={tone} bordered>
      <SectionHeader
        eyebrow={engagementsIntro.eyebrow}
        heading={engagementsIntro.heading}
        body={engagementsIntro.body}
      />

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {engagements.map((engagement, index) => (
          <Reveal as="li" key={engagement.name} delay={index * 70} className="h-full">
            <Card
              className={cn(
                'flex h-full flex-col',
                engagement.featured && 'border-[var(--accent)] ring-1 ring-[var(--accent-ring)]',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-fg text-lg font-semibold">{engagement.name}</h3>
                {engagement.featured ? (
                  <span className="text-accent rounded-md bg-[var(--accent-soft)] px-2 py-1 font-mono text-[0.625rem] tracking-wider uppercase">
                    Most common
                  </span>
                ) : null}
              </div>

              <p className="text-fg-muted mt-2.5 text-[0.9375rem] leading-relaxed">
                {engagement.summary}
              </p>

              <dl className="mt-5 space-y-3 border-t border-[var(--border)] pt-5">
                <div>
                  <dt className="eyebrow mb-1">Typical duration</dt>
                  <dd className="text-fg text-[0.9375rem] font-medium">{engagement.duration}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Best for</dt>
                  <dd className="text-fg-muted text-[0.875rem] leading-relaxed">
                    {engagement.bestFor}
                  </dd>
                </div>
              </dl>

              <ul className="mt-5 flex-1 space-y-2.5 border-t border-[var(--border)] pt-5">
                {engagement.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-accent mt-0.5 flex-shrink-0">
                      <Icon name="check" size={16} />
                    </span>
                    <span className="text-fg-muted text-[0.875rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-fg-subtle mt-6 border-t border-[var(--border)] pt-4 font-mono text-[0.6875rem] tracking-wide">
                {engagementsIntro.pricingNote}
              </p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
