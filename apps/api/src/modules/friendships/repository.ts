import type { NewFriendship } from '@repo/contracts/friendships';
import type { FriendshipParameters, FriendshipSelection } from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	friendships,
	InsertionError,
	orderBy,
} from '#db/index.ts';
import { createUserFilter, type UserSearchParameters } from '#modules/users/index.ts';

import { isFriendship } from './helpers.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewFriendship>) => {
	const [data] = await tx.insert(friendships).values(values).returning();
	if (data == null) throw new InsertionError('Friendship', values);
	return data;
};

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<UserSearchParameters>) => {
	const userFilter = createUserFilter(userId, q);

	return await tx.query.friendships.findMany({
		where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
		with: { user1: userFilter, user2: userFilter },
		...orderBy(sort, order),
	});
};

const findOne = async ({ tx = db, ...values }: DatabaseContext<FriendshipSelection>) =>
	await tx.query.friendships.findFirst({ where: values, with: { user1: true, user2: true } });

const destroy = async ({ tx = db, ...values }: DatabaseContext<FriendshipParameters>) => {
	const [data] = await tx.delete(friendships).where(isFriendship(values)).returning();
	if (data == null) throw new DeletionError('Friendship', values);
	return data;
};

export const friendshipRepository = { create, find, findOne, destroy } as const;
