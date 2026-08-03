import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { type Project } from '@/content/projects';

/**
 * Only renders links that are actually configured. Projects without a public
 * repository or demo show nothing rather than a dead link.
 */
export function ProjectLinks({
  links,
  title,
  size = 'md',
}: {
  links: Project['links'];
  title: string;
  size?: 'md' | 'lg';
}) {
  if (!links.repo && !links.demo) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.repo ? (
        <ButtonLink href={links.repo} variant="secondary" size={size}>
          <Icon name="github" size={16} />
          View source
          <span className="sr-only"> for {title} on GitHub</span>
        </ButtonLink>
      ) : null}
      {links.demo ? (
        <ButtonLink href={links.demo} variant="secondary" size={size}>
          <Icon name="arrowUpRight" size={16} />
          Live demo
          <span className="sr-only"> of {title}</span>
        </ButtonLink>
      ) : null}
    </div>
  );
}
