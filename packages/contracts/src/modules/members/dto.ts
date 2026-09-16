import * as z from 'zod';

import { GroupParams } from '#modules/groups/dto.js';
import { User } from '#modules/users/entity.js';
import { id } from '#shared/entities.js';

import { Member, MemberUpdate } from './entity.js';

export const MemberParams = z.object({
	...GroupParams.shape,
	memberId: id,
});

export const UpdateMemberBodyRequest = MemberUpdate.pick({ role: true });

export const MemberResponse = z.object({
	...Member.shape,
	user: User,
});

export const ListMemberResponse = z.array(MemberResponse);

export type MemberParams = z.infer<typeof MemberParams>;

export type UpdateMemberBodyRequest = z.infer<typeof UpdateMemberBodyRequest>;

export type MemberResponse = z.infer<typeof MemberResponse>;

export type ListMemberResponse = z.infer<typeof ListMemberResponse>;
