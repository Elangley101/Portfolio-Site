# Résumé

The public résumé button on the site is driven by the presence of a single file:

```
public/resume/Ethan-Langley-Resume.pdf
```

## Current state

The file is present, so the "Download résumé" button is visible in the site footer
and on the About page.

## Updating it

Replace `Ethan-Langley-Resume.pdf` with the new version, keeping the exact same
filename. No code change is needed.

## Removing it

Delete `Ethan-Langley-Resume.pdf`. The button disappears automatically on the
next build — `src/lib/resume.ts` checks for the file on the server and hides the
link when it is missing, so there will never be a broken download.

## Changing the filename

If you want a different filename, update `site.resume.path` in
`src/content/site.ts` to match. The path is relative to `public/`, e.g.
`/resume/your-file.pdf`.
