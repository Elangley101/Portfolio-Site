export type Metric = {
  /** Numeric portion, animated on reveal. */
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  /** Optional expansion shown beneath the label. */
  detail?: string;
  decimals?: number;
};

/** The compact credibility row under the hero. Keep to four. */
export const heroMetrics: readonly Metric[] = [
  {
    value: 75,
    suffix: '%',
    label: 'Faster reporting',
    detail: 'Roughly 8 hours down to under 2',
  },
  {
    value: 22,
    suffix: '%',
    label: 'Lower Snowflake spend',
    detail: 'Cost governance and right-sizing',
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'Pipeline SLA',
    decimals: 1,
    detail: 'Sustained on production workloads',
  },
  {
    value: 12,
    suffix: ' GB/day',
    label: 'Production ingest',
    detail: 'Across APIs, SFTP and warehouses',
  },
] as const;

/** Supporting numbers used on the Results page. */
export const supportingMetrics: readonly Metric[] = [
  {
    value: 60,
    suffix: '%',
    label: 'Faster Spark processing',
    detail: 'PySpark and Delta Lake rebuild',
  },
  {
    value: 8,
    prefix: '',
    suffix: '+',
    label: 'Vendor feeds integrated',
    detail: 'Delivered within three months',
  },
  {
    value: 40,
    suffix: '%',
    label: 'Higher backend throughput',
    detail: 'Python and FastAPI services',
  },
  {
    value: 35,
    suffix: '%',
    label: 'Fewer ad hoc data requests',
    detail: 'Self-service data contracts',
  },
] as const;
