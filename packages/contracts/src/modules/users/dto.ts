import * as z from 'zod';

import { id, Query, sorts } from '#helpers/index.js';

export const UserParameters = z.object({
	userId: id,
});

export const userSorts = [...sorts, 'displayName'] as const;

export const UserQuery = z
	.object({
		...Query.shape,
		sort: z.enum(userSorts).default('createdAt'),
	})
	.partial();

export type UserParameters = z.infer<typeof UserParameters>;

export type UserQuery = z.infer<typeof UserQuery>;
