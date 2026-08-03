'use client';

import { useSearchParams } from 'next/navigation';
import { type FormEvent, useCallback, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics';
import {
  type ContactErrors,
  type ContactFieldName,
  type ContactFormValues,
  emptyContactForm,
  hasErrors,
  limits,
  projectTypes,
  timelines,
  validateContact,
} from '@/lib/contact-schema';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; delivered: boolean }
  | { kind: 'error'; message: string };

const fieldOrder: readonly ContactFieldName[] = [
  'name',
  'company',
  'email',
  'projectType',
  'timeline',
  'details',
];

const inputClasses =
  'w-full rounded-lg border bg-[var(--bg)] px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle transition-colors focus-visible:border-[var(--accent)] disabled:opacity-60';

/** Service cards link here with ?type=<projectType> to pre-select the dropdown. */
function readProjectType(param: string | null): string {
  if (!param) return '';
  return projectTypes.some((option) => option.value === param) ? param : '';
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const typeParam = searchParams.get('type');

  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...emptyContactForm,
    projectType: readProjectType(typeParam),
  }));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  // Navigating between service CTAs does not remount the form, so the
  // pre-selection is adjusted during render when the query string changes.
  const [lastTypeParam, setLastTypeParam] = useState(typeParam);
  if (typeParam !== lastTypeParam) {
    setLastTypeParam(typeParam);
    const nextType = readProjectType(typeParam);
    if (nextType) {
      setValues((current) => ({ ...current, projectType: nextType }));
    }
  }

  const fieldId = useCallback((field: string) => `${baseId}-${field}`, [baseId]);
  const errorId = useCallback((field: string) => `${baseId}-${field}-error`, [baseId]);

  // The confirmation replaces a much taller form, so without this the page is
  // left scrolled past it and keyboard focus falls back to the document.
  const focusConfirmation = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
    node.focus({ preventScroll: true });
  }, []);

  const update = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value };
      // Re-validate a field only once it has been blurred, so the form does not
      // shout at someone who is still typing their email address.
      if (field !== 'website' && touched[field as ContactFieldName]) {
        setErrors(validateContact(next));
      }
      return next;
    });
  };

  const blur = (field: ContactFieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      company: true,
      email: true,
      projectType: true,
      timeline: true,
      details: true,
    });

    if (hasErrors(nextErrors)) {
      const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)
          ?.focus();
      }
      return;
    }

    setStatus({ kind: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        delivered?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        setStatus({
          kind: 'error',
          message:
            payload?.message ??
            'Something went wrong sending that. Please try again, or email me directly.',
        });
        return;
      }

      trackEvent('contact_form_submitted', { projectType: values.projectType });
      setStatus({ kind: 'success', delivered: payload.delivered !== false });
      setValues(emptyContactForm);
      setTouched({});
      setErrors({});
    } catch {
      setStatus({
        kind: 'error',
        message: 'Could not reach the server. Please check your connection, or email me directly.',
      });
    }
  };

  if (status.kind === 'success') {
    return (
      <div
        ref={focusConfirmation}
        role="status"
        tabIndex={-1}
        className="bg-surface scroll-mt-28 rounded-xl border border-[var(--accent)] p-7 focus:outline-none sm:p-8"
      >
        <span
          aria-hidden="true"
          className="text-accent mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-soft)]"
        >
          <Icon name="check" size={22} />
        </span>
        <h3 className="text-fg text-xl font-semibold">Thanks — that came through.</h3>
        <p className="text-fg-muted mt-3 leading-relaxed">
          I read every enquiry personally and usually reply within one business day. If it looks
          like a fit, the next step is a 20-minute call.
        </p>
        {!status.delivered ? (
          <p className="text-fg-muted mt-4 rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] p-4 text-[0.875rem] leading-relaxed">
            Email delivery is not fully configured on this site yet, so your message was recorded
            but may not have reached my inbox. To be certain it does, please also send a note to{' '}
            <a
              href={`mailto:${site.email}`}
              className="text-accent font-medium underline underline-offset-2"
            >
              {site.email}
            </a>
            .
          </p>
        ) : null}
        <Button
          variant="secondary"
          size="md"
          className="mt-6"
          onClick={() => setStatus({ kind: 'idle' })}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="bg-surface relative rounded-xl border border-[var(--border)] p-6 sm:p-8"
    >
      <fieldset disabled={submitting} className="space-y-5">
        <legend className="sr-only">Project enquiry</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Your name"
            id={fieldId('name')}
            error={touched.name ? errors.name : undefined}
            errorId={errorId('name')}
          >
            <input
              id={fieldId('name')}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={limits.name.max}
              value={values.name}
              onChange={(event) => update('name', event.target.value)}
              onBlur={() => blur('name')}
              aria-invalid={touched.name && Boolean(errors.name)}
              aria-describedby={touched.name && errors.name ? errorId('name') : undefined}
              className={cn(
                inputClasses,
                touched.name && errors.name
                  ? 'border-red-600 dark:border-red-400'
                  : 'border-[var(--border-strong)]',
              )}
            />
          </Field>

          <Field
            label="Company or team"
            id={fieldId('company')}
            error={touched.company ? errors.company : undefined}
            errorId={errorId('company')}
          >
            <input
              id={fieldId('company')}
              name="company"
              type="text"
              autoComplete="organization"
              required
              maxLength={limits.company.max}
              value={values.company}
              onChange={(event) => update('company', event.target.value)}
              onBlur={() => blur('company')}
              aria-invalid={touched.company && Boolean(errors.company)}
              aria-describedby={touched.company && errors.company ? errorId('company') : undefined}
              className={cn(
                inputClasses,
                touched.company && errors.company
                  ? 'border-red-600 dark:border-red-400'
                  : 'border-[var(--border-strong)]',
              )}
            />
          </Field>
        </div>

        <Field
          label="Work email"
          id={fieldId('email')}
          error={touched.email ? errors.email : undefined}
          errorId={errorId('email')}
        >
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={limits.email.max}
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            onBlur={() => blur('email')}
            aria-invalid={touched.email && Boolean(errors.email)}
            aria-describedby={touched.email && errors.email ? errorId('email') : undefined}
            className={cn(
              inputClasses,
              touched.email && errors.email
                ? 'border-red-600 dark:border-red-400'
                : 'border-[var(--border-strong)]',
            )}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Project type"
            id={fieldId('projectType')}
            error={touched.projectType ? errors.projectType : undefined}
            errorId={errorId('projectType')}
          >
            <select
              id={fieldId('projectType')}
              name="projectType"
              required
              value={values.projectType}
              onChange={(event) => update('projectType', event.target.value)}
              onBlur={() => blur('projectType')}
              aria-invalid={touched.projectType && Boolean(errors.projectType)}
              aria-describedby={
                touched.projectType && errors.projectType ? errorId('projectType') : undefined
              }
              className={cn(
                inputClasses,
                'appearance-none bg-[image:var(--select-arrow)] bg-[length:14px] bg-[position:right_0.9rem_center] bg-no-repeat pr-10',
                touched.projectType && errors.projectType
                  ? 'border-red-600 dark:border-red-400'
                  : 'border-[var(--border-strong)]',
              )}
            >
              <option value="">Select one…</option>
              {projectTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Approximate timeline"
            id={fieldId('timeline')}
            error={touched.timeline ? errors.timeline : undefined}
            errorId={errorId('timeline')}
          >
            <select
              id={fieldId('timeline')}
              name="timeline"
              required
              value={values.timeline}
              onChange={(event) => update('timeline', event.target.value)}
              onBlur={() => blur('timeline')}
              aria-invalid={touched.timeline && Boolean(errors.timeline)}
              aria-describedby={
                touched.timeline && errors.timeline ? errorId('timeline') : undefined
              }
              className={cn(
                inputClasses,
                'appearance-none bg-[image:var(--select-arrow)] bg-[length:14px] bg-[position:right_0.9rem_center] bg-no-repeat pr-10',
                touched.timeline && errors.timeline
                  ? 'border-red-600 dark:border-red-400'
                  : 'border-[var(--border-strong)]',
              )}
            >
              <option value="">Select one…</option>
              {timelines.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Project details"
          id={fieldId('details')}
          hint="What is happening now, what you have tried, and what a good outcome looks like."
          hintId={`${baseId}-details-hint`}
          error={touched.details ? errors.details : undefined}
          errorId={errorId('details')}
        >
          <textarea
            id={fieldId('details')}
            name="details"
            required
            rows={6}
            minLength={limits.details.min}
            maxLength={limits.details.max}
            value={values.details}
            onChange={(event) => update('details', event.target.value)}
            onBlur={() => blur('details')}
            aria-invalid={touched.details && Boolean(errors.details)}
            aria-describedby={cn(
              `${baseId}-details-hint`,
              touched.details && errors.details ? errorId('details') : '',
            ).trim()}
            className={cn(
              inputClasses,
              'resize-y',
              touched.details && errors.details
                ? 'border-red-600 dark:border-red-400'
                : 'border-[var(--border-strong)]',
            )}
          />
        </Field>

        {/* Honeypot. Hidden from users and from assistive technology. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
        >
          <label htmlFor={fieldId('website')}>Website (leave this field empty)</label>
          <input
            id={fieldId('website')}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </div>
      </fieldset>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send enquiry'}
          {!submitting ? <Icon name="arrowRight" size={17} /> : null}
        </Button>
        <p className="text-fg-subtle text-[0.8125rem]">
          Or email{' '}
          <a
            href={`mailto:${site.email}`}
            className="hover:text-fg underline underline-offset-2 transition-colors"
          >
            {site.email}
          </a>
        </p>
      </div>

      <div aria-live="polite" className="empty:hidden">
        {status.kind === 'error' ? (
          <p className="mt-5 rounded-lg border border-red-600/40 bg-red-600/10 p-4 text-[0.9375rem] text-red-600 dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-400">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  id: string;
  error?: string | undefined;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
};

function Field({ label, id, error, errorId, hint, hintId, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-fg mb-2 block text-[0.875rem] font-medium">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-fg-subtle mb-2 text-[0.8125rem]">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} className="mt-2 text-[0.8125rem] text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
