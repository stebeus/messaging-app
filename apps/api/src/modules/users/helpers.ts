import { contains } from '#db/helpers.ts';

export const userRelations = { groups: true, memberships: true } as const;

export const containsDisplayName = (displayName?: string) =>
	({ displayName: contains(displayName) }) as const;
