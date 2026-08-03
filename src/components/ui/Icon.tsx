import { type SVGProps } from 'react';

/**
 * Hand-rolled 24px stroke icon set. Keeps the bundle free of an icon library
 * for the dozen glyphs this site actually uses.
 */
const paths = {
  compass: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5.5-5.5 2 2-5.5 5.5-2Z" />,
  gauge: (
    <>
      <path d="M12 21a9 9 0 1 1 9-9" />
      <path d="M21 12h-3" />
      <path d="M12 3v3" />
      <path d="m12 12 4.5-4.5" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.2 3 7.6 7.5 9 4.5-1.4 7.5-4.8 7.5-9V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5" />
      <path d="M15 3v5" />
      <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0V8Z" />
      <path d="M12 17v4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7.5 7.2 5.3a1.7 1.7 0 0 0 2 0l7.2-5.3" />
    </>
  ),
  github: (
    <path
      d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.47.09.65-.2.65-.46v-1.6c-2.64.58-3.2-1.27-3.2-1.27-.43-1.1-1.05-1.4-1.05-1.4-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.62.33-1.03.6-1.27-2.1-.24-4.32-1.05-4.32-4.68 0-1.04.37-1.88.98-2.55-.1-.24-.42-1.2.09-2.5 0 0 .8-.26 2.62.97a9.1 9.1 0 0 1 4.77 0c1.82-1.23 2.62-.97 2.62-.97.51 1.3.19 2.26.09 2.5.61.67.98 1.51.98 2.55 0 3.64-2.22 4.44-4.34 4.67.34.3.65.87.65 1.76v2.6c0 .26.17.56.65.46A9.5 9.5 0 0 0 12 2.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <path
      d="M6.94 8.5H3.9V21h3.04V8.5ZM5.42 3a1.83 1.83 0 1 0 0 3.66 1.83 1.83 0 0 0 0-3.66ZM20.1 13.7c0-3.3-1.76-4.84-4.11-4.84-1.9 0-2.74 1.04-3.22 1.78V8.5H9.74c.04.86 0 12.5 0 12.5h3.03v-6.98c0-.28.02-.55.1-.75.22-.55.72-1.12 1.57-1.12 1.1 0 1.55.84 1.55 2.08V21h3.03l.08-7.3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  document: (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
