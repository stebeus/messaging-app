import type { MessageUpdate, NewMessage } from '@repo/contracts/messages';
import type { Query } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { contains, db, messages, orderBy, RepositoryError } from '#db/index.ts';

export const create = async (message: NewMessage) => {
	const [data] = await db.insert(messages).values(message).returning();
	if (data == null) throw new RepositoryError('create', 'message');
	return data;
};

export const findMany = async ({ q, sort, order }: Query = {}) =>
	await db.query.messages.findMany({
		where: { content: contains(q) },
		with: { sender: true },
		...orderBy(sort, order),
	});

export const findFirst = async (id: number) =>
	await db.query.messages.findFirst({ where: { id }, with: { sender: true } });

export const update = async ({ content, id }: MessageUpdate) => {
	const [data] = await db.update(messages).set({ content }).where(eq(messages.id, id)).returning();
	return data;
};

export const destroy = async (id: number) => {
	const [data] = await db.delete(messages).where(eq(messages.id, id)).returning();
	return data;
};
