import type { NewFriendship } from '@repo/contracts/users/friendships';

import { and, eq } from 'drizzle-orm';

import { db, del, insert } from '#db/index.ts';

import { friendships } from './schema.ts';

export const create = async (friendship: NewFriendship) => await insert(friendships, friendship);

export const findMany = async () => await db.query.friendships.findMany();

export const findFirst = async (friendship: NewFriendship) =>
	await db.query.friendships.findFirst({ where: friendship });

export const remove = async ({ userId, friendId }: NewFriendship) =>
	await del(friendships, and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)));
