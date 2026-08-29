import z from 'zod';

import { id } from '#shared/fields.js';

import { MemberUpdate } from './entity.js';

export const UpdateMemberBody = MemberUpdate.pick({ role: true });

export const MemberParams = z.object({
	memberId: id,
});

export type UpdateMemberBody = z.infer<typeof UpdateMemberBody>;

export type MemberParams = z.infer<typeof MemberParams>;
