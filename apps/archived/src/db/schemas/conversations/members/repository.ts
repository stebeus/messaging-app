import type {
	MemberDeletion,
	MemberUpdate,
	NewMember,
} from '@repo/contracts/conversations/members';

import { and, eq } from 'drizzle-orm';

import { db } from '#db/client.ts';

import { members } from './schema.ts';

export const create = async (member: NewMember) =>
	await db.insert(members).values(member).returning();

const isMember = (userId: number, conversationId: number) =>
	and(eq(members.userId, userId), eq(members.conversationId, conversationId));

export const update = async ({ role, userId, conversationId }: MemberUpdate) =>
	await db.update(members).set({ role }).where(isMember(userId, conversationId)).returning();

export const remove = async ({ userId, conversationId }: MemberDeletion) =>
	await db.delete(members).where(isMember(userId, conversationId)).returning();
