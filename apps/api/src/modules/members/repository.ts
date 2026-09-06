import type { MemberUpdate, NewMember } from '@repo/contracts/members';
import type { MemberParameters } from './types.ts';

import { type DatabaseContext, db, InsertionError, members } from '#db/index.ts';

import { isMember } from './helpers.ts';

export const create = async ({ tx = db, ...member }: DatabaseContext<NewMember>) => {
	const [data] = await db.insert(members).values(member).returning();
	if (data == null) throw new InsertionError('Member', member);
	return data;
};

export const findOne = async ({ tx = db, ...member }: DatabaseContext<MemberParameters>) =>
	await tx.query.members.findFirst({ where: member, with: { user: true } });

export const update = async ({ role, tx = db, ...member }: DatabaseContext<MemberUpdate>) => {
	const [data] = await tx.update(members).set({ role }).where(isMember(member)).returning();
	return data;
};

export const destroy = async ({ tx = db, ...member }: DatabaseContext<MemberParameters>) => {
	const [data] = await tx.delete(members).where(isMember(member)).returning();
	return data;
};
