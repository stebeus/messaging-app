import * as z from 'zod';

import { GroupParams } from '#modules/groups/dto.js';
import { id } from '#shared/entities.js';

import { MemberUpdate } from './entity.js';

export const MemberParams = z.object({
	...GroupParams.shape,
	memberId: id,
});

export const UpdateMemberBody = MemberUpdate.pick({ role: true });

export type MemberParams = z.infer<typeof MemberParams>;

export type UpdateMemberBody = z.infer<typeof UpdateMemberBody>;
