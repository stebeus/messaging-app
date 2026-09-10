import type { MemberUpdate, NewMember } from '@repo/contracts/members';
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
import { containsDisplayName, type UsersSelection } from '#modules/users/index.ts';

import { isMember, memberRelations } from './helpers.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewMember>) => {
	const [data] = await tx.insert(members).values(values).returning();
	if (data == null) throw new InsertionError('Member', values);
	return data;
};

const find = async ({ query: { q, sort, order }, tx = db }: DatabaseContext<UsersSelection>) =>
	await tx.query.members.findMany({
		where: { user: containsDisplayName(q) },
		with: memberRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ tx = db, ...values }: DatabaseContext<MemberSelection>) =>
	await tx.query.members.findFirst({ where: values, with: memberRelations });

const update = async ({ role, tx = db, ...values }: DatabaseContext<MemberUpdate>) => {
	const [data] = await tx.update(members).set({ role }).where(isMember(values)).returning();
	if (data == null) throw new UpdateError('Member', { ...values, role });
	return data;
};

const destroy = async ({ tx = db, ...values }: DatabaseContext<MemberParameters>) => {
	const [data] = await tx.delete(members).where(isMember(values)).returning();
	if (data == null) throw new DeletionError('Member', values);
	return data;
};

export const memberRepository = { create, find, findOne, update, destroy } as const;
