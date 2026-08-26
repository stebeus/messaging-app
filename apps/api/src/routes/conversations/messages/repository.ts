import type { MessageUpdate, NewMessage } from '@repo/contracts/conversations/messages';

import { eq } from 'drizzle-orm';

import { db, del, insert, update } from '#db/index.ts';

import { messages } from './schema.ts';

export const create = async (message: NewMessage) => await insert(messages, message);

export const findMany = async () => await db.query.messages.findMany();

export const findFirst = async (id: number) => await db.query.messages.findFirst({ where: { id } });

export const modify = async (message: MessageUpdate) =>
	await update(messages, message, eq(messages.id, message.id));

export const remove = async (id: number) => await del(messages, eq(messages.id, id));
