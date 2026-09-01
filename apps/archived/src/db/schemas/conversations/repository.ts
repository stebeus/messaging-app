import type { Conversation, NewConversation } from '@repo/contracts/conversations';

import { eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { conversations } from './schema.ts';

export const create = async (conversation: NewConversation) =>
	await db.insert(conversations).values(conversation).returning();

export const findMany = async (conversation: Conversation) =>
	await db.query.conversations.findMany({
		where: conversation,
		with: { members: true, messages: true },
	});

export const remove = async (id: number) =>
	await db.delete(conversations).where(eq(conversations.id, id)).returning();
