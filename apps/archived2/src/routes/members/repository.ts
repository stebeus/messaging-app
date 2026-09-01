import type { MemberDeletion, MemberUpdate, NewMember } from '@repo/contracts/members';

import { and, eq } from 'drizzle-orm';

import { db, members, RepositoryError } from '#db/index.ts';

export const create = async (member: NewMember) => {
	const [data] = await db.insert(members).values(member).returning();
	if (data == null) throw new RepositoryError('create', 'member');
	return data;
};

export const findFirst = async (userId: number, conversationId: number) =>
	await db.query.members.findFirst({ where: { userId, conversationId }, with: { user: true } });

const isMember = (userId: number, conversationId: number) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));

export const update = async ({ role, userId, conversationId }: MemberUpdate) => {
	const [data] = await db
		.update(members)
		.set({ role })
		.where(isMember(userId, conversationId))
		.returning();

	return data;
};

export const destroy = async ({ userId, conversationId }: MemberDeletion) => {
	const [data] = await db.delete(members).where(isMember(userId, conversationId)).returning();
	return data;
};
