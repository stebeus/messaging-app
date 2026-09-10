import type { NewFriendRequest } from '@repo/contracts/friend-requests';
import type { FriendRequestParameters, FriendRequestSelection } from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	friendRequests,
	InsertionError,
	orderBy,
} from '#db/index.ts';
import { createUserFilter, type UserSearchParameters } from '#modules/users/index.ts';

import { isFriendRequest } from './helpers.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewFriendRequest>) => {
	const [data] = await tx.insert(friendRequests).values(values).returning();
	if (data == null) throw new InsertionError('Friend Request', values);
	return data;
};

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<UserSearchParameters>) => {
	const userFilter = createUserFilter(userId, q);

	return await tx.query.friendRequests.findMany({
		where: { OR: [{ requesterId: userId }, { recipientId: userId }] },
		with: { requester: userFilter, recipient: userFilter },
		...orderBy(sort, order),
	});
};

const findOne = async ({ tx = db, ...values }: DatabaseContext<FriendRequestSelection>) =>
	await tx.query.friendRequests.findFirst({
		where: values,
		with: { requester: true, recipient: true },
	});

const destroy = async ({ tx = db, ...values }: DatabaseContext<FriendRequestParameters>) => {
	const [data] = await tx.delete(friendRequests).where(isFriendRequest(values)).returning();
	if (data == null) throw new DeletionError('Friend Request', values);
	return data;
};

export const friendRequestRepository = { create, find, findOne, destroy } as const;
