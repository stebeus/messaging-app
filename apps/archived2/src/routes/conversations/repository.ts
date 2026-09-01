import type { NewConversation } from '@repo/contracts/conversations';

import { eq } from 'drizzle-orm';

import { conversations, db, RepositoryError } from '#db/index.ts';

export const create = async (conversation: NewConversation) => {
	const [data] = await db.insert(conversations).values(conversation).returning();
	if (data == null) throw new RepositoryError('create', 'conversation');
	return data;
};

export const destroy = async (id: number) => {
	const [data] = await db.delete(conversations).where(eq(conversations.id, id)).returning();
	return data;
};
