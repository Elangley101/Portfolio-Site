import { ButtonLink } from '@/components/ui/Button';
import { TagList } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { type CaseResult, caseResults, resultsIntro } from '@/content/results';

function ResultEntry({ result }: { result: CaseResult }) {
  return (
    <Reveal
      as="article"
      id={result.slug}
      className="grid scroll-mt-28 gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-4">
        <p className="text-accent text-[2.75rem] leading-none font-semibold tracking-tight tabular-nums sm:text-5xl">
          {result.headline}
        </p>
        <p className="text-fg mt-2 text-[0.9375rem] font-medium">{result.headlineLabel}</p>
        <h3 className="text-fg-subtle mt-5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
          {result.title}
        </h3>
      </div>

      <div className="lg:col-span-8">
        <dl className="space-y-5">
          <div>
            <dt className="eyebrow mb-2">Challenge</dt>
            <dd className="text-fg-muted leading-relaxed">{result.challenge}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Work</dt>
            <dd className="text-fg-muted leading-relaxed">{result.work}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Result</dt>
            <dd className="text-fg leading-relaxed">{result.result}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <TagList items={result.stack} label={`Technologies used in ${result.title}`} />
        </div>
      </div>
    </Reveal>
  );
}

/** Home page: three headline results plus a link to the full page. */
export function ResultsPreview({ tone = 'muted' }: { tone?: 'default' | 'muted' }) {
  return (
    <Section id="results" tone={tone} bordered>
      <SectionHeader
        eyebrow={resultsIntro.eyebrow}
        heading={resultsIntro.heading}
        body={resultsIntro.body}
      />

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {caseResults.slice(0, 3).map((result, index) => (
          <Reveal as="li" key={result.slug} delay={index * 70}>
            <article className="bg-surface flex h-full flex-col rounded-xl border border-[var(--border)] p-7">
              <p className="text-accent text-[2.5rem] leading-none font-semibold tracking-tight tabular-nums">
                {result.headline}
              </p>
              <p className="text-fg mt-2 text-[0.9375rem] font-medium">{result.headlineLabel}</p>
              <h3 className="text-fg mt-6 text-base font-semibold">{result.title}</h3>
              <p className="text-fg-muted mt-2.5 flex-1 text-[0.9375rem] leading-relaxed">
                {result.work}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={220} className="mt-10">
        <ButtonLink href="/results" variant="secondary" size="md">
          See all results in detail
          <Icon name="arrowRight" size={16} />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

/** Results page: every case in full. */
export function ResultsDetail() {
  return (
    <div className="container-page">
      <div className="divide-y divide-[var(--border)]">
        {caseResults.map((result) => (
          <ResultEntry key={result.slug} result={result} />
        ))}
      </div>
    </div>
  );
}
