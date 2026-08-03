import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { processIntro, processSteps, workingPrinciples } from '@/content/process';

type ProcessSectionProps = {
  tone?: 'default' | 'muted';
  /** The Process page adds the working-principles block. */
  showPrinciples?: boolean;
  headingAs?: 'h1' | 'h2';
};

export function ProcessSection({
  tone = 'default',
  showPrinciples = false,
  headingAs = 'h2',
}: ProcessSectionProps) {
  return (
    <Section id="process" tone={tone} bordered>
      <SectionHeader
        eyebrow={processIntro.eyebrow}
        heading={processIntro.heading}
        body={processIntro.body}
        as={headingAs}
      />

      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <Reveal as="li" key={step.step} delay={index * 70}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="text-accent font-mono text-[0.8125rem] tracking-widest">
                  {step.step}
                </span>
                <span aria-hidden="true" className="rule-x flex-1" />
              </div>
              <h3 className="text-fg mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="text-fg-muted mt-2.5 flex-1 text-[0.9375rem] leading-relaxed">
                {step.body}
              </p>
              <ul className="mt-5 space-y-1.5 border-t border-[var(--border)] pt-4">
                {step.outputs.map((output) => (
                  <li
                    key={output}
                    className="text-fg-subtle font-mono text-[0.6875rem] tracking-wide"
                  >
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      {showPrinciples ? (
        <div className="mt-20 border-t border-[var(--border)] pt-14">
          <Reveal>
            <h2 className="text-fg text-2xl sm:text-[1.75rem]">How I work</h2>
          </Reveal>
          <ul className="mt-9 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {workingPrinciples.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 60}>
                <h3 className="text-fg text-[1.0625rem] font-semibold">{principle.title}</h3>
                <p className="text-fg-muted mt-2 text-[0.9375rem] leading-relaxed">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
