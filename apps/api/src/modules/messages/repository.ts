import type { MessageUpdate, NewMessage } from '@repo/contracts/messages';
import type { IdArgs } from '@repo/contracts/shared';
import type { MessageSelection, MessagesSelection } from './types.ts';

import { eq } from 'drizzle-orm';

import {
	contains,
	type DatabaseContext,
	DeletionError,
	db,
	InsertionError,
	messages,
	orderBy,
	UpdateError,
} from '#db/index.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewMessage>) => {
	const [data] = await tx.insert(messages).values(values).returning();
	if (data == null) throw new InsertionError('message', values);
	return data;
};

const find = async ({
	conversationId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<MessagesSelection>) =>
	await tx.query.messages.findMany({
		where: { conversationId, content: contains(q) },
		with: { sender: true },
		...orderBy(sort, order),
	});

const findOne = async ({ tx = db, ...values }: DatabaseContext<MessageSelection>) =>
	await tx.query.messages.findFirst({ where: values, with: { sender: true } });

const update = async ({ id, content, tx = db }: DatabaseContext<MessageUpdate>) => {
	const [data] = await tx.update(messages).set({ content }).where(eq(messages.id, id)).returning();
	if (data == null) throw new UpdateError('message', { id, content });
	return data;
};

const destroy = async ({ id, tx = db }: DatabaseContext<IdArgs>) => {
	const [data] = await tx.delete(messages).where(eq(messages.id, id)).returning();
	if (data == null) throw new DeletionError('message', { id });
	return data;
};

export const messageRepository = { create, find, findOne, update, destroy } as const;
