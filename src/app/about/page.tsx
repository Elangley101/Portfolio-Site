import type { Metadata } from 'next';
import { CtaBand } from '@/components/cta/CtaBand';
import { PageHero } from '@/components/layout/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { MetricRow } from '@/components/ui/MetricRow';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { about } from '@/content/about';
import { supportingMetrics } from '@/content/metrics';
import { site, techStack } from '@/content/site';
import { resumeIsAvailable } from '@/lib/resume';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Remote-first senior data engineer and emerging solutions architect in Savannah, Georgia, with 4+ years designing enterprise-scale data platforms.',
  path: '/about',
  keywords: ['senior data engineer Savannah', 'solutions architect', 'remote data engineer'],
});

export default function AboutPage() {
  const showResume = resumeIsAvailable();
  // Person, WebSite and ProfessionalService are emitted once in the root layout.
  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  );

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        eyebrow="About"
        heading={about.heading}
        body={about.lead}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      >
        {showResume ? (
          <ButtonLink href={site.resume.path} variant="secondary" size="md" download>
            <Icon name="document" size={16} />
            {site.resume.label}
          </ButtonLink>
        ) : null}
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-5">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-fg-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <h2 className="eyebrow mb-5">At a glance</h2>
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
        </div>
      </Section>

      <Section tone="muted" bordered>
        <Reveal>
          <h2 className="text-fg text-2xl sm:text-[1.75rem]">What I work with</h2>
          <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
            Tools are a means to an end, so this is a working inventory rather than a badge
            collection. Depth matters more than breadth, and I will tell you when something is
            outside what I would take on.
          </p>
        </Reveal>

        <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(techStack).map(([group, items], index) => (
            <Reveal key={group} delay={index * 60}>
              <dt className="eyebrow border-t border-[var(--border-strong)] pt-4">{group}</dt>
              <dd className="text-fg mt-3 text-[0.9375rem] leading-relaxed">{items.join(' · ')}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-fg text-2xl sm:text-[1.75rem]">Who this works well for</h2>
          <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
            Being straightforward about fit saves everyone a call. If your situation is on the
            right-hand list, I would rather point you somewhere more useful.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h3 className="text-fg text-lg font-semibold">A good fit</h3>
            <ul className="mt-5 space-y-3">
              {about.fitCriteria.good.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-accent mt-0.5 flex-shrink-0">
                    <Icon name="check" size={17} />
                  </span>
                  <span className="text-fg-muted text-[0.9375rem] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-fg text-lg font-semibold">Probably not a fit</h3>
            <ul className="mt-5 space-y-3">
              {about.fitCriteria.poor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="text-fg-subtle mt-2 h-px w-3.5 flex-shrink-0 bg-current"
                  />
                  <span className="text-fg-subtle text-[0.9375rem] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-16 border-t border-[var(--border)] pt-10">
          <h2 className="eyebrow mb-8">Selected measured outcomes</h2>
          <MetricRow metrics={supportingMetrics} />
        </Reveal>
      </Section>

      <CtaBand location="about-footer" />
    </>
  );
}
