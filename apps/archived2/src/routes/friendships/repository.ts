import type {
	Friendship,
	FriendshipDeletion,
	FriendshipUpdate,
	NewFriendship,
} from '@repo/contracts/friendships';
import type { UserQuery } from '@repo/contracts/users';

import { and, eq } from 'drizzle-orm';

import { db, friendships, orderBy, RepositoryError } from '#db/index.ts';

export const create = async (friendship: NewFriendship) => {
	const [data] = await db.insert(friendships).values(friendship).returning();
	if (data == null) throw new RepositoryError('create', 'friendship');
	return data;
};

export const findMany = async ({
	userAId,
	status,
	sort,
	order,
}: Pick<Friendship, 'userAId' | 'status'> & UserQuery) =>
	await db.query.friendships.findMany({
		where: { userAId, status },
		with: { users: true },
		...orderBy(sort, order),
	});

export const findFirst = async ({
	userAId,
	userBId,
	status,
}: Omit<Friendship, 'createdAt' | 'updatedAt'>) =>
	await db.query.friendships.findFirst({
		where: { userAId, userBId, status },
		with: { users: true },
	});

const isFriend = (userAId: number, userBId: number) =>
	and(eq(friendships.userAId, userAId), eq(friendships.userBId, userBId));

export const update = async ({ status, userAId, userBId }: FriendshipUpdate) => {
	const [data] = await db
		.update(friendships)
		.set({ status })
		.where(isFriend(userAId, userBId))
		.returning();

	return data;
};

export const destroy = async ({ userAId, userBId }: FriendshipDeletion) => {
	const [data] = await db.delete(friendships).where(isFriend(userAId, userBId)).returning();
	return data;
};
