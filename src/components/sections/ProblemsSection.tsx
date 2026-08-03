import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { problems, problemsIntro } from '@/content/problems';

export function ProblemsSection() {
  return (
    <Section id="problems" tone="muted" bordered>
      <SectionHeader
        eyebrow={problemsIntro.eyebrow}
        heading={problemsIntro.heading}
        body={problemsIntro.body}
      />

      <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
        {problems.map((problem, index) => (
          <Reveal as="li" key={problem.title} delay={index * 60}>
            <div className="border-t-2 border-[var(--border-strong)] pt-5">
              <h3 className="text-fg text-[1.0625rem] font-semibold">{problem.title}</h3>
              <p className="text-fg-muted mt-2.5 text-[0.9375rem] leading-relaxed">
                {problem.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
