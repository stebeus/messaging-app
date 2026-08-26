import * as z from 'zod';

import { id, Timestamps } from '#utils.js';

export const privacy = ['private', 'public'] as const;

export const Group = z.object({
	...Timestamps.shape,
	conversationId: id,
	name: z.string(),
	description: z.string(),
	image: z.httpUrl().normalize().optional(),
	privacy: z.enum(privacy).default('private'),
	ownerId: id,
});

export type Group = z.infer<typeof Group>;

export type NewGroup = Omit<Group, keyof Timestamps>;
