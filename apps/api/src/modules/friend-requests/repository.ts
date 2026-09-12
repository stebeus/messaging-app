import type { NewFriendRequest } from '@repo/contracts/friend-requests';
import type { Relationship } from '@repo/contracts/relationships';
import type { FriendRequestArgs } from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	friendRequests,
	InsertionError,
	orderBy,
} from '#db/index.ts';
import { containsName, createUserFilter, type ListUserArgs } from '#modules/users/index.ts';

import { isFriendRequest } from './helpers.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewFriendRequest>) => {
	const [data] = await tx.insert(friendRequests).values(values).returning();
	if (data == null) throw new InsertionError('friend request', values);
	return data;
};

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<ListUserArgs>) => {
	const displayName = containsName(q);
	const userFilter = createUserFilter(userId);

	return await tx.query.friendRequests.findMany({
		where: {
			OR: [
				{ requesterId: userId, recipient: displayName },
				{ recipientId: userId, requester: displayName },
			],
		},
		with: { requester: userFilter, recipient: userFilter },
		...orderBy(sort, order),
	});
};

const findOne = async ({ user1Id, user2Id, tx = db }: DatabaseContext<Relationship>) =>
	await tx.query.friendRequests.findFirst({
		where: {
			OR: [
				{ requesterId: user1Id, recipientId: user2Id },
				{ requesterId: user2Id, recipientId: user1Id },
			],
		},
		with: { requester: true, recipient: true },
	});

const destroy = async ({ tx = db, ...values }: DatabaseContext<FriendRequestArgs>) => {
	const [data] = await tx.delete(friendRequests).where(isFriendRequest(values)).returning();
	if (data == null) throw new DeletionError('friend request', values);
	return data;
};

export const friendRequestRepository = { create, find, findOne, destroy } as const;
