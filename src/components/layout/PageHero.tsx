import Link from 'next/link';
import { type ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

type Crumb = { name: string; path: string };

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  body: string;
  breadcrumbs?: readonly Crumb[];
  children?: ReactNode;
};

export function PageHero({ eyebrow, heading, body, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_30%_0%,black,transparent)]"
      />
      <div className="container-page relative pt-12 pb-14 sm:pt-16 sm:pb-18 lg:pt-20 lg:pb-20">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="text-fg-subtle flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-wide uppercase">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-fg-muted">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-fg rounded transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-fg text-[2.125rem] leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
            {heading}
          </h1>
          <p className="text-fg-muted mt-6 text-[1.0625rem] leading-relaxed">{body}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
