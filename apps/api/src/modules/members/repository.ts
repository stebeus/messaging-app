import type { Member, MemberUpdate, NewMember } from '@repo/contracts/members';

import { and, eq } from 'drizzle-orm';

import { CreationError, type DatabaseContext, db, members } from '#db/index.ts';

type MemberParameters = Pick<Member, 'userId' | 'conversationId'>;

const isMember = ({ userId, conversationId }: MemberParameters) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));

export const create = async ({ client = db, ...member }: DatabaseContext<NewMember>) => {
	const [data] = await db.insert(members).values(member).returning();
	if (data == null) throw new CreationError('member');
	return data;
};

export const findOne = async ({ client = db, ...member }: DatabaseContext<MemberParameters>) =>
	await client.query.members.findFirst({ where: member, with: { user: true } });

export const update = async ({ role, client = db, ...member }: DatabaseContext<MemberUpdate>) => {
	const [data] = await client.update(members).set({ role }).where(isMember(member)).returning();
	return data;
};

export const destroy = async ({ client = db, ...member }: DatabaseContext<MemberParameters>) => {
	const [data] = await client.delete(members).where(isMember(member)).returning();
	return data;
};
