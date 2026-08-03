/**
 * Validation shared by the browser form and the API route, so the two can
 * never disagree about what a valid submission looks like.
 */

export const projectTypes = [
  { value: 'assessment', label: 'Data platform assessment' },
  { value: 'snowflake', label: 'Snowflake optimization' },
  { value: 'reliability', label: 'Pipeline reliability' },
  { value: 'dbt', label: 'dbt modernization' },
  { value: 'integrations', label: 'API or vendor integration' },
  { value: 'ai-rag', label: 'Internal AI/RAG prototype' },
  { value: 'fractional', label: 'Fractional engineering' },
  { value: 'other', label: 'Other' },
] as const;

export type ProjectTypeValue = (typeof projectTypes)[number]['value'];

export const timelines = [
  { value: 'immediate', label: 'As soon as possible' },
  { value: '1-month', label: 'Within a month' },
  { value: '1-3-months', label: 'One to three months' },
  { value: 'exploring', label: 'Exploring options' },
] as const;

export type TimelineValue = (typeof timelines)[number]['value'];

export type ContactFormValues = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  timeline: string;
  details: string;
  /** Honeypot. Real users never fill this in. */
  website: string;
};

export type ContactFieldName = keyof Omit<ContactFormValues, 'website'>;

export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export const emptyContactForm: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  projectType: '',
  timeline: '',
  details: '',
  website: '',
};

export const limits = {
  name: { min: 2, max: 100 },
  company: { min: 1, max: 120 },
  email: { max: 254 },
  details: { min: 30, max: 4000 },
} as const;

// Deliberately permissive: rejects the obviously malformed without excluding
// valid but unusual addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

function isProjectType(value: string): value is ProjectTypeValue {
  return projectTypes.some((option) => option.value === value);
}

function isTimeline(value: string): value is TimelineValue {
  return timelines.some((option) => option.value === value);
}

export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const company = values.company.trim();
  const email = values.email.trim();
  const details = values.details.trim();

  if (name.length < limits.name.min) {
    errors.name = 'Please enter your name.';
  } else if (name.length > limits.name.max) {
    errors.name = `Please keep this under ${limits.name.max} characters.`;
  }

  if (company.length < limits.company.min) {
    errors.company = 'Please enter your company or team name.';
  } else if (company.length > limits.company.max) {
    errors.company = `Please keep this under ${limits.company.max} characters.`;
  }

  if (email.length === 0) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > limits.email.max || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!isProjectType(values.projectType)) {
    errors.projectType = 'Please choose the closest project type.';
  }

  if (!isTimeline(values.timeline)) {
    errors.timeline = 'Please choose an approximate timeline.';
  }

  if (details.length < limits.details.min) {
    errors.details = `Please add a little more detail — at least ${limits.details.min} characters.`;
  } else if (details.length > limits.details.max) {
    errors.details = `Please keep this under ${limits.details.max} characters.`;
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function labelForProjectType(value: string): string {
  return projectTypes.find((option) => option.value === value)?.label ?? value;
}

export function labelForTimeline(value: string): string {
  return timelines.find((option) => option.value === value)?.label ?? value;
}

/** Narrows unknown JSON from the request body into the form shape. */
export function coerceContactPayload(input: unknown): ContactFormValues | null {
  if (typeof input !== 'object' || input === null) return null;
  const record = input as Record<string, unknown>;

  const read = (key: keyof ContactFormValues): string | null => {
    const value = record[key];
    if (value === undefined || value === null) return '';
    return typeof value === 'string' ? value : null;
  };

  const name = read('name');
  const company = read('company');
  const email = read('email');
  const projectType = read('projectType');
  const timeline = read('timeline');
  const details = read('details');
  const website = read('website');

  if (
    name === null ||
    company === null ||
    email === null ||
    projectType === null ||
    timeline === null ||
    details === null ||
    website === null
  ) {
    return null;
  }

  return { name, company, email, projectType, timeline, details, website };
}
