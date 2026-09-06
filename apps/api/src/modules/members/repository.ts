import type { MemberUpdate, NewMember } from '@repo/contracts/members';
import type { MemberParameters, MemberSelection } from './types.ts';

import {
	type DatabaseContext,
	DeletionError,
	db,
	InsertionError,
	members,
	UpdateError,
} from '#db/index.ts';

import { isMember } from './helpers.ts';

export const create = async ({ tx = db, ...values }: DatabaseContext<NewMember>) => {
	const [data] = await db.insert(members).values(values).returning();
	if (data == null) throw new InsertionError('Member', values);
	return data;
};

export const findOne = async ({ tx = db, ...values }: DatabaseContext<MemberSelection>) =>
	await tx.query.members.findFirst({ where: values, with: { user: true } });

export const update = async ({ role, tx = db, ...values }: DatabaseContext<MemberUpdate>) => {
	const [data] = await tx.update(members).set({ role }).where(isMember(values)).returning();
	if (data == null) throw new UpdateError('Member', values);
	return data;
};

export const destroy = async ({ tx = db, ...values }: DatabaseContext<MemberParameters>) => {
	const [data] = await tx.delete(members).where(isMember(values)).returning();
	if (data == null) throw new DeletionError('Member', values);
	return data;
};
