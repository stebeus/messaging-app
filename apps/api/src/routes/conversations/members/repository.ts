import type { NewMember } from '@repo/contracts/conversations/members';

import { eq } from 'drizzle-orm';

import { db, del, insert, update } from '#db/index.ts';

import { members } from './schema.ts';

export const create = async (member: NewMember) => await insert(members, member);

export const findMany = async () => await db.query.members.findMany();

export const findFirst = async (userId: number) =>
	await db.query.members.findFirst({ where: { userId } });

export const modify = async (member: NewMember) =>
	await update(members, member, eq(members.userId, member.userId));

export const remove = async (id: number) => await del(members, eq(members.userId, id));
