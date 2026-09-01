import type { GroupUpdate, NewGroup } from '@repo/contracts/conversations/groups';
import type { Query } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { groups } from './schema.ts';

export const create = async (group: NewGroup) => await db.insert(groups).values(group).returning();

export const findMany = async ({ q, sort = 'createdAt', order = 'asc' }: Query = {}) =>
	await db.query.groups.findMany({
		where: { name: { like: `%${q}%` } },
		orderBy: { [sort]: order },
	});

export const findFirst = async (id: number) =>
	await db.query.groups.findFirst({ where: { conversationId: id } });

export const update = async ({ conversationId, ...group }: GroupUpdate) =>
	await db.update(groups).set(group).where(eq(groups.conversationId, conversationId)).returning();

export const remove = async (id: number) =>
	await db.delete(groups).where(eq(groups.conversationId, id)).returning();
