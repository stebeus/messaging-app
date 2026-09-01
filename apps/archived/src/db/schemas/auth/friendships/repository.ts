import type {
	Friendship,
	FriendshipDeletion,
	FriendshipUpdate,
	NewFriendship,
} from '@repo/contracts/users/friendships';

import { and, eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { friendships } from './schema.ts';

export const create = async (friendship: NewFriendship) =>
	await db.insert(friendships).values(friendship).returning();

export const findMany = async (friendship: Friendship) =>
	await db.query.friendships.findMany({ where: friendship });

const isFriend = (userAId: number, userBId: number) =>
	and(eq(friendships.userAId, userAId), eq(friendships.userBId, userBId));

export const update = async ({ status, userAId, userBId }: FriendshipUpdate) =>
	await db.update(friendships).set({ status }).where(isFriend(userAId, userBId)).returning();

export const remove = async ({ userAId, userBId }: FriendshipDeletion) =>
	await db.delete(friendships).where(isFriend(userAId, userBId)).returning();
