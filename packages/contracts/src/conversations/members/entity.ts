import * as z from 'zod';

import { createdAt, id, updatedAt } from '#utils.js';

export const Member = z.object({
	memberId: id,
	conversationId: id,
	role: z.enum(['member', 'admin', 'owner']).default('member'),
	joinedAt: createdAt,
	updatedAt,
});

export type Member = z.infer<typeof Member>;

export type NewMember = Omit<Member, 'joinedAt' | 'updatedAt'>;
