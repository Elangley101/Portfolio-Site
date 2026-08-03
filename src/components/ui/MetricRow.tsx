import { type Metric } from '@/content/metrics';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

function format(metric: Metric): string {
  const value = metric.value.toLocaleString('en-US', {
    minimumFractionDigits: metric.decimals ?? 0,
    maximumFractionDigits: metric.decimals ?? 0,
  });
  return `${metric.prefix ?? ''}${value}${metric.suffix}`;
}

type MetricRowProps = {
  metrics: readonly Metric[];
  className?: string;
  columns?: 2 | 4;
};

/**
 * Metrics reveal with a staggered fade rather than a count-up, so the real
 * number is in the markup from the first paint — better for crawlers, screen
 * readers and anyone with JavaScript disabled.
 */
export function MetricRow({ metrics, className, columns = 4 }: MetricRowProps) {
  return (
    <dl
      className={cn(
        'grid gap-x-8 gap-y-8',
        columns === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2',
        className,
      )}
    >
      {/* A dl may only contain dt/dd pairs wrapped in a single div, so Reveal
          renders that div rather than adding another level of nesting. */}
      {metrics.map((metric, index) => (
        <Reveal
          key={metric.label}
          delay={index * 80}
          className="border-l border-[var(--border)] pl-4 sm:pl-5"
        >
          <dt className="sr-only">{metric.label}</dt>
          <dd className="flex flex-col gap-1.5">
            <span className="text-fg block text-2xl font-semibold tracking-tight tabular-nums sm:text-[1.75rem]">
              {format(metric)}
            </span>
            <span className="text-fg block text-sm font-medium">{metric.label}</span>
            {metric.detail ? (
              <span className="text-fg-subtle block text-[0.8125rem]">{metric.detail}</span>
            ) : null}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
