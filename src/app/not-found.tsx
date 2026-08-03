import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { primaryNav } from '@/content/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist. Here is where everything else lives.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="text-fg text-[2.125rem] leading-tight sm:text-5xl">
        That page does not exist.
      </h1>
      <p className="text-fg-muted mt-5 max-w-xl leading-relaxed">
        The link may be out of date, or the page may have moved during a recent redesign. Everything
        on the site is reachable from here.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" size="lg">
          Back to home
          <Icon name="arrowRight" size={17} />
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Get in touch
        </ButtonLink>
      </div>

      <nav aria-label="Site sections" className="mt-14 border-t border-[var(--border)] pt-8">
        <h2 className="eyebrow mb-5">All pages</h2>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-fg hover:text-accent rounded text-[0.9375rem] font-medium transition-colors"
              >
                {item.label}
              </Link>
              <p className="text-fg-subtle mt-0.5 text-[0.8125rem]">{item.description}</p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
