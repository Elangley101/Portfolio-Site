import Link from 'next/link';
import { EmailButton } from '@/components/cta/CtaButtons';
import { Icon } from '@/components/ui/Icon';
import { services } from '@/content/services';
import { primaryNav, site } from '@/content/site';
import { resumeIsAvailable } from '@/lib/resume';

export function Footer() {
  const year = new Date().getFullYear();
  const showResume = resumeIsAvailable();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-muted)]">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-fg text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="text-fg-muted mt-2 max-w-sm text-sm leading-relaxed">
              Fractional data engineering and data platform consulting for startups and growing
              teams. Remote-first from {site.location}.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <EmailButton location="footer" size="md" />
              {showResume ? (
                <a
                  href={site.resume.path}
                  className="text-fg-muted hover:text-fg inline-flex items-center gap-2 rounded-md text-sm transition-colors"
                  download
                >
                  <Icon name="document" size={16} />
                  {site.resume.label}
                </a>
              ) : null}
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow mb-4">Site</h2>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fg-muted hover:text-fg rounded text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-4">
            <h2 className="eyebrow mb-4">Services</h2>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-fg-muted hover:text-fg rounded text-sm transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fg-subtle text-[0.8125rem]">
            © {year} {site.name}. {site.location}.
          </p>
          <div className="flex items-center gap-1">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg hover:bg-surface-hover inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
              aria-label={`${site.name} on GitHub`}
            >
              <Icon name="github" size={18} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg hover:bg-surface-hover inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
              aria-label={`${site.name} on LinkedIn`}
            >
              <Icon name="linkedin" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
