import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a hover lift. Only use where the whole card is interactive. */
  interactive?: boolean;
};

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-xl border border-[var(--border)] p-6 sm:p-7',
        interactive &&
          'hover:shadow-raised transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--border-strong)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="text-fg-muted inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--bg-muted)] px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
