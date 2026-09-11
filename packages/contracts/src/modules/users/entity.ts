import * as z from 'zod';

import { Base, base, timestamps } from '#shared/entities.js';

export const User = z.object({
	...Base.shape,
	name: z.string().trim().min(1, 'Name is required'),
	username: z
		.string()
		.trim()
		.min(1, 'Username is required')
		.max(25, 'Username cannot be longer than 25 characters'),
	displayName: z.string().max(50, 'Display name cannot be longer than 50 characters').nullable(),
	email: z.email('Invalid email').min(1, 'Email is required'),
	emailIsVerified: z.boolean().default(false),
	avatar: z.httpUrl().normalize().nullable(),
});

const UserCredentials = z.object({
	...User.shape,
	password: z.string().trim().min(8, 'Password must be at least 8 characters long'),
});

export const NewUser = UserCredentials.omit(base);

export const UserUpdate = UserCredentials.omit(timestamps).partial().required({ id: true });

export type User = z.infer<typeof User>;

export type NewUser = z.input<typeof NewUser>;

export type UserUpdate = z.infer<typeof UserUpdate>;
