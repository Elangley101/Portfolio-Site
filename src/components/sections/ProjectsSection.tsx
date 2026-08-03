import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { TagList } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { type Project, projects } from '@/content/projects';

function ProjectCard({
  project,
  headingLevel = 'h3',
}: {
  project: Project;
  /** h3 under a section heading, h2 when the cards follow the page h1 directly. */
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;

  return (
    <article className="bg-surface group hover:shadow-raised relative flex h-full flex-col rounded-xl border border-[var(--border)] p-6 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="text-fg-subtle font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
          {project.kind}
        </span>
        <span aria-hidden="true" className="rule-x flex-1" />
        <span className="text-fg-subtle font-mono text-[0.6875rem]">{project.year}</span>
      </div>

      <Heading className="text-fg mt-4 text-xl font-semibold">
        <Link href={`/projects/${project.slug}`} className="rounded outline-offset-4">
          {/* Stretched link keeps the whole card clickable without nesting interactive elements. */}
          <span className="absolute inset-0" aria-hidden="true" />
          {project.title}
        </Link>
      </Heading>

      <p className="text-fg-muted mt-3 flex-1 leading-relaxed">{project.teaser}</p>

      <div className="mt-6">
        <TagList
          items={project.stack.slice(0, 5)}
          label={`Primary technologies in ${project.title}`}
        />
      </div>

      <span className="text-accent mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
        Read the case study
        <Icon
          name="arrowRight"
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}

/** Home page teaser: the two most representative projects. */
export function ProjectsPreview() {
  return (
    <Section id="projects" tone="muted" bordered>
      <SectionHeader
        eyebrow="Projects"
        heading="Systems I have designed and built"
        body="Detailed engineering write-ups covering architecture, decisions and the tradeoffs behind them — useful whether you are evaluating me for an engagement or for a role."
      />

      <ul className="mt-14 grid gap-5 lg:grid-cols-2">
        {projects.slice(0, 2).map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 70} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200} className="mt-10">
        <ButtonLink href="/projects" variant="secondary" size="md">
          View all projects
          <Icon name="arrowRight" size={16} />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

/** Projects index grid. */
export function ProjectsGrid() {
  return (
    <div className="container-page pb-4">
      <ul className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 60} className="h-full">
            <ProjectCard project={project} headingLevel="h2" />
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200} className="mt-10">
        <p className="text-fg-subtle text-sm">
          Public repositories are linked on each case study. Where a repository is private, no link
          is shown.
        </p>
      </Reveal>
    </div>
  );
}
