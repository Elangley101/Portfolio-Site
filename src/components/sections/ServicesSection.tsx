import Link from 'next/link';
import { ServiceCtaLink } from '@/components/cta/CtaButtons';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { services, servicesIntro } from '@/content/services';
import { cn } from '@/lib/utils';

/** Compact grid used on the home page. */
export function ServicesPreview() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow={servicesIntro.eyebrow}
        heading={servicesIntro.heading}
        body={servicesIntro.body}
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          // The seventh card would otherwise sit alone on its own row, so the
          // flagship offering takes the full width instead.
          const wide = index === services.length - 1;

          return (
            <Reveal
              as="li"
              key={service.slug}
              delay={index * 50}
              className={cn('h-full', wide && 'sm:col-span-2 lg:col-span-3')}
            >
              <Card interactive className="group h-full">
                <Link
                  href={`/services#${service.slug}`}
                  className={cn(
                    'flex h-full rounded-lg outline-offset-8',
                    wide ? 'flex-col gap-5 sm:flex-row sm:items-center sm:gap-8' : 'flex-col',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'text-accent inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)]',
                      wide ? '' : 'mb-5',
                    )}
                  >
                    <Icon name={service.icon} size={20} />
                  </span>
                  <div className={cn('flex flex-1 flex-col', wide && 'sm:flex-none')}>
                    <h3 className="text-fg text-[1.0625rem] font-semibold">{service.title}</h3>
                    <p className="text-fg-muted mt-2.5 flex-1 text-[0.9375rem] leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'text-fg-subtle group-hover:text-accent inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide uppercase transition-colors',
                      wide ? 'sm:ml-auto' : 'mt-5',
                    )}
                  >
                    {service.format}
                    <Icon name="arrowRight" size={14} />
                  </span>
                </Link>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/** Full detail rows used on the Services page. */
export function ServicesDetail() {
  return (
    <div className="container-page pb-8">
      <ul className="divide-y divide-[var(--border)]">
        {services.map((service) => (
          <li
            key={service.slug}
            id={service.slug}
            className="scroll-mt-28 py-14 first:pt-4 sm:py-16"
          >
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <span
                  aria-hidden="true"
                  className="text-accent mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-soft)]"
                >
                  <Icon name={service.icon} size={22} />
                </span>
                <h2 className="text-fg text-2xl leading-tight sm:text-[1.75rem]">
                  {service.title}
                </h2>
                <p className="text-fg-muted mt-3 text-[0.9375rem] leading-relaxed">
                  {service.tagline}
                </p>
                <p className="eyebrow mt-5">{service.format}</p>
              </div>

              <div className="space-y-7 lg:col-span-8">
                <div>
                  <h3 className="eyebrow mb-2.5">The problem</h3>
                  <p className="text-fg-muted leading-relaxed">{service.problem}</p>
                </div>

                <div>
                  <h3 className="eyebrow mb-2.5">What I do</h3>
                  <p className="text-fg leading-relaxed">{service.work}</p>
                </div>

                <div>
                  <h3 className="eyebrow mb-3">Typical deliverables</h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="text-accent mt-0.5 flex-shrink-0">
                          <Icon name="check" size={16} />
                        </span>
                        <span className="text-fg-muted text-[0.9375rem] leading-snug">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ServiceCtaLink
                  projectType={service.projectType}
                  label={service.ctaLabel}
                  serviceSlug={service.slug}
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
