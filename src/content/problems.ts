export type Problem = {
  title: string;
  body: string;
};

export const problemsIntro = {
  eyebrow: 'Why teams call',
  heading: 'The symptoms are usually familiar',
  body: 'Most of the work I take on starts with one of these. None of them are unusual, and none of them require a permanent hire to fix.',
} as const;

export const problems: readonly Problem[] = [
  {
    title: 'Pipelines fail quietly',
    body: 'A job stops halfway, nobody is paged, and the first person to notice is an executive looking at a dashboard that is two days stale.',
  },
  {
    title: 'Warehouse costs keep climbing',
    body: 'The monthly bill grows faster than usage does. Nobody can point to which workloads are responsible or which warehouses are oversized.',
  },
  {
    title: 'Analysts do not trust the numbers',
    body: 'Two reports disagree, so every figure gets manually re-checked. Confidence erodes and decisions slow down.',
  },
  {
    title: 'Vendor feeds need babysitting',
    body: 'Each new API or SFTP partner turns into a recurring manual chore, and a schema change upstream quietly breaks something downstream.',
  },
  {
    title: 'No senior owner for the platform',
    body: 'Analysts and application engineers are covering data infrastructure between other priorities. Nobody owns architecture, cost or reliability.',
  },
  {
    title: 'AI plans are blocked by the data',
    body: 'The model is not the hard part. Fragmented sources, missing access controls and unreliable refreshes are what stall the initiative.',
  },
] as const;
