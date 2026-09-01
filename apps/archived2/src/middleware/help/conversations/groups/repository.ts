import type { GroupUpdate, NewGroup } from '@repo/contracts/conversations/groups';
import type { Query } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { db, groups, RepositoryError } from '#db/index.ts';

export const create = async (group: NewGroup) => {
	const [data] = await db.insert(groups).values(group).returning();
	if (data == null) throw new RepositoryError('create', 'group');
	return data;
};

export const findMany = async ({ q, sort = 'createdAt', order = 'asc' }: Query = {}) =>
	await db.query.groups.findMany({
		where: { name: { like: `%${q}%` } },
		with: { conversations: { with: { members: true, messages: true } } },
		orderBy: { [sort]: order },
	});

export const findFirst = async (id: number) =>
	await db.query.groups.findFirst({
		where: { conversationId: id },
		with: { conversations: { with: { members: true, messages: true } } },
	});

export const update = async ({ conversationId, ...rest }: GroupUpdate) => {
	const [data] = await db
		.update(groups)
		.set(rest)
		.where(eq(groups.conversationId, conversationId))
		.returning();

	if (data == null) throw new RepositoryError('update', 'group');

	return data;
};

export const destroy = async (id: number) => {
	const [data] = await db.delete(groups).where(eq(groups.conversationId, id)).returning();
	if (data == null) throw new RepositoryError('destroy', 'group');
	return data;
};
