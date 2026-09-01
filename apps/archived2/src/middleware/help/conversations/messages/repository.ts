import type { MessageUpdate, NewMessage } from '@repo/contracts/conversations/messages';
import type { Query } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { db, messages, RepositoryError } from '#db/index.ts';

export const create = async (message: NewMessage) => {
	const [data] = await db.insert(messages).values(message).returning();
	if (data == null) throw new RepositoryError('create', 'message');
	return data;
};

export const findMany = async ({ q, sort = 'createdAt', order = 'asc' }: Query = {}) =>
	await db.query.messages.findMany({
		where: { content: { like: `%${q}%` } },
		orderBy: { [sort]: order },
	});

export const update = async ({ content, id }: MessageUpdate) => {
	const [data] = await db.update(messages).set({ content }).where(eq(messages.id, id)).returning();
	if (data == null) throw new RepositoryError('update', 'message');
	return data;
};

export const destroy = async (id: number) => {
	const [data] = await db.delete(messages).where(eq(messages.id, id)).returning();
	if (data == null) throw new RepositoryError('destroy', 'message');
	return data;
};
