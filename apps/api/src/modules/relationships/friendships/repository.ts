import type { NewFriendship } from '@repo/contracts/friendships';
import type { FriendshipParameters, FriendshipSelection, FriendshipsSelection } from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	friendships,
	InsertionError,
	orderBy,
} from '#db/index.ts';
import { filterUser } from '#modules/relationships/helpers.ts';

import { isFriendship } from './helpers.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewFriendship>) => {
	const [data] = await tx.insert(friendships).values(values).returning();
	if (data == null) throw new InsertionError('Friendship', values);
	return data;
};

const find = async ({
	user1Id,
	user2Id,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<FriendshipsSelection>) => {
	const filter = filterUser(user1Id, user2Id, q);

	return await tx.query.friendships.findMany({
		where: { OR: [{ user1Id }, { user2Id }] },
		with: { user1: filter, user2: filter },
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
