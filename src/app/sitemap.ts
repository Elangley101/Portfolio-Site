import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { siteUrl } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] =
    [
      { path: '/', priority: 1, changeFrequency: 'monthly' },
      { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/results', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/process', priority: 0.6, changeFrequency: 'yearly' },
      { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
      { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
    ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
