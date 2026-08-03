import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { BookCallButton, EmailButton } from '@/components/cta/CtaButtons';
import { PageHero } from '@/components/layout/PageHero';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { about } from '@/content/about';
import { processSteps } from '@/content/process';
import { site } from '@/content/site';
import { hasScheduling } from '@/lib/env';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Book a 20-minute discovery call about Snowflake costs, pipeline reliability, dbt modernization, vendor integrations or fractional data engineering.',
  path: '/contact',
  keywords: ['book data engineering consultation', 'hire fractional data engineer'],
});

const qualificationNote =
  'I typically work with teams that have a defined data-platform problem, an existing technical environment, and a clear business outcome.';

export default function ContactPage() {
  // Person, WebSite and ProfessionalService are emitted once in the root layout.
  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  );

  return (
    <>
      <JsonLd data={graph} />

      <PageHero
        eyebrow="Contact"
        heading="Start with a 20-minute call"
        body="Tell me what is slow, expensive or unreliable, and I will tell you honestly whether it is something I can help with. No pitch deck, no obligation, and a straight answer if I am not the right person."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookCallButton location="contact-hero" />
          <EmailButton location="contact-hero" />
        </div>
      </PageHero>

      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal id="contact-form" className="scroll-mt-28">
              <h2 className="text-fg text-2xl sm:text-[1.75rem]">Send project details</h2>
              <p className="text-fg-muted mt-3 leading-relaxed">
                The more context you can give here, the more useful the first call will be. I read
                every enquiry personally and usually reply within one business day.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <Suspense
                fallback={
                  <div
                    className="bg-surface h-[42rem] rounded-xl border border-[var(--border)]"
                    aria-hidden="true"
                  />
                }
              >
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-5 lg:sticky lg:top-28">
              <Reveal delay={60}>
                <div className="bg-surface rounded-xl border border-[var(--border)] p-6 sm:p-7">
                  <h2 className="eyebrow mb-4">Before you write</h2>
                  <p className="text-fg leading-relaxed">{qualificationNote}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-[var(--border)] pt-5">
                    {about.fitCriteria.good.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="text-accent mt-0.5 flex-shrink-0">
                          <Icon name="check" size={16} />
                        </span>
                        <span className="text-fg-muted text-[0.875rem] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="bg-surface rounded-xl border border-[var(--border)] p-6 sm:p-7">
                  <h2 className="eyebrow mb-4">What happens next</h2>
                  <ol className="space-y-4">
                    {processSteps.slice(0, 3).map((step) => (
                      <li key={step.step} className="flex gap-4">
                        <span className="text-accent font-mono text-[0.8125rem]">{step.step}</span>
                        <div>
                          <p className="text-fg text-[0.9375rem] font-medium">{step.title}</p>
                          <p className="text-fg-subtle mt-1 text-[0.8125rem] leading-relaxed">
                            {step.outputs.join(' · ')}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="bg-surface rounded-xl border border-[var(--border)] p-6 sm:p-7">
                  <h2 className="eyebrow mb-4">Direct</h2>
                  <dl className="space-y-3.5">
                    <div>
                      <dt className="text-fg-subtle text-[0.8125rem]">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${site.email}`}
                          className="text-accent rounded text-[0.9375rem] underline underline-offset-2"
                        >
                          {site.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-fg-subtle text-[0.8125rem]">Based in</dt>
                      <dd className="text-fg text-[0.9375rem]">{site.location}</dd>
                    </div>
                    <div>
                      <dt className="text-fg-subtle text-[0.8125rem]">Working hours</dt>
                      <dd className="text-fg text-[0.9375rem]">{site.timezone}</dd>
                    </div>
                    <div>
                      <dt className="text-fg-subtle text-[0.8125rem]">Discovery call</dt>
                      <dd className="text-fg text-[0.9375rem]">
                        {hasScheduling
                          ? '20 minutes — book any open slot.'
                          : '20 minutes — send details and I will propose times.'}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-fg-subtle mt-5 border-t border-[var(--border)] pt-4 text-[0.8125rem]">
                    {site.availabilityNote}
                  </p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
