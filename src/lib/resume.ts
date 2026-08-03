import { existsSync } from 'node:fs';
import path from 'node:path';
import { site } from '@/content/site';

/**
 * The resume button only renders when a real file is present in /public.
 * Evaluated on the server at render time, so removing the PDF hides the
 * button without a code change. See public/resume/README.md.
 */
export function resumeIsAvailable(): boolean {
  try {
    const filePath = path.join(process.cwd(), 'public', site.resume.path.replace(/^\//, ''));
    return existsSync(filePath);
  } catch {
    return false;
  }
}
