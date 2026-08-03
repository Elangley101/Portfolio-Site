export type DiagramStage = {
  label: string;
  nodes: readonly string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Short qualifier shown next to the title. */
  kind: string;
  summary: string;
  /** Single-sentence hook for the index grid. */
  teaser: string;
  year: string;
  status: string;
  /** Business or technical problem. */
  problem: readonly string[];
  /** Narrative description of the architecture. */
  architecture: readonly string[];
  diagram?: {
    caption: string;
    stages: readonly DiagramStage[];
  };
  components: readonly { name: string; body: string }[];
  decisions: readonly { title: string; body: string }[];
  challenges: readonly { title: string; body: string }[];
  outcome: readonly string[];
  stack: readonly string[];
  links: {
    repo?: string;
    demo?: string;
  };
};

export const projectsIntro = {
  eyebrow: 'Projects',
  heading: 'Engineering case studies',
  body: 'Systems I have designed and built, written up the way I would explain them in a technical review: the problem, the architecture, the decisions and the tradeoffs I accepted. Where a repository is public it is linked. Where it is not, there is no link rather than a dead one.',
} as const;

export const projects: readonly Project[] = [
  {
    slug: 'cloud-cost-governance-platform',
    title: 'Cloud Cost Governance Platform',
    kind: 'Data platform',
    year: '2025',
    status: 'Private repository',
    teaser:
      'Multi-cloud cost data unified in Snowflake, modeled with dbt, and pushed into Slack the day an anomaly appears.',
    summary:
      'A cost governance platform that ingests Azure Cost Management and AWS cost data into Snowflake, models it with dbt, and turns the result into daily reporting and anomaly alerting that finance and engineering can both read.',
    problem: [
      'Cloud spend was split across two providers with different billing exports, different granularity and different update cadences. Answering “what changed and who owns it?” meant somebody exporting spreadsheets and reconciling them by hand.',
      'By the time a cost spike showed up in a monthly review, it had usually been running for weeks. There was no daily signal, no ownership attribution and no shared definition of normal.',
    ],
    architecture: [
      'Provider-specific extractors pull Azure Cost Management and AWS cost and usage data on a daily schedule and land it in Snowflake as raw, immutable snapshots. Nothing is transformed on the way in, so a modeling bug never costs you the source data.',
      'dbt handles everything after landing. A staging layer normalizes the two providers into one grain and one vocabulary — account, service, resource, date, amortized cost — which is where most of the real work is, because the two vendors disagree on nearly every field name and cost definition.',
      'Daily fact tables sit on top of staging, and mart models aggregate them into the shapes people actually query: spend by service, by account and by day, plus rolling baselines used for anomaly comparison.',
      'An alerting job evaluates the marts against those baselines and posts to Slack when a service or account deviates beyond threshold, with enough context in the message to act on it without opening a dashboard.',
    ],
    diagram: {
      caption: 'Daily batch flow from provider billing exports to Slack alerting.',
      stages: [
        { label: 'Sources', nodes: ['Azure Cost Management', 'AWS Cost & Usage'] },
        { label: 'Ingest', nodes: ['Python extractors', 'Daily schedule'] },
        { label: 'Warehouse', nodes: ['Snowflake raw', 'Immutable snapshots'] },
        { label: 'Transform', nodes: ['dbt staging', 'Daily facts', 'Cost marts'] },
        { label: 'Serve', nodes: ['Reporting', 'Anomaly detection', 'Slack alerts'] },
      ],
    },
    components: [
      {
        name: 'Cost ingestion services',
        body: 'Python extractors per provider, each responsible only for authentication, pagination and landing raw records. Failures are isolated to one provider rather than taking the whole run down.',
      },
      {
        name: 'Snowflake data model',
        body: 'Raw, staging, fact and mart layers with a single unified cost grain across providers, so a query does not need to know which cloud a line item came from.',
      },
      {
        name: 'dbt transformation project',
        body: 'Normalization, currency and amortization handling, daily fact models and aggregate marts, with tests on uniqueness, referential integrity and non-negative cost values.',
      },
      {
        name: 'Anomaly and alerting layer',
        body: 'Baseline comparison against recent history, with Slack notifications that name the service, the delta and the window rather than just firing a threshold.',
      },
      {
        name: 'CLI tooling and documentation',
        body: 'A command-line entry point for backfills, targeted re-runs and ad hoc extraction, plus written operating documentation so a backfill is not tribal knowledge.',
      },
    ],
    decisions: [
      {
        title: 'Land raw, transform later',
        body: 'Billing exports change shape without warning. Storing untransformed snapshots means a modeling change can be replayed over history instead of requiring a re-pull from providers that limit how far back you can go.',
      },
      {
        title: 'One cost grain across both clouds',
        body: 'Unifying at the staging layer means every downstream model, dashboard and alert works identically for Azure and AWS. Adding a third provider becomes a staging model rather than a platform change.',
      },
      {
        title: 'Alerting on baselines, not fixed thresholds',
        body: 'Static dollar thresholds are wrong within a quarter as usage grows. Comparing against a rolling baseline keeps alerts meaningful without constant tuning.',
      },
      {
        title: 'Slack as the delivery surface',
        body: 'A dashboard only helps people who open it. Cost anomalies needed to reach an owner the day they happened, which meant pushing to where the team already was.',
      },
    ],
    challenges: [
      {
        title: 'Reconciling two billing vocabularies',
        body: 'Azure and AWS disagree about what a service is, how discounts are applied and when a charge is final. The mapping layer is deliberately explicit and documented rather than clever, because it needs to be auditable when a number is questioned.',
      },
      {
        title: 'Late-arriving and restated costs',
        body: 'Both providers restate recent days. Facts are built to be recomputed over a trailing window rather than appended once, which costs a little more compute in exchange for numbers that stop moving.',
      },
      {
        title: 'Alert fatigue',
        body: 'The first version alerted on too much and people stopped reading it. Tightening sensitivity and adding context to each message mattered more than any detection improvement.',
      },
    ],
    outcome: [
      'Cost data from both providers lands in one warehouse on a daily cadence, with a shared model that finance and engineering read the same way.',
      'Cost anomalies surface as Slack alerts within a day rather than at the end of a billing cycle.',
      'Backfills and re-runs are a documented CLI command rather than a manual exercise.',
    ],
    stack: [
      'Python',
      'Snowflake',
      'dbt',
      'Azure Cost Management',
      'AWS Cost Explorer',
      'Slack API',
      'SQL',
    ],
    links: {},
  },

  {
    slug: 'faa-document-intelligence',
    title: 'FAA Document Intelligence Application',
    kind: 'Internal AI / RAG',
    year: '2025',
    status: 'In active development — private repository',
    teaser:
      'Retrieval-augmented search over FAA source material, with authorization designed in before the chat interface.',
    summary:
      'An internal document search and question-answering application built over FAA materials. A Python ingestion pipeline feeds PostgreSQL with pgvector, a FastAPI backend serves retrieval-augmented answers, and per-user access boundaries are enforced at retrieval time rather than bolted on afterwards.',
    problem: [
      'FAA source material is long, densely cross-referenced and updated in place. Finding the passage that answers a specific operational question means knowing which document to open before you start, which is exactly the knowledge newer staff do not have.',
      'Keyword search over these documents performs poorly because the language in a question rarely matches the language in the regulation. The useful match is semantic, not lexical.',
      'Any internal tool over this material has to respect who is allowed to see what. A system that returns a well-cited answer from a document the user should not have access to is worse than no system at all.',
    ],
    architecture: [
      'A Python ingestion pipeline handles acquisition, parsing and chunking. Chunk boundaries follow document structure rather than a fixed token count, because splitting mid-clause in regulatory text destroys the meaning of the retrieved passage.',
      'Chunks are embedded and stored in PostgreSQL using the pgvector extension, alongside their structural metadata — source document, section, revision — which is what makes citation possible and what the authorization filter operates on.',
      'A FastAPI backend exposes retrieval and question-answering endpoints. A query is embedded, similarity search runs against the vector index with an authorization predicate applied in the same query, and the surviving passages are assembled into a grounded prompt.',
      'Answers are returned with their source passages attached, so a user can verify the claim against the underlying document instead of trusting the generated text.',
      'SharePoint ingestion is designed but not yet built. The ingestion interface was written with a second source in mind so that adding it does not require reworking the retrieval layer.',
    ],
    diagram: {
      caption:
        'Ingestion and retrieval paths. Authorization is applied during retrieval, not after.',
      stages: [
        { label: 'Sources', nodes: ['FAA documents', 'SharePoint (planned)'] },
        { label: 'Ingest', nodes: ['Parsing', 'Structural chunking', 'Embedding'] },
        { label: 'Store', nodes: ['PostgreSQL', 'pgvector index', 'Chunk metadata'] },
        {
          label: 'Retrieve',
          nodes: ['Similarity search', 'Authorization filter', 'Context assembly'],
        },
        { label: 'Serve', nodes: ['FastAPI', 'Grounded answers', 'Chat interface'] },
      ],
    },
    components: [
      {
        name: 'Ingestion pipeline',
        body: 'Python services for document acquisition, text extraction, structure-aware chunking and embedding generation, written so re-ingesting a revised document replaces rather than duplicates its chunks.',
      },
      {
        name: 'PostgreSQL with pgvector',
        body: 'One database for both vectors and relational metadata. Similarity search and access predicates run in a single query rather than across two systems that can disagree.',
      },
      {
        name: 'Retrieval pipeline',
        body: 'Query embedding, similarity search, authorization filtering and context assembly, with the retrieved passages carried through to the response for citation.',
      },
      {
        name: 'FastAPI backend',
        body: 'Typed request and response models, authentication, and endpoints for both raw retrieval and full question answering so the retrieval layer can be evaluated independently of generation.',
      },
      {
        name: 'Authorization model',
        body: 'Per-user document access boundaries enforced inside the retrieval query, so a document the user cannot open cannot influence an answer they receive.',
      },
    ],
    decisions: [
      {
        title: 'PostgreSQL and pgvector over a dedicated vector database',
        body: 'The corpus size does not justify a separate system, and keeping vectors next to relational metadata means authorization is a WHERE clause instead of a post-filter that has to be trusted.',
      },
      {
        title: 'Authorization inside retrieval',
        body: 'Filtering after retrieval leaks through ranking and through anything the model sees. Applying the predicate during search means unauthorized content never enters the context window.',
      },
      {
        title: 'Structure-aware chunking',
        body: 'Fixed-size chunks were noticeably worse on regulatory text. Following section boundaries produced passages that stand alone and cite cleanly.',
      },
      {
        title: 'Citations as a hard requirement',
        body: 'For regulatory material, an uncited answer is not usable. Every response carries the passages it was built from so the user can check it.',
      },
    ],
    challenges: [
      {
        title: 'Retrieval quality on dense reference text',
        body: 'Heavily cross-referenced documents produce chunks that are individually ambiguous. Carrying section context into the embedded text improved relevance more than any change to the retrieval algorithm.',
      },
      {
        title: 'Keeping access boundaries honest',
        body: 'The tradeoff of enforcing authorization in the search query is that the index and the permission model have to stay consistent. That constraint was accepted deliberately in exchange for a boundary that cannot be bypassed downstream.',
      },
      {
        title: 'Scope discipline',
        body: 'SharePoint ingestion is specified and interface-ready but intentionally not built yet. The application is in active development and is not being presented as a finished production system.',
      },
    ],
    outcome: [
      'Semantic search over FAA material returns relevant passages where keyword search previously did not.',
      'Answers are grounded in retrieved passages and returned with their sources, so claims can be verified against the original document.',
      'Access boundaries are enforced at retrieval time, which is what makes extending the system to additional internal sources a tractable next step.',
    ],
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
      'Embeddings',
      'Retrieval-augmented generation',
      'Docker',
    ],
    links: {},
  },

  {
    slug: 'streaming-behavior-pipeline',
    title: 'Streaming Behavior Data Pipeline',
    kind: 'Batch + streaming platform',
    year: '2025',
    status: 'Public repository',
    teaser:
      'A Netflix-style behavioral analytics platform built to demonstrate batch and streaming patterns in one coherent system.',
    summary:
      'A data platform that models streaming-media viewing behavior end to end: Kafka ingestion, both batch and real-time processing paths, Parquet storage, a Snowflake warehouse modeled with dbt, and FastAPI and Streamlit serving layers — all containerized with Prometheus metrics and automated tests.',
    problem: [
      'Behavioral event data has two consumers with incompatible requirements. Product and content teams want stable daily aggregates they can trust; operations wants to know what is happening right now. Building separately for each duplicates logic and guarantees the two will eventually disagree.',
      'The goal was a single platform that serves both, where the real-time path and the batch path derive from the same events and the same definitions, and where data quality is enforced rather than assumed.',
    ],
    architecture: [
      'Watch-session events are produced into Kafka topics, which decouples producers from every downstream consumer and lets the batch and streaming paths read the same stream independently.',
      'The streaming path consumes continuously for near-real-time metrics. The batch path writes to columnar Parquet and loads into Snowflake, where dbt builds the analytical model.',
      'The warehouse model follows a conventional dimensional shape — a watch-session fact table with user and show dimensions — and mart models for content analytics and user analytics sit on top. Keeping the marts as the only thing dashboards query means a definition changes in one place.',
      'dbt tests cover nulls, uniqueness and referential integrity, with a dedicated data-quality view surfacing duplicates, range violations and anomalies rather than leaving them to be discovered downstream.',
      'FastAPI serves the analytics API and Streamlit provides the dashboards, including separate views for SQL exploration and data-quality monitoring. Prometheus metrics and Docker Compose cover local operation.',
    ],
    diagram: {
      caption:
        'Kafka feeds both a streaming path and a batch path that converge in the warehouse model.',
      stages: [
        { label: 'Ingest', nodes: ['Event producers', 'Kafka topics'] },
        { label: 'Process', nodes: ['Streaming consumer', 'Batch processing', 'Parquet storage'] },
        { label: 'Warehouse', nodes: ['Snowflake', 'dbt facts & dims', 'Analytics marts'] },
        { label: 'Quality', nodes: ['dbt tests', 'Data-quality checks', 'Lineage'] },
        { label: 'Serve', nodes: ['FastAPI', 'Streamlit dashboards', 'Prometheus'] },
      ],
    },
    components: [
      {
        name: 'Kafka ingestion',
        body: 'Event producers and consumers over versioned topics, giving replay and letting new consumers be added without touching the producers.',
      },
      {
        name: 'Batch and streaming processing',
        body: 'Two consumption paths off the same topics: a continuous one for live metrics, and a batch one that writes Parquet for warehouse loading.',
      },
      {
        name: 'Snowflake and dbt model',
        body: 'Watch-session facts with user and show dimensions, plus content-analytics and user-analytics marts that dashboards query exclusively.',
      },
      {
        name: 'Data-quality layer',
        body: 'dbt tests plus a dedicated quality dashboard covering nulls, duplicates, range checks, referential integrity and anomaly detection.',
      },
      {
        name: 'Serving layer',
        body: 'A FastAPI analytics API and Streamlit dashboards spanning main analytics, SQL exploration and data quality.',
      },
      {
        name: 'Operations',
        body: 'Docker Compose for local orchestration, Prometheus metrics for visibility, and automated tests in CI.',
      },
    ],
    decisions: [
      {
        title: 'Kafka as the single entry point',
        body: 'Both processing paths read the same topics, so real-time and batch results derive from identical events. Adding a consumer never means changing a producer.',
      },
      {
        title: 'Parquet between processing and the warehouse',
        body: 'Columnar storage compresses these events heavily and makes reprocessing cheap. A modeling change can be replayed from Parquet without re-reading the stream.',
      },
      {
        title: 'Marts as the only query surface',
        body: 'Dashboards never touch facts directly. A metric definition changes in one model instead of in every dashboard that happens to use it.',
      },
      {
        title: 'Data quality as a first-class surface',
        body: 'Quality checks get their own dashboard rather than living as test output nobody reads. Problems are visible before someone finds them in a business report.',
      },
    ],
    challenges: [
      {
        title: 'Keeping batch and streaming consistent',
        body: 'Two paths over the same events will drift unless the definitions are shared. Pushing all business logic into the dbt layer, with streaming limited to operational metrics, kept a single source of truth at the cost of some real-time richness.',
      },
      {
        title: 'Local reproducibility',
        body: 'Kafka, the warehouse, the API and the dashboards need to run together to be meaningful. Docker Compose and scripted bootstrapping were necessary to make the project usable rather than just readable.',
      },
      {
        title: 'Warehouse portability',
        body: 'Built against Snowflake, but the dbt layer was kept deliberately close to standard SQL so the same model can be pointed at BigQuery, Redshift or Databricks without a rewrite.',
      },
    ],
    outcome: [
      'A single platform serving both near-real-time operational metrics and stable daily analytics from the same event stream.',
      'Data quality is visible as its own dashboard, with dbt tests enforcing nulls, uniqueness and referential integrity on every run.',
      'The whole system runs locally through Docker Compose, which makes the architecture inspectable rather than theoretical.',
    ],
    stack: [
      'Python',
      'Apache Kafka',
      'Parquet',
      'Snowflake',
      'dbt',
      'FastAPI',
      'Streamlit',
      'Docker',
      'Prometheus',
    ],
    links: {
      repo: 'https://github.com/Elangley101/streaming-behavior-pipeline',
    },
  },

  {
    slug: 'logpulse',
    title: 'LogPulse',
    kind: 'Observability & alerting',
    year: '2025',
    status: 'Public repository',
    teaser:
      'A lightweight log analytics platform: ingestion, dbt transformation on DuckDB, rule-based detection and Slack alerting.',
    summary:
      'A cloud-native log analytics and alerting platform that takes authentication events from ingestion through enrichment, applies a rule-based detection layer, surfaces the results in a Streamlit dashboard and pushes findings to Slack. Built as a compact demonstration of monitoring patterns that work equally well for data-quality and pipeline health.',
    problem: [
      'Log analytics platforms are usually either too heavy to stand up quickly or too shallow to be interesting. The useful middle ground — structured ingestion, tested transformations, explicit detection rules and alerting that actually reaches someone — is where most monitoring problems actually live.',
      'The same shape solves data-observability problems. Whether the events are authentication attempts or pipeline run records, the pattern is identical: ingest, model, evaluate rules, alert, and give someone a place to look.',
    ],
    architecture: [
      'Ingestion producers push events into Kafka or Redpanda topics, with a synthetic producer for generating realistic volume during development so the system can be exercised without production data.',
      'Transformation runs as a dbt project against DuckDB. DuckDB keeps the whole stack runnable on a laptop with no infrastructure, while dbt keeps the modeling layer identical to what a warehouse deployment would use.',
      'The detection layer evaluates explicit rules over the modeled tables — brute-force attempts, impossible travel, password spraying — each with configurable windows and thresholds supplied through environment variables rather than hardcoded in the rule.',
      'Detections are written back to DuckDB and surfaced two ways: a Streamlit dashboard for investigation, and Slack webhook alerts for anything that needs immediate attention.',
      'An optional analyst service summarizes recent activity and writes recommendations into the same store, so generated commentary sits alongside the detections it refers to instead of in a separate channel.',
      'Testing, linting and type checking run across the project, and the whole thing bootstraps through a single script on both Unix and Windows.',
    ],
    diagram: {
      caption:
        'Ingestion to alerting, with DuckDB as the store for both modeled events and detections.',
      stages: [
        { label: 'Ingest', nodes: ['Kafka / Redpanda', 'Synthetic producer'] },
        { label: 'Transform', nodes: ['dbt models', 'DuckDB'] },
        { label: 'Detect', nodes: ['Rule engine', 'Configurable windows'] },
        { label: 'Serve', nodes: ['Streamlit dashboard', 'Analyst summaries'] },
        { label: 'Alert', nodes: ['Slack webhook'] },
      ],
    },
    components: [
      {
        name: 'Ingestion module',
        body: 'Kafka and Redpanda producers and consumers, plus a synthetic event generator that can produce tens of thousands of events for load and rule testing.',
      },
      {
        name: 'Transformation layer',
        body: 'A dbt project running on DuckDB, so the modeling layer is version-controlled and tested rather than living in ad hoc queries.',
      },
      {
        name: 'Detection engine',
        body: 'Explicit rules with environment-configurable windows and thresholds, covering brute-force, impossible-travel and password-spray patterns.',
      },
      {
        name: 'Streamlit dashboard',
        body: 'The investigation surface, showing recent alerts, detection detail and analyst recommendations in one place.',
      },
      {
        name: 'Slack alerting',
        body: 'Webhook delivery for detections that need attention, with the integration optional so the platform runs fully without it configured.',
      },
      {
        name: 'Observability and tooling',
        body: 'pytest, ruff and mypy across the project, health checks, lineage, and a bootstrap script that stands the whole pipeline up in one command.',
      },
    ],
    decisions: [
      {
        title: 'DuckDB as the local warehouse',
        body: 'An embedded engine removes all infrastructure from the development loop while keeping the dbt layer portable to a real warehouse later. The tradeoff is single-node scale, which is the right trade for this scope.',
      },
      {
        title: 'Explicit rules before anomaly detection',
        body: 'Rules are auditable and explainable, which matters when someone asks why an alert fired. Statistical detection is the natural next layer, not the starting point.',
      },
      {
        title: 'Thresholds in configuration, not code',
        body: 'Every window and threshold is an environment variable. Tuning sensitivity does not require a code change or a redeploy.',
      },
      {
        title: 'Optional integrations',
        body: 'Slack and the analyst service are both opt-in. The core pipeline runs with no external credentials at all, which keeps first-run friction near zero.',
      },
    ],
    challenges: [
      {
        title: 'Signal versus noise',
        body: 'Detection rules are only useful if people keep reading the alerts. Configurable windows and thresholds exist specifically so sensitivity can be tuned down without disabling a rule outright.',
      },
      {
        title: 'Cross-platform developer experience',
        body: 'Getting an identical bootstrap working on Windows PowerShell and on Unix shells took real effort, but a project that only runs on one platform is a project most people never run.',
      },
      {
        title: 'Scope of the AI assist',
        body: 'The analyst service summarizes and recommends; it does not decide. Keeping it advisory, writing to the same store as the detections, avoided a component that would be hard to trust or audit.',
      },
    ],
    outcome: [
      'A full ingestion-to-alerting pipeline that stands up from a single bootstrap command with no cloud infrastructure required.',
      'Detection logic that is version-controlled, tested and tunable through configuration rather than code edits.',
      'A pattern that transfers directly to data observability — the same ingest, model, evaluate and alert loop applied to pipeline health instead of authentication events.',
    ],
    stack: [
      'Python',
      'dbt',
      'DuckDB',
      'Kafka / Redpanda',
      'Streamlit',
      'Slack API',
      'Docker',
      'pytest',
      'ruff',
      'mypy',
    ],
    links: {
      repo: 'https://github.com/Elangley101/Log_Pulse',
    },
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectSlugs = projects.map((project) => project.slug);
