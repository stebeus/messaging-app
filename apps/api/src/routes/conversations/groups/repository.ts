import type { GroupUpdate, NewGroup } from '@repo/contracts/groups';
import type { Id } from '@repo/contracts/shared';
import type { UserParameters } from '@repo/contracts/users';
import type { ParticipatedConversation } from '#routes/conversations/types.ts';
import type { QueryParameters } from '#types.ts';

import { eq } from 'drizzle-orm';

import { CreationError, contains, type DatabaseContext, db, groups, orderBy } from '#db/index.ts';

import { groupRelations, groupSearchRelations, memberOfGroup } from './helpers.ts';

export const create = async ({ client = db, ...group }: DatabaseContext<NewGroup>) => {
	const [data] = await client.insert(groups).values(group).returning();
	if (data == null) throw new CreationError('group');
	return data;
};

export const find = async ({
	query: { q, sort, order },
	client = db,
}: DatabaseContext<QueryParameters>) =>
	await client.query.groups.findMany({
		where: { name: contains(q) },
		with: groupSearchRelations,
		...orderBy(sort, order),
	});

export const findOne = async ({ id, client = db }: DatabaseContext<Id>) =>
	await client.query.groups.findFirst({ where: { conversationId: id }, with: groupRelations });

export const findByMembership = async ({ userId, client = db }: DatabaseContext<UserParameters>) =>
	await client.query.groups.findMany({ where: memberOfGroup(userId), with: groupRelations });

export const findOneByMembership = async ({
	id,
	userId,
	client = db,
}: DatabaseContext<ParticipatedConversation>) =>
	await client.query.groups.findFirst({
		where: { ...memberOfGroup(userId), conversationId: id },
		with: groupRelations,
	});

export const update = async ({
	conversationId,
	client = db,
	...group
}: DatabaseContext<GroupUpdate>) => {
	const [data] = await client
		.update(groups)
		.set(group)
		.where(eq(groups.conversationId, conversationId))
		.returning();

	return data;
};
