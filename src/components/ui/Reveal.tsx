'use client';

import { type CSSProperties, type ElementType, type ReactNode, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Fades content up the first time it enters the viewport. The animation lives
 * in CSS and is disabled entirely under prefers-reduced-motion, so this only
 * toggles a data attribute. The observer is attached from a ref callback so no
 * effect is needed.
 */
export function Reveal({ children, delay = 0, as, className, id }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const [visible, setVisible] = useState(false);

  const attach = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={attach}
      id={id}
      className={cn('reveal', className)}
      data-visible={visible ? 'true' : 'false'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
