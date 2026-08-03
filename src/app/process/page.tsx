import type { Metadata } from 'next';
import { CtaBand } from '@/components/cta/CtaBand';
import { PageHero } from '@/components/layout/PageHero';
import { EngagementsSection } from '@/components/sections/EngagementsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Process',
  description:
    'How a data engineering engagement runs: discovery, technical assessment, milestone-based delivery and a documented handoff, with minimal meeting overhead.',
  path: '/process',
  keywords: [
    'data engineering engagement process',
    'consulting discovery call',
    'technical assessment',
  ],
});

export default function ProcessPage() {
  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Process', path: '/process' },
    ]),
  );

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        eyebrow="Process"
        heading="Four stages, written down, low overhead"
        body="You should never have to ask where an engagement stands. Scope is agreed before work starts, progress is reported in writing every week, and everything is documented well enough that your team can take it over."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ]}
      />

      <ProcessSection showPrinciples />
      <EngagementsSection tone="muted" />
      <CtaBand location="process-footer" />
    </>
  );
}
