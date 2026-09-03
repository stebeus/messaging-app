import * as z from 'zod';

import { id } from '#shared/entities.js';

import { roles } from './entity.js';

export const MemberParameters = z.object({
	memberId: id,
});

export const UpdateMemberBody = z.object({
	role: z.enum(roles).exclude(['owner']).default('member'),
});

export type MemberParameters = z.infer<typeof MemberParameters>;

export type UpdateMemberBody = z.infer<typeof UpdateMemberBody>;
