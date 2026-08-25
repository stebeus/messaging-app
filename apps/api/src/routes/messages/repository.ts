import { eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { type MessageUpdate, messages, type NewMessage } from './schema.ts';

export const create = async (message: NewMessage) => {
	const [data] = await db.insert(messages).values(message).onConflictDoNothing().returning();
	return data;
};

export const findMany = async () => await db.query.messages.findMany();

export const findFirst = async (id: number) => await db.query.messages.findFirst({ where: { id } });

export const update = async (message: MessageUpdate) => {
	const [data] = await db
		.update(messages)
		.set(message)
		.where(eq(messages.id, message.id))
		.returning();

	return data;
};

export const remove = async (id: number) => {
	const [data] = await db.delete(messages).where(eq(messages.id, id)).returning();
	return data;
};
