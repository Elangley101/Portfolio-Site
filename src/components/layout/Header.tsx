'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { BookCallButton } from '@/components/cta/CtaButtons';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Icon } from '@/components/ui/Icon';
import { cta, primaryNav, site } from '@/content/site';
import { cn } from '@/lib/utils';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Scroll position is browser state, so it is read rather than mirrored. */
function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );

  // Close the mobile panel whenever the route changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Lock scroll and allow Escape to dismiss while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-200',
        scrolled || open
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-md"
            aria-label={`${site.name} — home`}
          >
            <span
              aria-hidden="true"
              className="bg-accent text-accent-contrast flex h-7 w-7 items-center justify-center rounded-md font-mono text-[0.8125rem] font-semibold"
            >
              EL
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-fg text-[0.9375rem] font-semibold tracking-tight">
                {site.name}
              </span>
              <span className="text-fg-subtle mt-1 hidden font-mono text-[0.625rem] tracking-[0.12em] uppercase sm:block">
                Data Platform Consulting
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative rounded-md px-3 py-2 text-sm transition-colors',
                        active ? 'text-fg' : 'text-fg-muted hover:text-fg hover:bg-surface-hover',
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="bg-accent absolute inset-x-3 -bottom-0.5 h-px"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden lg:block">
              <BookCallButton location="header" size="md" label={cta.primaryShort} />
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="text-fg-muted hover:text-fg hover:bg-surface-hover inline-flex h-9 w-9 items-center justify-center rounded-lg lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--border)] bg-[var(--bg)] lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex flex-col gap-0.5 rounded-lg px-3 py-3 transition-colors',
                        active ? 'bg-surface text-fg' : 'text-fg hover:bg-surface-hover',
                      )}
                    >
                      <span className="text-[0.9375rem] font-medium">{item.label}</span>
                      <span className="text-fg-subtle text-[0.8125rem]">{item.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <BookCallButton location="mobile-nav" size="lg" className="w-full" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
