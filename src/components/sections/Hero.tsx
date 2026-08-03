import { BookCallButton } from '@/components/cta/CtaButtons';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MetricRow } from '@/components/ui/MetricRow';
import { Reveal } from '@/components/ui/Reveal';
import { heroMetrics } from '@/content/metrics';
import { cta, site } from '@/content/site';

/** Decorative schematic. Communicates the domain without a wall of logos. */
const flow = [
  { label: 'Sources', items: ['APIs', 'SFTP', 'Operational DBs'] },
  { label: 'Ingest', items: ['Python', 'Airflow', 'Data Factory'] },
  { label: 'Warehouse', items: ['Snowflake', 'Databricks', 'Fabric'] },
  { label: 'Models', items: ['dbt', 'Tests', 'Contracts'] },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(72%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-page relative pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-fg-muted inline-flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1.5 pr-3.5 pl-2.5 text-[0.8125rem] sm:items-center sm:rounded-full">
                <span
                  aria-hidden="true"
                  className="bg-accent mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full sm:mt-0"
                />
                {site.availabilityNote}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-fg mt-6 text-[2.375rem] leading-[1.06] sm:text-[3.25rem] lg:text-[3.75rem]">
                Reliable data platforms without another full-time hire.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-fg-muted mt-6 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-lg">
                I help startups and growing teams cut Snowflake costs, stabilize failing pipelines,
                modernize warehouse architecture, build dependable backend and vendor integrations,
                and stand up internal AI systems on data they can actually trust.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BookCallButton location="hero" />
                <ButtonLink href="/services" variant="secondary" size="lg">
                  {cta.services}
                  <Icon name="arrowRight" size={17} />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={240} className="lg:col-span-5">
            <div
              aria-hidden="true"
              className="bg-surface shadow-raised rounded-xl border border-[var(--border)] p-5 sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="eyebrow">Typical scope</span>
                <span className="text-fg-subtle font-mono text-[0.6875rem]">end to end</span>
              </div>
              <ol className="space-y-3">
                {flow.map((stage, index) => (
                  <li key={stage.label} className="relative flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-fg-subtle flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-muted)] font-mono text-[0.6875rem]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {index < flow.length - 1 ? (
                        <span className="mt-1 h-6 w-px bg-[var(--border)]" />
                      ) : null}
                    </div>
                    <div className="pb-1">
                      <p className="text-fg text-sm font-medium">{stage.label}</p>
                      <p className="text-fg-subtle mt-1 font-mono text-[0.6875rem] tracking-wide">
                        {stage.items.join('  ·  ')}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="text-fg-muted text-[0.8125rem]">
                  Monitored, tested and documented, so it keeps running after I leave.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-16 border-t border-[var(--border)] pt-10 sm:mt-20">
          <h2 className="sr-only">Selected results</h2>
          <MetricRow metrics={heroMetrics} />
        </Reveal>
      </div>
    </section>
  );
}
