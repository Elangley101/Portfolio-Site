/**
 * Single source of truth for identity, contact details, navigation and SEO copy.
 * Edit here rather than in components.
 */

export const site = {
  name: 'Ethan Langley',
  firstName: 'Ethan',
  role: 'Data Platform Consultant & Fractional Data Engineer',
  shortRole: 'Fractional Data Engineer',
  location: 'Savannah, Georgia',
  locality: 'Savannah',
  region: 'GA',
  country: 'US',
  timezone: 'America/New_York (ET)',
  email: 'Ethan.langley.dev@gmail.com',
  url: 'https://ethanlangley.dev',
  domain: 'ethanlangley.dev',
  availabilityNote: 'Currently taking a limited number of new engagements.',
  socials: {
    github: 'https://github.com/Elangley101',
    linkedin: 'https://www.linkedin.com/in/ethan-langley-44849b249/',
  },
  resume: {
    // Rendered only when this file is present in /public. See public/resume/README.md.
    path: '/resume/Ethan-Langley-Resume.pdf',
    label: 'Download resume',
  },
} as const;

export const seo = {
  title: 'Ethan Langley | Fractional Data Engineer and Data Platform Consultant',
  titleTemplate: '%s | Ethan Langley',
  description:
    'Fractional data engineering and consulting for Snowflake, dbt, Airflow, Python, cloud data platforms, API integrations, and internal AI systems.',
  keywords: [
    'fractional data engineer',
    'data platform consultant',
    'Snowflake cost optimization',
    'dbt consultant',
    'data pipeline reliability',
    'Databricks consultant',
    'Airflow consulting',
    'Azure Data Factory',
    'Microsoft Fabric',
    'RAG prototype',
    'data engineering consultant Savannah',
  ],
  ogImageAlt: 'Ethan Langley — fractional data engineering and data platform consulting',
} as const;

export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/', description: 'Overview of how I help data teams' },
  { label: 'Services', href: '/services', description: 'Assessments, sprints and fractional work' },
  { label: 'Results', href: '/results', description: 'Measured outcomes from delivered work' },
  { label: 'Projects', href: '/projects', description: 'Engineering case studies in depth' },
  { label: 'Process', href: '/process', description: 'How an engagement actually runs' },
  { label: 'About', href: '/about', description: 'Background, stack and working style' },
  { label: 'Contact', href: '/contact', description: 'Start a conversation' },
] as const;

export const cta = {
  primary: 'Book a 20-minute discovery call',
  primaryShort: 'Book a discovery call',
  secondary: `Email ${site.firstName}`,
  services: 'View services',
} as const;

/** Grouped for the About page and footer. Deliberately not rendered as logo walls. */
export const techStack = {
  'Warehouses & Lakehouses': [
    'Snowflake',
    'Databricks',
    'Microsoft Fabric',
    'Delta Lake',
    'PostgreSQL',
  ],
  'Transformation & Processing': ['dbt', 'Apache Spark', 'PySpark', 'SQL', 'Python'],
  'Orchestration & Ingestion': ['Apache Airflow', 'Azure Data Factory', 'REST APIs', 'SFTP feeds'],
  'Cloud & Platform': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
  'Delivery & Backend': ['FastAPI', 'GitHub Actions', 'GitLab CI/CD'],
} as const satisfies Record<string, readonly string[]>;
