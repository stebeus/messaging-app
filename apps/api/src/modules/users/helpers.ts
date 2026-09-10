import type { Id } from '@repo/contracts/shared';

import { contains } from '#db/helpers.ts';

export const userRelations = { groups: true, memberships: true } as const;

export const containsDisplayName = (displayName?: string) =>
	({ displayName: contains(displayName) }) as const;

export const createUserFilter = (id: Id, displayName?: string) =>
	({ where: { ...containsDisplayName(displayName), NOT: { id } } }) as const;
