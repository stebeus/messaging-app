import type { NewBan } from '@repo/contracts/bans';
import type { BanParameters, BanSelection, BansSelection } from './types.ts';

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

const create = async ({ tx = db, ...values }: DatabaseContext<NewBan>) => {
	const [data] = await tx.insert(bans).values(values).returning();
	if (data == null) throw new InsertionError('Ban', values);
	return data;
};

const find = async ({
	groupId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<BansSelection>) =>
	await tx.query.bans.findMany({
		where: { groupId, user: containsDisplayName(q) },
		with: banRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ tx = db, ...values }: DatabaseContext<BanSelection>) =>
	await tx.query.bans.findFirst({ where: values, with: banRelations });

const destroy = async ({ tx = db, ...values }: DatabaseContext<BanParameters>) => {
	const [data] = await tx.delete(bans).where(isBan(values)).returning();
	if (data == null) throw new DeletionError('Ban', values);
	return data;
};

export const banRepository = { create, find, findOne, destroy } as const;
