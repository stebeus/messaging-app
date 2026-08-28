import type { NewFriendship } from '@repo/contracts/users/friendships';

import { and, eq } from 'drizzle-orm';

import { db, del, insert } from '#db/index.ts';

import { friendships } from './schema.ts';

export const create = async ({ userId, friendId }: NewFriendship) =>
	await insert(friendships, {
		userId: Math.min(userId, friendId),
		friendId: Math.max(userId, friendId),
	});

export const findMany = async (userId: number) =>
	await db.query.friendships.findMany({ where: { userId } });

export const findFirst = async (friendship: NewFriendship) =>
	await db.query.friendships.findFirst({ where: friendship });

export const remove = async ({ userId, friendId }: NewFriendship) =>
	await del(friendships, and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)));
