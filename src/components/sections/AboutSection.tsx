import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { about } from '@/content/about';
import { supportingMetrics } from '@/content/metrics';
import { MetricRow } from '@/components/ui/MetricRow';

export function AboutPreview() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader eyebrow={about.eyebrow} heading={about.heading} body={about.lead} />
          <Reveal delay={80}>
            <p className="text-fg-muted mt-5 leading-relaxed">{about.paragraphs[0]}</p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary" size="md">
                More about how I work
                <Icon name="arrowRight" size={16} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140} className="lg:col-span-5">
          <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-3 gap-4 py-4">
                <dt className="eyebrow pt-1">{fact.label}</dt>
                <dd className="text-fg col-span-2 text-[0.9375rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal delay={200} className="mt-16 border-t border-[var(--border)] pt-10">
        <h3 className="sr-only">Additional measured outcomes</h3>
        <MetricRow metrics={supportingMetrics} />
      </Reveal>
    </Section>
  );
}
