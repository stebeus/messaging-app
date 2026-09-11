import type { MemberUpdate, NewMember } from '@repo/contracts/members';
import type { MemberArgs, MemberSelection, MembersSelection } from './types.ts';

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

const create = async ({ tx = db, ...values }: DatabaseContext<NewMember>) => {
	const [data] = await tx.insert(members).values(values).returning();
	if (data == null) throw new InsertionError('member', values);
	return data;
};

const find = async ({
	conversationId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<MembersSelection>) =>
	await tx.query.members.findMany({
		where: { conversationId, user: containsDisplayName(q) },
		with: memberRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ tx = db, ...values }: DatabaseContext<MemberSelection>) =>
	await tx.query.members.findFirst({ where: values, with: memberRelations });

const update = async ({ userId, conversationId, role, tx = db }: DatabaseContext<MemberUpdate>) => {
	const [data] = await tx
		.update(members)
		.set({ role })
		.where(isMember({ userId, conversationId }))
		.returning();

	if (data == null) throw new UpdateError('member', { userId, conversationId, role });

	return data;
};

const destroy = async ({ userId, conversationId, tx = db }: DatabaseContext<MemberArgs>) => {
	const [data] = await tx.delete(members).where(isMember({ userId, conversationId })).returning();
	if (data == null) throw new DeletionError('member', { userId, conversationId });
	return data;
};

export const memberRepository = { create, find, findOne, update, destroy } as const;
