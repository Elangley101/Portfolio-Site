import type { Metadata } from 'next';
import { CtaBand } from '@/components/cta/CtaBand';
import { PageHero } from '@/components/layout/PageHero';
import { ResultsDetail } from '@/components/sections/ResultsSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { MetricRow } from '@/components/ui/MetricRow';
import { Reveal } from '@/components/ui/Reveal';
import { heroMetrics, supportingMetrics } from '@/content/metrics';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Results',
  description:
    'Measured outcomes from production data engineering: 75% faster reporting, 22% lower Snowflake spend, a 99.9% pipeline SLA and 12 GB per day of ingest.',
  path: '/results',
  keywords: [
    'Snowflake cost reduction case study',
    'data pipeline SLA',
    'Microsoft Fabric migration',
    'dbt migration results',
  ],
});

export default function ResultsPage() {
  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Results', path: '/results' },
    ]),
  );

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        eyebrow="Results"
        heading="What the work actually produced"
        body="Outcomes from production systems in enterprise and high-volume operational environments. Every number here is one I delivered against directly. Client names and proprietary details are deliberately left out."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Results', path: '/results' },
        ]}
      />

      <section className="border-b border-[var(--border)] bg-[var(--bg-muted)] py-12 sm:py-14">
        <div className="container-page">
          <Reveal>
            <h2 className="eyebrow mb-8">Headline outcomes</h2>
            <MetricRow metrics={heroMetrics} />
          </Reveal>
        </div>
      </section>

      <div className="py-6 sm:py-8">
        <ResultsDetail />
      </div>

      <section className="border-t border-[var(--border)] bg-[var(--bg-muted)] py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-fg text-2xl sm:text-[1.75rem]">Supporting numbers</h2>
            <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
              Additional measured improvements from the same body of work, across processing
              performance, integration delivery and analyst self-service.
            </p>
            <div className="mt-10">
              <MetricRow metrics={supportingMetrics} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        location="results-footer"
        heading="Want a number like these for your platform?"
        body="Tell me what is slow, expensive or unreliable right now. Twenty minutes is usually enough to tell whether there is a straightforward win available."
      />
    </>
  );
}
