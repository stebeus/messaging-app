import type { UserSelection, UsersSelection } from './types.ts';

import { type DatabaseContext, db, orderBy } from '#db/index.ts';

import { containsDisplayName, userRelations } from './helpers.ts';

export const find = async ({
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<UsersSelection>) =>
	await tx.query.users.findMany({
		where: containsDisplayName(q),
		with: userRelations,
		...orderBy(sort, order),
	});

export const findOne = async ({ tx = db, ...values }: DatabaseContext<UserSelection>) =>
	await tx.query.users.findFirst({ where: values, with: userRelations });
