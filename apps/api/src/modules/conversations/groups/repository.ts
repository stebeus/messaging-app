import type { GroupUpdate, NewGroup } from '@repo/contracts/groups';
import type {
	GroupSelection,
	GroupsSelection,
	ParticipatedGroup,
	ParticipatedGroupsSelection,
} from './types.ts';

import { eq } from 'drizzle-orm';

import {
	type DatabaseContext,
	db,
	groups,
	InsertionError,
	orderBy,
	UpdateError,
} from '#db/index.ts';

import { containsName, groupRelations, groupSearchRelations, memberOfGroup } from './helpers.ts';

export const create = async ({ tx = db, ...values }: DatabaseContext<NewGroup>) => {
	const [data] = await tx.insert(groups).values(values).returning();
	if (data == null) throw new InsertionError('Group', values);
	return data;
};

export const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<GroupsSelection>) =>
	await tx.query.groups.findMany({
		where: { ...containsName(q), NOT: { bans: { userId } } },
		with: groupSearchRelations,
		...orderBy(sort, order),
	});

export const findOne = async ({ tx = db, ...values }: DatabaseContext<GroupSelection>) =>
	await tx.query.groups.findFirst({ where: values, with: groupRelations });

export const findByMembership = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<ParticipatedGroupsSelection>) =>
	await tx.query.groups.findMany({
		where: { ...memberOfGroup(userId), ...containsName(q) },
		with: groupRelations,
		...orderBy(sort, order),
	});

export const findOneByMembership = async ({
	groupId,
	userId,
	tx = db,
}: DatabaseContext<ParticipatedGroup>) =>
	await tx.query.groups.findFirst({
		where: { ...memberOfGroup(userId), conversationId: groupId },
		with: groupRelations,
	});

export const update = async ({
	conversationId,
	tx = db,
	...values
}: DatabaseContext<GroupUpdate>) => {
	const [data] = await tx
		.update(groups)
		.set(values)
		.where(eq(groups.conversationId, conversationId))
		.returning();

	if (data == null) throw new UpdateError('Group', { ...values, conversationId });

	return data;
};
