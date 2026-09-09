import type { NewBan } from '@repo/contracts/bans';
import type { UsersSelection } from '#modules/users/types.ts';
import type { BanParameters, BanSelection } from './types.ts';

import {
	bans,
	type DatabaseContext,
	DeletionError,
	db,
	InsertionError,
	orderBy,
} from '#db/index.ts';
import { containsDisplayName } from '#modules/users/helpers.ts';

import { banRelations, isBan } from './helpers.ts';

export const create = async ({ tx = db, ...values }: DatabaseContext<NewBan>) => {
	const [data] = await tx.insert(bans).values(values).returning();
	if (data == null) throw new InsertionError('Ban', values);
	return data;
};

export const find = async ({
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<UsersSelection>) =>
	await tx.query.bans.findMany({
		where: { user: containsDisplayName(q) },
		with: banRelations,
		...orderBy(sort, order),
	});

export const findOne = async ({ tx = db, ...values }: DatabaseContext<BanSelection>) =>
	await tx.query.bans.findFirst({ where: values, with: banRelations });

export const destroy = async ({ tx = db, ...values }: DatabaseContext<BanParameters>) => {
	const [data] = await tx.delete(bans).where(isBan(values)).returning();
	if (data == null) throw new DeletionError('Ban', values);
	return data;
};
