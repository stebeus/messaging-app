import * as z from 'zod';

import { createdAt, id, updatedAt } from '#shared/entities.js';

const timestamps = { joinedAt: true, updatedAt: true } as const;

export const roles = ['member', 'admin', 'owner'] as const;

export const Member = z.object({
	userId: id,
	conversationId: id,
	role: z.enum(roles).default('member').optional(),
	joinedAt: createdAt,
	updatedAt,
});

export const NewMember = Member.omit(timestamps);

export const MemberUpdate = z
	.object({
		...Member.shape,
		role: z.enum(roles).exclude(['owner']).default('member').optional(),
	})
	.omit(timestamps);

export type Member = z.infer<typeof Member>;

export type NewMember = z.infer<typeof NewMember>;

export type MemberUpdate = z.infer<typeof MemberUpdate>;
