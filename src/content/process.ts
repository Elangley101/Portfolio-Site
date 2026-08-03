export type ProcessStep = {
  step: string;
  title: string;
  body: string;
  outputs: readonly string[];
};

export const processIntro = {
  eyebrow: 'Process',
  heading: 'How an engagement actually runs',
  body: 'Four stages, low meeting overhead, and everything important written down. You should always be able to tell what is done, what is next and why.',
} as const;

export const processSteps: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    body: 'A 20-minute call to understand the business problem, the current architecture, the constraints you are working within and the outcome you actually need. If I am not the right fit, I will say so on this call.',
    outputs: ['Problem statement', 'Constraints and dependencies', 'Definition of a good outcome'],
  },
  {
    step: '02',
    title: 'Technical Assessment',
    body: 'A structured review of the systems involved: data flows, failure modes, cost drivers and implementation risk. This is where scope stops being a guess and becomes a plan with sequencing behind it.',
    outputs: [
      'Findings with severity and effort',
      'Prioritized scope',
      'Milestones and acceptance criteria',
    ],
  },
  {
    step: '03',
    title: 'Delivery',
    body: 'Execution against documented milestones, with a written update each week covering what shipped, what is next and anything that changed. Meetings happen when a decision needs one, not on a standing schedule.',
    outputs: [
      'Working systems in your environment',
      'Tests and monitoring',
      'Weekly written updates',
    ],
  },
  {
    step: '04',
    title: 'Handoff',
    body: 'Documentation, operational guidance and a prioritized list of what I would do next. The goal is that your team can run and extend the work without me, whether or not the engagement continues.',
    outputs: [
      'Runbooks and architecture notes',
      'Walkthrough session',
      'Prioritized next-step plan',
    ],
  },
] as const;

export const workingPrinciples: readonly { title: string; body: string }[] = [
  {
    title: 'Written by default',
    body: 'Decisions, tradeoffs and status go in writing where they can be searched later. Meetings are reserved for the things that genuinely need discussion.',
  },
  {
    title: 'Scoped before started',
    body: 'Work begins from an agreed scope with acceptance criteria. If scope needs to change, that is a conversation rather than a surprise on an invoice.',
  },
  {
    title: 'Built to be handed over',
    body: 'Everything is written so that your team can operate it. No hidden dependencies on me, and no undocumented shortcuts.',
  },
  {
    title: 'Honest about tradeoffs',
    body: 'Where a cheaper or simpler option is good enough, I will tell you. Where a shortcut will cost more later, I will tell you that too.',
  },
] as const;
