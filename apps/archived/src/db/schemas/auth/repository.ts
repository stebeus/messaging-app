import type { UserQuery } from '@repo/contracts/users';

import { db } from '#db/client.ts';

export const findMany = async ({ q, sort = 'createdAt', order = 'asc' }: UserQuery = {}) =>
	await db.query.users.findMany({
		where: { displayName: { like: `%${q}%` } },
		with: { friendships: true },
		orderBy: { [sort]: order },
	});

export const findFirst = async (id: number) =>
	await db.query.users.findFirst({ where: { id }, with: { friendships: true } });
