'use client';

import { useSyncExternalStore } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * The theme lives on <html> as a class, set before first paint by ThemeScript.
 * Reading it through useSyncExternalStore keeps the button in sync with the
 * DOM — the actual source of truth — without an effect.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

function getSnapshot(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/** The server always renders the dark class, so this matches during hydration. */
function getServerSnapshot(): 'light' | 'dark' {
  return 'dark';
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next = theme === 'dark' ? 'light' : 'dark';

  const toggle = () => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private browsing; the choice simply will not persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`text-fg-muted hover:text-fg hover:bg-surface-hover inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition-colors ${className ?? ''}`}
      aria-label={`Switch to ${next} theme`}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
