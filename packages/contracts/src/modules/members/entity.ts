import * as z from 'zod';

import { id, Timestamps, timestamps } from '#shared/entities.js';

export const roles = ['member', 'admin', 'owner'] as const;

export const Member = z.object({
	...Timestamps.shape,
	userId: id,
	conversationId: id,
	role: z.enum(roles).default('member'),
});

export const NewMember = Member.omit(timestamps);

export const MemberUpdate = z
	.object({
		...Member.shape,
		role: z.enum(roles).exclude(['owner']).default('member').optional(),
	})
	.omit(timestamps);

export type Member = z.infer<typeof Member>;

export type MemberSelection = z.input<typeof Member>;

export type NewMember = z.input<typeof NewMember>;

export type MemberUpdate = z.infer<typeof MemberUpdate>;
