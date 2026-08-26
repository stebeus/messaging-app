import * as z from 'zod';

import { id, Timestamps } from '#utils.js';

export const privacies = ['private', 'public'] as const;

export const Group = z.object({
	...Timestamps.shape,
	conversationId: id,
	name: z.string(),
	description: z.string().optional(),
	image: z.httpUrl().normalize().optional(),
	privacy: z.enum(privacies).default('private'),
	ownerId: id,
});

export type Group = z.infer<typeof Group>;

export type NewGroup = Omit<Group, keyof Timestamps>;
