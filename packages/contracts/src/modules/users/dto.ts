import * as z from 'zod';

import { Group } from '#modules/groups/entity.js';
import { Member } from '#modules/members/entity.js';
import { id, Query, sorts } from '#shared/index.js';

import { User } from './entity.js';

export const UserParams = z.object({
	userId: id,
});

export const userSorts = [...sorts, 'name'] as const;

export const UserQuery = z
	.object({
		...Query.shape,
		sort: z.enum(userSorts).default('createdAt'),
	})
	.partial();

export const UserResponse = z.object({
	...User.shape,
	groups: z.array(Group),
	memberships: z.array(Member),
});

export const ListUserResponse = z.array(UserResponse);

export type UserParams = z.infer<typeof UserParams>;

export type UserQuery = z.infer<typeof UserQuery>;

export type UserResponse = z.infer<typeof UserResponse>;

export type ListUserResponse = z.infer<typeof ListUserResponse>;
