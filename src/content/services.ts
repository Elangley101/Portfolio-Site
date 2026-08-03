import { type IconName } from '@/components/ui/Icon';
import { type ProjectTypeValue } from '@/lib/contact-schema';

export type Service = {
  slug: string;
  title: string;
  /** One-line summary used in compact contexts. */
  tagline: string;
  icon: IconName;
  /** The situation a client is in before the engagement. */
  problem: string;
  /** What the engagement actually consists of. */
  work: string;
  deliverables: readonly string[];
  ctaLabel: string;
  /** Pre-selects the contact form's project type. */
  projectType: ProjectTypeValue;
  /** Typical engagement shape, shown as a small label. */
  format: string;
};

export const servicesIntro = {
  eyebrow: 'Services',
  heading: 'Seven services, each scoped to one outcome',
  body: 'Every piece of work starts from a defined problem and ends with something you own: working systems, documentation and a prioritized plan for what comes next.',
} as const;

export const services: readonly Service[] = [
  {
    slug: 'data-platform-assessment',
    title: 'Data Platform Assessment',
    tagline: 'An independent read on your warehouse, pipelines and cost profile.',
    icon: 'compass',
    problem:
      'You suspect something is wrong — costs, reliability or delivery speed — but you do not have an unbiased picture of where the real constraints are, or what to fix first.',
    work: 'I review your warehouse, pipelines, orchestration, data models, observability and spend, then write up what I found and what I would do about it, in priority order.',
    deliverables: [
      'Architecture review of the current platform',
      'Reliability assessment with concrete failure modes',
      'Cost and performance findings',
      'Prioritized remediation plan',
      'Implementation roadmap you can hand to any engineer',
    ],
    ctaLabel: 'Discuss an assessment',
    projectType: 'assessment',
    format: 'Typically 1–2 weeks',
  },
  {
    slug: 'snowflake-cost-optimization',
    title: 'Snowflake Cost & Performance Optimization',
    tagline: 'Cut credit burn without slowing anyone down.',
    icon: 'gauge',
    problem:
      'Snowflake spend is rising faster than the business is growing. Warehouses were sized once and never revisited, and nobody can attribute cost to a team or workload.',
    work: 'I analyze warehouse utilization and query patterns, right-size compute, put resource monitors and guardrails in place, and give you reporting that keeps the savings from quietly eroding.',
    deliverables: [
      'Warehouse utilization analysis',
      'Query performance review of the heaviest workloads',
      'Resource monitor configuration',
      'Right-sizing recommendations with expected impact',
      'Cost-governance dashboard',
      'Implementation of the agreed optimizations',
    ],
    ctaLabel: 'Discuss cost optimization',
    projectType: 'snowflake',
    format: 'Typically 2–4 weeks',
  },
  {
    slug: 'pipeline-reliability-sprint',
    title: 'Pipeline Reliability Sprint',
    tagline: 'Stop fragile ETL and ELT jobs from failing silently.',
    icon: 'shield',
    problem:
      'Jobs fail without alerting anyone. Reruns create duplicates. An upstream schema change breaks a downstream model and nobody knows until a stakeholder complains.',
    work: 'I work through your failure history, make the critical paths idempotent and observable, add validation where bad data enters, and leave behind alerting and runbooks your team can operate.',
    deliverables: [
      'Failure analysis across recent incidents',
      'Retry, backoff and alerting improvements',
      'Idempotency and deduplication review',
      'Schema validation at ingestion boundaries',
      'Data-quality tests on business-critical models',
      'Monitoring dashboards and written runbooks',
    ],
    ctaLabel: 'Discuss a reliability sprint',
    projectType: 'reliability',
    format: 'Typically 2–6 weeks',
  },
  {
    slug: 'dbt-warehouse-modernization',
    title: 'dbt & Warehouse Modernization',
    tagline: 'Turn sprawling SQL into a tested, reviewable project.',
    icon: 'layers',
    problem:
      'Transformations live in scheduled scripts, stored procedures or a BI tool. There is no lineage, no tests, no review process, and changes are risky enough that people avoid making them.',
    work: 'I migrate your transformations into a properly structured dbt project with staging and mart layers, tests, documentation and CI, so changes become routine instead of frightening.',
    deliverables: [
      'dbt project setup and conventions',
      'Migration of existing SQL transformations',
      'Model organization across staging, intermediate and mart layers',
      'Testing and generated documentation',
      'CI/CD integration for pull-request validation',
      'Query and materialization performance tuning',
    ],
    ctaLabel: 'Discuss dbt modernization',
    projectType: 'dbt',
    format: 'Typically 3–6 weeks',
  },
  {
    slug: 'api-vendor-integrations',
    title: 'API & Vendor Data Integrations',
    tagline: 'Reliable ingestion from the systems you do not control.',
    icon: 'plug',
    problem:
      'Onboarding each new vendor takes weeks, the transfers are manual or brittle, and there is no consistent pattern for authentication, validation or error handling.',
    work: 'I build Python ingestion services for REST APIs, SFTP feeds, operational databases and third-party platforms, using one repeatable pattern so the next integration is faster than the last.',
    deliverables: [
      'Source-system assessment and access model',
      'Python ingestion services',
      'Schema validation and contract enforcement',
      'Incremental and backfill loading strategies',
      'Error handling, retries and alerting',
      'Warehouse integration and modeling',
      'Operational documentation for your team',
    ],
    ctaLabel: 'Discuss an integration',
    projectType: 'integrations',
    format: 'Typically 2–6 weeks',
  },
  {
    slug: 'internal-ai-rag-prototypes',
    title: 'Internal AI & RAG Prototypes',
    tagline: 'Practical internal tools built on data you can actually trust.',
    icon: 'search',
    problem:
      'There is pressure to do something with AI, but your documents are scattered, access rules are unclear, and nobody wants an internal tool that surfaces information to the wrong people.',
    work: 'I build focused internal systems — document ingestion, vector search, a retrieval pipeline and a small API and chat surface — with authorization designed in from the start. This is applied engineering on your own data, not an AI transformation program.',
    deliverables: [
      'Document ingestion and chunking pipeline',
      'Vector search over your own content',
      'Retrieval pipeline with source citations',
      'FastAPI backend',
      'Authentication and per-user access boundaries',
      'A basic chat interface for evaluation',
      'Cloud deployment and handover',
    ],
    ctaLabel: 'Discuss an internal AI tool',
    projectType: 'ai-rag',
    format: 'Typically 4–6 weeks',
  },
  {
    slug: 'fractional-data-engineering',
    title: 'Fractional Data Engineering',
    tagline: 'Senior technical ownership without a full-time headcount.',
    icon: 'clock',
    problem:
      'You have real data work that keeps slipping, but not enough of it — or not enough certainty — to justify hiring another senior engineer at full cost.',
    work: 'I take ownership of a defined workstream at roughly 8–12 hours per week: agreed priorities, milestone-based delivery, written updates and very few meetings. I hold a limited number of these at a time so the ones I take get real attention.',
    deliverables: [
      'Around 8–12 hours per week on agreed priorities',
      'Technical ownership of a defined workstream',
      'Milestone-oriented delivery rather than hourly tickets',
      'Written weekly updates instead of standing meetings',
      'Architecture and tooling guidance for your team',
      'Documentation that survives the engagement',
    ],
    ctaLabel: 'Discuss fractional support',
    projectType: 'fractional',
    format: 'Monthly, limited capacity',
  },
] as const;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export type Engagement = {
  name: string;
  summary: string;
  duration: string;
  bestFor: string;
  includes: readonly string[];
  featured?: boolean;
};

export const engagementsIntro = {
  eyebrow: 'Engagement models',
  heading: 'Three ways to work together',
  body: 'Scope, price and schedule are agreed after a discovery call — once there is a real problem to size, not before.',
  pricingNote: 'Starting scope determined after discovery.',
} as const;

export const engagements: readonly Engagement[] = [
  {
    name: 'Assessment',
    summary: 'For teams that need clarity before committing to implementation.',
    duration: '1–2 weeks',
    bestFor:
      'Unclear costs, unclear reliability, or an architecture decision you want a second opinion on.',
    includes: [
      'Review of the current platform and data flows',
      'Written findings with severity and effort',
      'Prioritized remediation plan',
      'Roadmap any engineer can execute',
    ],
  },
  {
    name: 'Project Sprint',
    summary: 'For a clearly defined implementation or remediation project.',
    duration: '2–6 weeks',
    bestFor:
      'A known problem with a known desired end state — a migration, a reliability push, an integration program.',
    includes: [
      'Agreed milestones and acceptance criteria',
      'Implementation in your environment',
      'Tests, monitoring and documentation',
      'Handoff session and next-step plan',
    ],
    featured: true,
  },
  {
    name: 'Fractional Support',
    summary: 'For ongoing technical ownership and steady execution.',
    duration: 'Monthly, limited capacity',
    bestFor: 'A continuing workstream that needs a senior owner but not a full-time hire.',
    includes: [
      'A monthly allocation with agreed priorities',
      'Milestone-based deliverables',
      'Written updates, minimal meetings',
      'Architecture guidance for your team',
    ],
  },
] as const;
