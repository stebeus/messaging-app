import z from 'zod';

import { id } from '#utils.js';

import { NewMember } from './entity.js';

export const MemberBody = NewMember.omit({ conversationId: true });

export const MemberParams = z.object({
	memberId: id,
});

export type MemberBody = z.infer<typeof MemberBody>;

export type MemberParams = z.infer<typeof MemberParams>;
