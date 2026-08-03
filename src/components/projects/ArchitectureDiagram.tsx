import { type DiagramStage } from '@/content/projects';

type ArchitectureDiagramProps = {
  caption: string;
  stages: readonly DiagramStage[];
  title: string;
};

/**
 * Renders the architecture as structured markup rather than an image, so it
 * stays legible at any width, works in both themes and is readable by
 * assistive technology. The stage order is the data flow.
 */
export function ArchitectureDiagram({ caption, stages, title }: ArchitectureDiagramProps) {
  return (
    <figure className="bg-surface overflow-hidden rounded-xl border border-[var(--border)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-muted)] px-5 py-3">
        <p className="eyebrow">Architecture — {title}</p>
      </div>

      <div className="bg-grid p-5 sm:p-7">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 2xl:gap-2.5">
          {stages.map((stage, index) => (
            <li key={stage.label} className="relative">
              <div className="h-full rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
                <p className="text-fg-subtle font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                  {String(index + 1).padStart(2, '0')} · {stage.label}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {stage.nodes.map((node) => (
                    <li
                      key={node}
                      className="text-fg border-l-2 border-[var(--accent)] pl-2.5 text-[0.8125rem] leading-snug"
                    >
                      {node}
                    </li>
                  ))}
                </ul>
              </div>
              {index < stages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="text-fg-subtle absolute top-1/2 -right-2 hidden -translate-y-1/2 2xl:block"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path
                      d="m3 1 4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="text-fg-muted border-t border-[var(--border)] px-5 py-3 text-[0.8125rem]">
        {caption}
      </figcaption>
    </figure>
  );
}
