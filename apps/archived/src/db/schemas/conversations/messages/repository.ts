import type { MessageUpdate, NewMessage } from '@repo/contracts/conversations/messages';
import type { Query } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { messages } from './schema.ts';

export const create = async (message: NewMessage) =>
	await db.insert(messages).values(message).returning();

export const findMany = async ({ q, sort = 'createdAt', order = 'asc' }: Query = {}) =>
	await db.query.messages.findMany({
		where: { content: { like: `%${q}%` } },
		orderBy: { [sort]: order },
	});

export const update = async ({ content, id }: MessageUpdate) =>
	await db.update(messages).set({ content }).where(eq(messages.id, id)).returning();

export const remove = async (id: number) =>
	await db.delete(messages).where(eq(messages.id, id)).returning();
