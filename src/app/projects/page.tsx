import type { Metadata } from 'next';
import { CtaBand } from '@/components/cta/CtaBand';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectsGrid } from '@/components/sections/ProjectsSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { projects, projectsIntro } from '@/content/projects';
import { siteUrl } from '@/lib/env';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Engineering case studies: a multi-cloud cost governance platform, a retrieval-augmented document intelligence app, a Kafka analytics pipeline and LogPulse.',
  path: '/projects',
  keywords: [
    'data engineering portfolio',
    'Snowflake dbt project',
    'RAG application case study',
    'Kafka streaming pipeline project',
  ],
});

export default function ProjectsPage() {
  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
    {
      '@type': 'ItemList',
      name: 'Engineering case studies',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: `${siteUrl}/projects/${project.slug}`,
      })),
    },
  );

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        eyebrow={projectsIntro.eyebrow}
        heading={projectsIntro.heading}
        body={projectsIntro.body}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ]}
      />

      <div className="py-14 sm:py-16">
        <ProjectsGrid />
      </div>

      <CtaBand
        location="projects-footer"
        subtle
        heading="Working on something similar?"
        body="If one of these looks close to a problem you have, a short call is the quickest way to find out whether the same approach applies."
      />
    </>
  );
}
