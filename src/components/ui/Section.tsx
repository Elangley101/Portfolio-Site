import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Tints the band so adjacent sections read as distinct. */
  tone?: 'default' | 'muted';
  /** Vertical rhythm. */
  spacing?: 'default' | 'tight';
  bordered?: boolean;
};

export function Section({
  id,
  children,
  className,
  tone = 'default',
  spacing = 'default',
  bordered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacing === 'tight' ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28',
        tone === 'muted' && 'bg-bg-muted',
        bordered && 'border-t border-[var(--border)]',
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  /** Renders the heading as h1 on pages where the section leads. */
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  heading,
  body,
  as: Heading = 'h2',
  align = 'left',
  className,
  children,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Heading
        className={cn(
          'text-fg',
          Heading === 'h1'
            ? 'text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-[3.25rem]'
            : 'text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[2.5rem]',
        )}
      >
        {heading}
      </Heading>
      {body ? (
        <p className="text-fg-muted mt-5 text-base leading-relaxed sm:text-[1.0625rem]">{body}</p>
      ) : null}
      {children}
    </Reveal>
  );
}
