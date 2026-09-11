import type { Hierarchy, MemberArgs } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { type Member, type Role, type Roles, roles } from '@repo/contracts/members';

import { members } from '#db/index.ts';
import { userRelations } from '#modules/users/helpers.ts';

const createHierarchy = (roles: Roles) => {
	const createLevel = (role: Role, level: number) => [role, level];
	return Object.fromEntries(roles.map(createLevel)) as Hierarchy;
};

export const memberRelations = { user: { with: userRelations } } as const;

export const canManage = (actor: Member) => actor.role !== 'member';

export const canManageMember = (actor: Member, target: Member) => {
	const hierarchy = createHierarchy(roles);
	return hierarchy[actor.role] > hierarchy[target.role];
};

export const isMember = ({ userId, conversationId }: MemberArgs) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));
