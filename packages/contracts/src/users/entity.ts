import * as z from 'zod';

import { Base, base, timestamps } from '#utils.js';

export const User = z.object({
	...Base.shape,
	name: z.string(),
	email: z.email(),
	emailVerified: z.boolean().default(false),
	image: z.httpUrl().normalize().optional(),
});

export const NewUser = User.omit(base);

export const UserUpdate = User.omit(timestamps);

export type User = z.infer<typeof User>;

export type NewUser = z.infer<typeof NewUser>;

export type UserUpdate = z.infer<typeof UserUpdate>;
