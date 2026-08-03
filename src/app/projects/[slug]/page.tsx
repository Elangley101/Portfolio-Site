import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/cta/CtaBand';
import { PageHero } from '@/components/layout/PageHero';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { ProjectLinks } from '@/components/projects/ProjectLinks';
import { TagList } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { getProject, projects } from '@/content/projects';
import { site } from '@/content/site';
import { siteUrl } from '@/lib/env';
import { breadcrumbSchema, jsonLdGraph, pageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return pageMetadata({
    // The full summary runs past what search results display; the teaser is
    // written to stand alone at roughly the right length.
    title: project.title,
    description: `${project.teaser} Architecture, engineering decisions and outcome.`,
    path: `/projects/${project.slug}`,
    keywords: project.stack,
  });
}

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-fg-muted leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" id={id} className="scroll-mt-28 border-t border-[var(--border)] pt-10">
      <h2 className="text-fg mb-6 text-2xl sm:text-[1.625rem]">{title}</h2>
      {children}
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const graph = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.slug}` },
    ]),
    {
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary,
      url: `${siteUrl}/projects/${project.slug}`,
      author: { '@id': `${siteUrl}/#person` },
      keywords: project.stack.join(', '),
      ...(project.links.repo ? { codeRepository: project.links.repo } : {}),
    },
  );

  return (
    <>
      <JsonLd data={graph} />

      <PageHero
        eyebrow={`${project.kind} · ${project.year}`}
        heading={project.title}
        body={project.summary}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      >
        <div className="flex flex-col gap-6">
          <ProjectLinks links={project.links} title={project.title} />
          <p className="text-fg-subtle font-mono text-[0.6875rem] tracking-wide uppercase">
            {project.status}
          </p>
        </div>
      </PageHero>

      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-12 lg:col-span-8">
            <Reveal as="section" id="problem" className="scroll-mt-28">
              <h2 className="text-fg mb-6 text-2xl sm:text-[1.625rem]">The problem</h2>
              <Prose paragraphs={project.problem} />
            </Reveal>

            <Block id="architecture" title="Architecture">
              {project.diagram ? (
                <div className="mb-8">
                  <ArchitectureDiagram
                    caption={project.diagram.caption}
                    stages={project.diagram.stages}
                    title={project.title}
                  />
                </div>
              ) : null}
              <Prose paragraphs={project.architecture} />
            </Block>

            <Block id="components" title="Major components">
              <dl className="divide-y divide-[var(--border)]">
                {project.components.map((component) => (
                  <div key={component.name} className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-fg text-[0.9375rem] font-medium">{component.name}</dt>
                    <dd className="text-fg-muted text-[0.9375rem] leading-relaxed sm:col-span-2">
                      {component.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="decisions" title="Engineering decisions">
              <ul className="space-y-6">
                {project.decisions.map((decision) => (
                  <li key={decision.title} className="border-l-2 border-[var(--accent)] pl-5">
                    <h3 className="text-fg text-[1.0625rem] font-semibold">{decision.title}</h3>
                    <p className="text-fg-muted mt-2 leading-relaxed">{decision.body}</p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="challenges" title="Challenges and tradeoffs">
              <ul className="space-y-6">
                {project.challenges.map((challenge) => (
                  <li key={challenge.title}>
                    <h3 className="text-fg text-[1.0625rem] font-semibold">{challenge.title}</h3>
                    <p className="text-fg-muted mt-2 leading-relaxed">{challenge.body}</p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="outcome" title="Outcome">
              <ul className="space-y-3.5">
                {project.outcome.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="text-accent mt-1 flex-shrink-0">
                      <Icon name="check" size={17} />
                    </span>
                    <span className="text-fg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="bg-surface rounded-xl border border-[var(--border)] p-6">
                  <h2 className="eyebrow mb-4">Technology stack</h2>
                  <TagList items={project.stack} label={`Full stack for ${project.title}`} />

                  <h2 className="eyebrow mt-7 mb-3">Status</h2>
                  <p className="text-fg-muted text-[0.875rem] leading-relaxed">{project.status}</p>

                  {project.links.repo || project.links.demo ? (
                    <div className="mt-7 border-t border-[var(--border)] pt-6">
                      <ProjectLinks links={project.links} title={project.title} />
                    </div>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={80} className="mt-5">
                <nav
                  aria-label="On this page"
                  className="bg-surface rounded-xl border border-[var(--border)] p-6"
                >
                  <h2 className="eyebrow mb-4">On this page</h2>
                  <ul className="space-y-2.5">
                    {[
                      { id: 'problem', label: 'The problem' },
                      { id: 'architecture', label: 'Architecture' },
                      { id: 'components', label: 'Major components' },
                      { id: 'decisions', label: 'Engineering decisions' },
                      { id: 'challenges', label: 'Challenges and tradeoffs' },
                      { id: 'outcome', label: 'Outcome' },
                    ].map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-fg-muted hover:text-fg rounded text-[0.875rem] transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            </div>
          </aside>
        </div>

        {next && next.slug !== project.slug ? (
          <Reveal className="mt-16 border-t border-[var(--border)] pt-8">
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-1 rounded-lg outline-offset-4"
            >
              <span className="eyebrow">Next case study</span>
              <span className="text-fg group-hover:text-accent inline-flex items-center gap-2 text-xl font-semibold transition-colors">
                {next.title}
                <Icon
                  name="arrowRight"
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
        ) : null}
      </div>

      <CtaBand
        location={`project-${project.slug}`}
        subtle
        heading="Need something like this built?"
        body={`I take on a limited number of engagements at a time. If this maps to a problem you have, tell me about it — or email ${site.email}.`}
      />
    </>
  );
}
