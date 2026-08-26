import * as z from 'zod';

import { Base, type Timestamps } from '#utils.js';

export const User = z.object({
	...Base.shape,
	name: z.string(),
	email: z.email(),
	emailVerified: z.boolean().default(false),
	image: z.httpUrl().normalize().optional(),
});

export type User = z.infer<typeof User>;

export type NewUser = Omit<User, keyof Base>;

export type UserUpdate = Omit<User, keyof Timestamps>;
