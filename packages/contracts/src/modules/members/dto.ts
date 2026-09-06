import * as z from 'zod';

import { id } from '#shared/entities.js';

import { MemberUpdate } from './entity.js';

export const MemberParameters = z.object({
	memberId: id,
});

export const UpdateMemberBody = MemberUpdate.pick({ role: true });

export type MemberParameters = z.infer<typeof MemberParameters>;

export type UpdateMemberBody = z.infer<typeof UpdateMemberBody>;
