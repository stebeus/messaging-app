import * as z from 'zod';

import { createdAt, id, updatedAt } from '#utils.js';

const roles = ['member', 'admin', 'owner'] as const;

export const Member = z.object({
	memberId: id,
	conversationId: id,
	role: z.enum(roles).default('member'),
	joinedAt: createdAt,
	updatedAt,
});

export type Member = z.infer<typeof Member>;

export type NewMember = Omit<Member, 'joinedAt' | 'updatedAt'>;
