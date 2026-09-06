import type { Member } from '@repo/contracts/members';
import type { MemberParameters } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { members } from '#db/index.ts';
import { userRelations } from '#modules/users/helpers.ts';

export const memberRelations = { user: { with: userRelations } } as const;

export const canManage = (actor: Member, target: Member) =>
	actor.role !== 'member' && target.role === 'member';

export const isMember = ({ userId, conversationId }: MemberParameters) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));
