import type { Metadata } from 'next';
import { CtaBand } from '@/components/cta/CtaBand';
import { PageHero } from '@/components/layout/PageHero';
import { EngagementsSection } from '@/components/sections/EngagementsSection';
import { ServicesDetail } from '@/components/sections/ServicesSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { services } from '@/content/services';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Data Engineering Services',
  description:
    'Data platform assessments, Snowflake cost optimization, pipeline reliability sprints, dbt modernization, vendor integrations and fractional data engineering.',
  path: '/services',
  keywords: services.map((service) => service.title),
});

export default function ServicesPage() {
  // Person, WebSite and ProfessionalService are emitted once in the root layout.
  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  );

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        eyebrow="Services"
        heading="Seven ways I help data teams"
        body="Each of these starts from a defined problem and ends with something your team owns. If what you need sits between two of them, that is usually fine — say so on the call and we will scope it properly."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="bg-surface text-fg-muted hover:text-fg inline-flex rounded-md border border-[var(--border)] px-3 py-1.5 text-[0.8125rem] transition-colors hover:border-[var(--border-strong)]"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <ServicesDetail />
      <EngagementsSection tone="muted" />
      <CtaBand location="services-footer" />
    </>
  );
}
