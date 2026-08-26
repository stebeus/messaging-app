import * as z from 'zod';

import { id, Timestamps, timestamps } from '#utils.js';

export const privacies = ['private', 'public'] as const;

export const Group = z.object({
	...Timestamps.shape,
	conversationId: id,
	ownerId: id,
	name: z.string(),
	description: z.string().optional(),
	image: z.httpUrl().normalize().optional(),
	privacy: z.enum(privacies).default('private'),
});

export const NewGroup = Group.omit(timestamps);

export type Group = z.infer<typeof Group>;

export type NewGroup = z.infer<typeof NewGroup>;
