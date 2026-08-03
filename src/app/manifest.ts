import type { MetadataRoute } from 'next';
import { seo, site } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0a0c0f',
    theme_color: '#0a0c0f',
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
