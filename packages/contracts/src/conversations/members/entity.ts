import * as z from 'zod';

import { createdAt, id, updatedAt } from '#utils.js';

export const roles = ['member', 'admin', 'owner'] as const;

export const Member = z.object({
	userId: id,
	conversationId: id,
	role: z.enum(roles).default('member'),
	joinedAt: createdAt,
	updatedAt,
});

export const NewMember = Member.omit({ joinedAt: true, updatedAt: true });

export type Member = z.infer<typeof Member>;

export type NewMember = z.infer<typeof NewMember>;
