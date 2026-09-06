import type { MemberParameters } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { members } from '#db/index.ts';
import { userRelations } from '#modules/users/helpers.ts';

export const memberRelations = { user: { with: userRelations } } as const;

export const isMember = ({ userId, conversationId }: MemberParameters) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));
