import type { NewConversation } from '@repo/contracts/conversations';

import { eq } from 'drizzle-orm';

import { db, del, insert } from '#db/index.ts';

import { conversations } from './schema.ts';

export const create = async (conversation: NewConversation) =>
	await insert(conversations, conversation);

export const findMany = async () =>
	await db.query.conversations.findMany({ with: { groups: true, messages: true, members: true } });

export const findFirst = async (id: number) =>
	await db.query.conversations.findFirst({
		where: { id },
		with: { groups: true, messages: true, members: true },
	});

export const remove = async (id: number) => await del(conversations, eq(conversations.id, id));
