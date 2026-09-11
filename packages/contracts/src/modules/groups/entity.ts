import * as z from 'zod';

import { id, Timestamps, timestamps } from '#shared/entities.js';

export const visibilities = ['private', 'public'] as const;

export const Group = z.object({
	...Timestamps.shape,
	conversationId: id,
	ownerId: id,
	name: z.string().min(1, 'Name is required'),
	description: z.string().nullable().default(''),
	avatar: z.httpUrl().normalize().nullable().default(''),
	visibility: z.enum(visibilities).default('private'),
});

export const NewGroup = Group.omit(timestamps);

export const GroupUpdate = Group.omit(timestamps).partial().required({ conversationId: true });

export type Group = z.infer<typeof Group>;

export type NewGroup = z.input<typeof NewGroup>;

export type GroupUpdate = z.infer<typeof GroupUpdate>;
