import type { BanParameters } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { bans } from '#db/index.ts';

export const banRelations = { user: true, group: true } as const;

export const isBan = ({ userId, groupId }: BanParameters) =>
	and(eq(bans.userId, userId), eq(bans.groupId, groupId));
