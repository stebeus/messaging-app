import type { Id } from '@repo/contracts/shared';
import type { UserQueryParameters } from './types.ts';

import { contains, type DatabaseContext, db, orderBy } from '#db/index.ts';

const userRelations = { friendships: true, groups: true } as const;

export const find = async ({
	query: { q, sort, order },
	client = db,
}: DatabaseContext<UserQueryParameters>) =>
	await client.query.users.findMany({
		where: { displayName: contains(q) },
		with: userRelations,
		...orderBy(sort, order),
	});

export const findOne = async ({ id, client = db }: DatabaseContext<Id>) =>
	await client.query.users.findFirst({ where: { id }, with: userRelations });
