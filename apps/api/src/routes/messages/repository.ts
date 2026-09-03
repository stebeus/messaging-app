import type { Message, MessageUpdate, NewMessage } from '@repo/contracts/messages';
import type { Id } from '@repo/contracts/shared';
import type { QueryParameters } from '#types.ts';

import { eq } from 'drizzle-orm';

import { CreationError, contains, type DatabaseContext, db, messages, orderBy } from '#db/index.ts';

type FindMessagesParameters = Pick<Message, 'conversationId'> & QueryParameters;

export const create = async ({ client = db, ...message }: DatabaseContext<NewMessage>) => {
	const [data] = await client.insert(messages).values(message).returning();
	if (data == null) throw new CreationError('message');
	return data;
};

export const find = async ({
	conversationId,
	query: { q, sort, order },
	client = db,
}: DatabaseContext<FindMessagesParameters>) =>
	await client.query.messages.findMany({
		where: { conversationId, content: contains(q) },
		with: { sender: true },
		...orderBy(sort, order),
	});

export const findOne = async ({ id, client = db }: DatabaseContext<Id>) =>
	await client.query.messages.findFirst({ where: { id }, with: { sender: true } });

export const update = async ({ id, content, client = db }: DatabaseContext<MessageUpdate>) => {
	const [data] = await client
		.update(messages)
		.set({ content })
		.where(eq(messages.id, id))
		.returning();

	return data;
};

export const destroy = async ({ id, client = db }: DatabaseContext<Id>) => {
	const [data] = await client.delete(messages).where(eq(messages.id, id)).returning();
	return data;
};
