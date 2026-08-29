import * as z from 'zod';

import { createdAt, id, updatedAt } from '#shared/fields.js';

export const roles = ['member', 'admin', 'owner'] as const;

export const Member = z.object({
	userId: id,
	conversationId: id,
	role: z.enum(roles).default('member'),
	joinedAt: createdAt,
	updatedAt,
});

const timestamps = { joinedAt: true, updatedAt: true } as const;

export const NewMember = Member.omit(timestamps);

export const MemberUpdate = Member.omit(timestamps).partial({ role: true });

export type Member = z.infer<typeof Member>;

export type NewMember = z.infer<typeof NewMember>;

export type MemberUpdate = z.infer<typeof MemberUpdate>;
