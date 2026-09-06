import { contains } from '#db/helpers.ts';

export const containsDisplayName = (displayName: string) =>
	({ displayName: contains(displayName) }) as const;
