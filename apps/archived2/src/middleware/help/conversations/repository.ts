import type { Conversation, NewConversation } from '@repo/contracts/conversations';

import { eq } from 'drizzle-orm';

import { conversations, db, RepositoryError } from '#db/index.ts';

export const create = async (conversation: NewConversation) => {
	const [data] = await db.insert(conversations).values(conversation).returning();
	if (data == null) throw new RepositoryError('create', 'conversation');
	return data;
};

export const findMany = async (type: Conversation['type'], userId: number) =>
	await db.query.conversations.findMany({
		where: { type, members: { userId } },
		with: { members: true, messages: true },
	});

export const findFirst = async (id: number, userId: number) =>
	await db.query.conversations.findFirst({
		where: { id, members: { userId } },
		with: { members: true, messages: true },
	});

export const destroy = async (id: number) => {
	const [data] = await db.delete(conversations).where(eq(conversations.id, id)).returning();
	if (data == null) throw new RepositoryError('destroy', 'conversation');
	return data;
};

export const findDms = async (memberId: number) => await findMany('direct', memberId);

export const findDm = async (dmId: number, memberId: number) => await findFirst(dmId, memberId);
