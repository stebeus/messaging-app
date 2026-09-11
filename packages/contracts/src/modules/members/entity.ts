import * as z from 'zod';

import { id, Timestamps, timestamps } from '#shared/entities.js';

export const roles = ['member', 'admin', 'owner'] as const;

const role = z.enum(roles);
const manageableRole = role.exclude(['owner']);

const defaultRole = 'member';

export const Member = z.object({
	...Timestamps.shape,
	userId: id,
	conversationId: id,
	role: role.default(defaultRole),
});

export const NewMember = Member.omit(timestamps);

export const MemberUpdate = z
	.object({
		...Member.shape,
		role: manageableRole.default(defaultRole),
	})
	.omit(timestamps);

export type Member = z.infer<typeof Member>;

export type NewMember = z.input<typeof NewMember>;

export type MemberUpdate = z.input<typeof MemberUpdate>;

export type Role = z.infer<typeof role>;

export type Roles = typeof roles;

export type ManageableRole = z.infer<typeof manageableRole>;
