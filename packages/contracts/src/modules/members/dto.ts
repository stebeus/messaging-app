import * as z from 'zod';

import { id } from '#shared/fields.js';

import { MemberUpdate } from './entity.js';

export const MemberParams = z.object({
	memberId: id,
});

export const UpdateMemberBody = MemberUpdate.pick({ role: true });

export type MemberParams = z.infer<typeof MemberParams>;

export type UpdateMemberBody = z.infer<typeof UpdateMemberBody>;
