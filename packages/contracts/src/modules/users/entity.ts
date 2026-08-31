import * as z from 'zod';

import { Base, base, timestamps } from '#shared/fields.js';

export const User = z.object({
	...Base.shape,
	name: z.string().nullable(),
	username: z.string(),
	displayName: z.string().nullable(),
	email: z.email(),
	emailIsVerified: z.boolean().default(false),
	password: z.string(),
	avatar: z.httpUrl().normalize().nullable(),
});

export const NewUser = User.omit(base);

export const UserUpdate = User.omit(timestamps).partial().required({ id: true });

export type User = z.infer<typeof User>;

export type NewUser = z.infer<typeof NewUser>;

export type UserUpdate = z.infer<typeof UserUpdate>;
