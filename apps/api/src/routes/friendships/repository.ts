import type { Friendship, FriendshipUpdate, NewFriendship } from '@repo/contracts/friendships';
import type { Timestamps } from '@repo/contracts/shared';
import type { FriendshipParameters } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { CreationError, type DatabaseContext, db, friendships } from '#db/index.ts';

type RecipientFriendships = Pick<Friendship, 'user1Id' | 'status'>;

type FindFriendshipParameters = Omit<Friendship, keyof Timestamps>;

const isFriendship = ({ user1Id, user2Id }: FriendshipParameters) =>
	and(eq(friendships.user1Id, user1Id), eq(friendships.user2Id, user2Id));

export const create = async ({ client = db, ...friendship }: DatabaseContext<NewFriendship>) => {
	const [data] = await client.insert(friendships).values(friendship).returning();
	if (data == null) throw new CreationError('friendship');
	return data;
};

export const find = async ({
	client = db,
	...friendships
}: DatabaseContext<RecipientFriendships>) =>
	await client.query.friendships.findMany({ where: friendships, with: { users: true } });

export const findOne = async ({
	user1Id,
	user2Id,
	status,
	client = db,
}: DatabaseContext<FindFriendshipParameters>) =>
	await client.query.friendships.findFirst({
		where: { user1Id, user2Id, status },
		with: { users: true },
	});

export const update = async ({
	status,
	client = db,
	...friendship
}: DatabaseContext<FriendshipUpdate>) => {
	const [data] = await client
		.update(friendships)
		.set({ status })
		.where(isFriendship(friendship))
		.returning();

	return data;
};

export const destroy = async ({
	client = db,
	...friendship
}: DatabaseContext<FriendshipParameters>) => {
	const [data] = await client.delete(friendships).where(isFriendship(friendship)).returning();
	return data;
};
