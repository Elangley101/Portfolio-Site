type ClassValue = string | number | false | null | undefined;

/** Minimal class-name joiner. Avoids pulling in clsx for a five-line helper. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith('mailto:');
}
