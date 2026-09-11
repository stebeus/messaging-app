import type { GroupUpdate, NewGroup } from '@repo/contracts/groups';
import type { GroupSelection, GroupsSelection } from './types.ts';

import { eq } from 'drizzle-orm';

import {
	type DatabaseContext,
	db,
	groups,
	InsertionError,
	orderBy,
	UpdateError,
} from '#db/index.ts';

import { containsName, groupListRelations, groupRelations, memberOfGroup } from './helpers.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewGroup>) => {
	const [data] = await tx.insert(groups).values(values).returning();
	if (data == null) throw new InsertionError('Group', values);
	return data;
};

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<GroupsSelection>) =>
	await tx.query.groups.findMany({
		where: { ...containsName(q), NOT: { bans: { userId } } },
		with: groupListRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ tx = db, ...values }: DatabaseContext<GroupSelection>) =>
	await tx.query.groups.findFirst({ where: values, with: groupRelations });

const findByMembership = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<GroupsSelection>) =>
	await tx.query.groups.findMany({
		where: { ...memberOfGroup(userId), ...containsName(q) },
		with: groupRelations,
		...orderBy(sort, order),
	});

const update = async ({ conversationId, tx = db, ...values }: DatabaseContext<GroupUpdate>) => {
	const [data] = await tx
		.update(groups)
		.set(values)
		.where(eq(groups.conversationId, conversationId))
		.returning();

	if (data == null) throw new UpdateError('group', { ...values, conversationId });

	return data;
};

export const groupRepository = {
	create,
	find,
	findOne,
	findByMembership,
	update,
} as const;
