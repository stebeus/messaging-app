import * as z from 'zod';

import { id, Timestamps } from '#utils.js';

const Group = z.object({
	...Timestamps.shape,
	conversationId: id,
	name: z.string(),
	description: z.string(),
	image: z.httpUrl().normalize(),
	privacy: z.enum(['private', 'public']).default('private'),
	ownerId: id,
});

export type Group = z.infer<typeof Group>;

export type NewGroup = Omit<Group, keyof Timestamps>;
