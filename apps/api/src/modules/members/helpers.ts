import type { Member } from '@repo/contracts/members';
import type { MemberParameters, RoleHierarchy } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { members } from '#db/index.ts';
import { userRelations } from '#modules/users/helpers.ts';

export const memberRelations = { user: { with: userRelations } } as const;

export const canManage = (actor: Member, target: Member) => {
	const hierarchy = { member: 0, admin: 1, owner: 2 } as const satisfies RoleHierarchy;
	return hierarchy[actor.role] > hierarchy[target.role];
};

export const isMember = ({ userId, conversationId }: MemberParameters) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));
