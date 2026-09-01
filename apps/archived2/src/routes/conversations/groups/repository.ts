import type { GroupUpdate, NewGroup } from '@repo/contracts/groups';
import type { Query } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { contains, db, groups, orderBy, RepositoryError } from '#db/index.ts';

import { groupRelations, groupSearchRelations, memberOfGroup } from './helpers.ts';

export const create = async (group: NewGroup) => {
	const [data] = await db.insert(groups).values(group).returning();
	if (data == null) throw new RepositoryError('create', 'group');
	return data;
};

export const findMany = async ({ q, sort, order }: Query = {}) =>
	await db.query.groups.findMany({
		where: { name: contains(q) },
		with: groupSearchRelations,
		...orderBy(sort, order),
	});

export const findFirst = async (id: number) =>
	await db.query.groups.findFirst({ where: { conversationId: id }, with: groupRelations });

export const findJoined = async (userId: string) =>
	await db.query.groups.findMany({ where: memberOfGroup(userId), with: groupRelations });

export const findFirstJoined = async (id: number, userId: string) =>
	await db.query.groups.findFirst({
		where: { ...memberOfGroup(userId), conversationId: id },
		with: groupRelations,
	});

export const update = async ({ conversationId, ...rest }: GroupUpdate) => {
	const [data] = await db
		.update(groups)
		.set(rest)
		.where(eq(groups.conversationId, conversationId))
		.returning();

	return data;
};
