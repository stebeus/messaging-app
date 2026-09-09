import type { MemberUpdate, NewMember } from '@repo/contracts/members';
import type { UsersSelection } from '#modules/users/types.ts';
import type { MemberParameters, MemberSelection } from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	InsertionError,
	members,
	orderBy,
	UpdateError,
} from '#db/index.ts';
import { containsDisplayName } from '#modules/users/helpers.ts';

import { isMember, memberRelations } from './helpers.ts';

export const create = async ({ tx = db, ...values }: DatabaseContext<NewMember>) => {
	const [data] = await tx.insert(members).values(values).returning();
	if (data == null) throw new InsertionError('Member', values);
	return data;
};

export const find = async ({
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<UsersSelection>) =>
	await tx.query.members.findMany({
		where: { user: containsDisplayName(q) },
		with: memberRelations,
		...orderBy(sort, order),
	});

export const findOne = async ({ tx = db, ...values }: DatabaseContext<MemberSelection>) =>
	await tx.query.members.findFirst({ where: values, with: memberRelations });

export const update = async ({ role, tx = db, ...values }: DatabaseContext<MemberUpdate>) => {
	const [data] = await tx.update(members).set({ role }).where(isMember(values)).returning();
	if (data == null) throw new UpdateError('Member', { ...values, role });
	return data;
};

export const destroy = async ({ tx = db, ...values }: DatabaseContext<MemberParameters>) => {
	const [data] = await tx.delete(members).where(isMember(values)).returning();
	if (data == null) throw new DeletionError('Member', values);
	return data;
};
