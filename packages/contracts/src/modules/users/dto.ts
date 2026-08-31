import * as z from 'zod';

import { id } from '#shared/fields.js';
import { Query, sorts } from '#shared/index.js';

export const UserParams = z.object({
	userId: id,
});

export const userSorts = [...sorts, 'displayName'] as const;

export const UserQuery = z
	.object({
		...Query.shape,
		sort: z.enum(userSorts).default('createdAt'),
	})
	.partial();

export type UserParams = z.infer<typeof UserParams>;

export type UserQuery = z.infer<typeof UserQuery>;
