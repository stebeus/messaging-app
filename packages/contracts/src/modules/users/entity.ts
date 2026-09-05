import * as z from 'zod';

import { Base, base, timestamps } from '#shared/entities.js';

export const User = z.object({
	...Base.shape,
	name: z.string(),
	username: z.string(),
	displayName: z.string().nullable(),
	email: z.email(),
	emailIsVerified: z.boolean().default(false),
	avatar: z.httpUrl().normalize().nullable(),
});

const UserCredentials = z.object({
	...User.shape,
	password: z.string(),
});

export const NewUser = UserCredentials.omit(base);

export const UserUpdate = UserCredentials.omit(timestamps).partial().required({ id: true });

export type User = z.infer<typeof User>;

export type NewUser = z.input<typeof NewUser>;

export type UserUpdate = z.infer<typeof UserUpdate>;
