export type CaseResult = {
  slug: string;
  title: string;
  /** Headline number rendered large. */
  headline: string;
  headlineLabel: string;
  challenge: string;
  work: string;
  result: string;
  stack: readonly string[];
};

export const resultsIntro = {
  eyebrow: 'Results',
  heading: 'Measured outcomes, not adjectives',
  body: 'These are outcomes from production work delivered in enterprise and high-volume operational environments. Client names and proprietary details are deliberately omitted.',
} as const;

export const caseResults: readonly CaseResult[] = [
  {
    slug: 'warehouse-modernization',
    title: 'Warehouse Modernization',
    headline: '75%',
    headlineLabel: 'faster reporting',
    challenge:
      'Enterprise reporting took approximately eight hours to complete, which meant business teams were routinely making decisions against yesterday’s picture.',
    work: 'Migrated analytics workloads into Microsoft Fabric and rebuilt the transformation layer using dbt, with tested, documented models replacing opaque legacy logic.',
    result:
      'Reporting latency dropped by 75%, from roughly eight hours to under two, and the transformation layer became reviewable and testable in version control.',
    stack: ['Microsoft Fabric', 'dbt', 'SQL', 'Azure'],
  },
  {
    slug: 'snowflake-cost-governance',
    title: 'Snowflake Cost Governance',
    headline: '22%',
    headlineLabel: 'lower warehouse spend',
    challenge:
      'Snowflake spending had no effective governance. Warehouses had been sized once and left alone, and there was no mechanism to catch runaway consumption.',
    work: 'Implemented Python-based cost governance with resource monitors, warehouse right-sizing and recurring reporting so that consumption stayed attributable and visible.',
    result:
      'Snowflake spending decreased by 22%, with ongoing monitoring in place to keep the reduction from eroding over time.',
    stack: ['Snowflake', 'Python', 'Resource monitors', 'SQL'],
  },
  {
    slug: 'production-pipeline-reliability',
    title: 'Production Pipeline Reliability',
    headline: '99.9%',
    headlineLabel: 'sustained pipeline SLA',
    challenge:
      'Business-critical data arrived continuously from a mix of operational systems and third-party providers, each with its own failure behavior and delivery schedule.',
    work: 'Built and operated production pipelines spanning REST APIs, SFTP feeds, Databricks, Azure Data Factory and Snowflake, with retry semantics, validation and alerting on the critical paths.',
    result:
      'Maintained a 99.9% SLA on production pipelines while processing approximately 12 GB of data per day.',
    stack: ['Azure Data Factory', 'Databricks', 'Snowflake', 'Python', 'Apache Airflow'],
  },
  {
    slug: 'vendor-integration-program',
    title: 'Vendor Integration Program',
    headline: '8+',
    headlineLabel: 'integrations in under 3 months',
    challenge:
      'Multiple third-party data providers needed onboarding, each requiring secure transfer, predictable scheduling and validation before the data could be trusted downstream.',
    work: 'Integrated REST and SFTP sources behind a consistent ingestion pattern with schema validation and encrypted transfer controls, so each new provider reused proven components.',
    result:
      'Delivered more than eight vendor integrations in under three months, and reduced ad hoc data requests by 35% by publishing self-service data contracts on top of them.',
    stack: ['Python', 'REST APIs', 'SFTP', 'Snowflake', 'Schema validation'],
  },
  {
    slug: 'spark-processing-performance',
    title: 'Spark Processing Performance',
    headline: '60%',
    headlineLabel: 'faster processing',
    challenge:
      'Batch processing windows were long enough to push downstream availability late, limiting how often data could realistically be refreshed.',
    work: 'Rebuilt the processing layer on PySpark and Delta Lake, restructuring the jobs around incremental patterns rather than repeated full reprocessing.',
    result:
      'Processing time fell by approximately 60%, and the same work also lifted backend data-processing throughput by 40% on the services consuming the output.',
    stack: ['Apache Spark', 'PySpark', 'Delta Lake', 'Databricks'],
  },
] as const;
