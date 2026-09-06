import { contains } from '#db/helpers.ts';

export const userRelations = { friendships: true, groups: true } as const;

export const containsDisplayName = (displayName?: string) =>
	({ displayName: contains(displayName) }) as const;
