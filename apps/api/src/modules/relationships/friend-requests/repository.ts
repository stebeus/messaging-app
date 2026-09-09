import type { NewFriendRequest } from '@repo/contracts/friend-requests';
import type {
	FriendRequestParameters,
	FriendRequestSelection,
	FriendRequestsSelection,
} from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	friendRequests,
	InsertionError,
	orderBy,
} from '#db/index.ts';
import { filterUser } from '#modules/relationships/helpers.ts';

import { isFriendRequest } from './helpers.ts';

export const create = async ({ tx = db, ...values }: DatabaseContext<NewFriendRequest>) => {
	const [data] = await tx.insert(friendRequests).values(values).returning();
	if (data == null) throw new InsertionError('Friend Request', values);
	return data;
};

export const find = async ({
	requesterId,
	recipientId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<FriendRequestsSelection>) => {
	const filter = filterUser(requesterId, recipientId, q);

	return await tx.query.friendRequests.findMany({
		where: { OR: [{ requesterId }, { recipientId }] },
		with: { requester: filter, recipient: filter },
		...orderBy(sort, order),
	});
};

export const findOne = async ({ tx = db, ...values }: DatabaseContext<FriendRequestSelection>) =>
	await tx.query.friendRequests.findFirst({
		where: values,
		with: { requester: true, recipient: true },
	});

export const destroy = async ({ tx = db, ...values }: DatabaseContext<FriendRequestParameters>) => {
	const [data] = await tx.delete(friendRequests).where(isFriendRequest(values)).returning();
	if (data == null) throw new DeletionError('Friend Request', values);
	return data;
};
