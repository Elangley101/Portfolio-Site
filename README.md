# ethanlangley.dev

Consulting site for **Ethan Langley** — fractional data engineering and data platform
consulting for startups and growing companies.

The primary conversion action is booking a 20-minute discovery call; the secondary
action is email.

## Stack

| Concern   | Choice                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19, Turbopack)      |
| Language  | TypeScript, strict                                |
| Styling   | Tailwind CSS v4 with semantic CSS-variable tokens |
| Fonts     | Inter and JetBrains Mono via `next/font`          |
| Email     | Resend REST API (optional)                        |
| Analytics | Vercel Analytics and/or Plausible (both optional) |
| Hosting   | Vercel                                            |

There are no UI, icon, animation or validation libraries. Icons, motion, form
validation and rate limiting are all local, which keeps the client bundle small.

## Running locally

```bash
npm install
cp .env.example .env.local   # optional; everything works without it
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier write
npm run verify       # format:check + lint + typecheck + build
```

## Environment variables

Every variable is optional — the site builds and runs with none of them set.
See `.env.example` for the annotated list.

| Variable                       | Purpose                                                                 |
| ------------------------------ | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Absolute origin for canonical URLs, Open Graph, sitemap and robots      |
| `NEXT_PUBLIC_SCHEDULING_URL`   | Booking link. When unset, discovery-call CTAs route to the contact form |
| `RESEND_API_KEY`               | Enables contact-form email delivery                                     |
| `CONTACT_FROM_EMAIL`           | Sender address on a domain verified in Resend                           |
| `CONTACT_TO_EMAIL`             | Recipient; defaults to the address in `src/content/site.ts`             |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true` turns on Vercel Analytics                                        |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Site domain registered in Plausible                                     |

## Editing content

All copy lives in `src/content/` so it can be changed without touching components:

| File          | Contents                                                      |
| ------------- | ------------------------------------------------------------- |
| `site.ts`     | Name, email, location, socials, navigation, SEO copy, resume  |
| `metrics.ts`  | Headline and supporting numbers                               |
| `problems.ts` | The "why teams call" section                                  |
| `services.ts` | The seven services and the three engagement models            |
| `results.ts`  | Case-study results                                            |
| `projects.ts` | Long-form project case studies, including architecture stages |
| `process.ts`  | Engagement stages and working principles                      |
| `about.ts`    | Biography, facts and fit criteria                             |

## Contact form

`POST /api/contact` handles submissions. It applies, in order: a per-IP burst limit
(30 requests per 10 minutes), a body-size cap, JSON parsing, type coercion, a honeypot
check, the same validation rules the browser uses (`src/lib/contact-schema.ts`), and
finally a per-IP send budget (5 per 10 minutes). Only submissions that pass validation
consume the send budget, so correcting a mistake never locks anyone out.

Delivery degrades gracefully. Without `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` the
submission is still accepted and logged server-side, and the visitor is shown a
success message that also asks them to email directly — so a lead is never silently
lost to a missing credential.

The rate limiter is in-memory and therefore per serverless instance. If the endpoint
ever needs a hard guarantee, swap `src/lib/rate-limit.ts` for a shared store such as
Vercel KV or Upstash.

## Resume

The download button renders only when `public/resume/Ethan-Langley-Resume.pdf`
exists. See `public/resume/README.md`.

## Deploying

The project is a standard Next.js app on Vercel.

1. Push to `main`.
2. In the Vercel project, confirm the framework preset is **Next.js** (`vercel.json`
   already sets it) and that the Node version is 20 or newer.
3. Add the environment variables you want from the table above.
4. Deploy.

`vercel.json` keeps `X-Robots-Tag: all` and a cache policy for the resume;
`next.config.ts` owns the security headers and the redirects from the previous
site's routes (`/project` → `/projects`, `/resume` → `/about`).
