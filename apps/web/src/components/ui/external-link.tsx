import type { ComponentPropsWithoutRef } from 'react';

type ExternalLinkProps = ComponentPropsWithoutRef<'a'>;

export const ExternalLink = (props: ExternalLinkProps) => (
	<a {...props} target="_blank" rel="noopener noreferrer" />
);
