import type { UserQuery } from '@repo/contracts/users';

import { contains, db, orderBy } from '#db/index.ts';

const userRelations = { friendships: true, groups: true } as const;

export const find = async ({ q, sort, order }: UserQuery = {}) =>
	await db.query.users.findMany({
		where: { displayName: contains(q) },
		with: userRelations,
		...orderBy(sort, order),
	});

export const findFirst = async (id: number) =>
	await db.query.users.findFirst({ where: { id }, with: userRelations });
