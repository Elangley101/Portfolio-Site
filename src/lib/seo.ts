import type { Metadata } from 'next';
import { seo, site } from '@/content/site';
import { services } from '@/content/services';
import { siteUrl } from './env';

type PageMetaInput = {
  title: string;
  description: string;
  /** Root-relative path, e.g. '/services'. */
  path: string;
  keywords?: readonly string[];
};

/** Builds consistent canonical, Open Graph and Twitter metadata for a page. */
export function pageMetadata({ title, description, path, keywords }: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === '/' ? '' : path}`;
  const fullTitle = path === '/' ? seo.title : `${title} | ${site.name}`;

  // Declaring openGraph here opts out of the file-based opengraph-image
  // convention, so the generated card has to be referenced explicitly.
  const images = [
    { url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: seo.ogImageAlt },
  ];

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: 'en_US',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
  };
}

type JsonLd = Record<string, unknown>;

const personId = `${siteUrl}/#person`;
const serviceId = `${siteUrl}/#service`;

export function personSchema(): JsonLd {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    url: siteUrl,
    email: `mailto:${site.email}`,
    jobTitle: 'Senior Data Engineer and Data Platform Consultant',
    description: seo.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    sameAs: [site.socials.github, site.socials.linkedin],
    knowsAbout: [
      'Data engineering',
      'Snowflake',
      'dbt',
      'Databricks',
      'Apache Spark',
      'Apache Airflow',
      'Azure Data Factory',
      'Microsoft Fabric',
      'Python',
      'SQL',
      'FastAPI',
      'PostgreSQL',
      'Retrieval-augmented generation',
      'Data platform architecture',
    ],
  };
}

export function professionalServiceSchema(): JsonLd {
  return {
    '@type': 'ProfessionalService',
    '@id': serviceId,
    name: `${site.name} — Data Platform Consulting`,
    url: siteUrl,
    description: seo.description,
    email: `mailto:${site.email}`,
    founder: { '@id': personId },
    provider: { '@id': personId },
    areaServed: { '@type': 'Country', name: 'United States' },
    availableLanguage: 'English',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    serviceType: services.map((service) => service.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Data engineering consulting services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.tagline,
          url: `${siteUrl}/services#${service.slug}`,
        },
      })),
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: seo.description,
    publisher: { '@id': personId },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(trail: readonly { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
}

/** Wraps one or more nodes into a single @graph document. */
export function jsonLdGraph(...nodes: JsonLd[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
