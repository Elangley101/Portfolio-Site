export const about = {
  eyebrow: 'About',
  heading: 'Data engineering with an architecture and backend background',
  /** Lead paragraph, used on the home page teaser as well. */
  lead: 'I am a remote-first senior data engineer and emerging solutions architect with more than four years of experience designing enterprise-scale data platforms. I work with startups and growing companies that need senior data-platform capability without adding permanent headcount.',
  paragraphs: [
    'Most of my work sits at the point where data engineering meets platform architecture: warehouse and lakehouse design on Snowflake, Databricks and Microsoft Fabric, transformation layers in dbt and SQL, orchestration through Airflow and Azure Data Factory, and ingestion services written in Python against whatever the upstream system happens to be.',
    'I also spend time on the backend side of the boundary — FastAPI services, PostgreSQL, AWS and Docker — which matters more than it sounds. A lot of data problems are really integration problems, and being comfortable on both sides of the API means fewer handoffs and fewer things lost between teams.',
    'My experience spans retail, logistics, SaaS and enterprise integration work. That has meant everything from operational systems with real-time expectations to vendor feeds that arrive on somebody else’s schedule in somebody else’s format.',
    'I am comfortable running the whole arc of a piece of work: sitting with founders, executives, analysts and engineers to understand what is actually needed, then going away and building it. Explaining a tradeoff to a non-technical stakeholder is part of the job, not an afterthought.',
    'What I optimize for is reliability, cost control, maintainability and business outcomes — in that order. I would rather deliver a boring system that runs unattended for two years than an elegant one that needs me to keep it alive.',
  ],
  facts: [
    { label: 'Based in', value: 'Savannah, Georgia — remote-first' },
    { label: 'Hours', value: 'Eastern Time, with overlap for US and EU teams' },
    { label: 'Experience', value: '4+ years building enterprise-scale data platforms' },
    { label: 'Industries', value: 'Retail, logistics, SaaS, enterprise integration' },
    { label: 'Education', value: 'B.S. Computer Science, Marshall University' },
  ],
  /** Used to set expectations without over-promising availability. */
  fitCriteria: {
    good: [
      'A defined data-platform problem you can describe in a paragraph',
      'An existing technical environment — a warehouse, some pipelines, real data',
      'A business outcome attached to the work',
      'Someone internal who can grant access and make decisions',
    ],
    poor: [
      'Greenfield product builds with no data platform involved',
      'Staff-augmentation seats with no defined scope',
      'Work requiring full-time, same-hours availability',
      'AI initiatives with no underlying data to work from',
    ],
  },
} as const;
