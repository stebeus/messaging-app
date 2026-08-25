import type { Timestamps } from '#db/columns.ts';
import type { users } from '#routes/auth/schema.ts';

import * as z from 'zod';

export type User = typeof users.$inferSelect;

export type NewUser = typeof users.$inferInsert;

export type UserUpdate = Omit<User, Timestamps>;

export const userParamSchema = z.object({
	id: z.coerce.number(),
});

export const newUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	emailVerified: z.boolean(),
	image: z.url(),
});
