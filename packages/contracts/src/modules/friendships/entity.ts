import * as z from 'zod';

import { id, Timestamps, timestamps } from '#helpers/entities.js';

export const statuses = ['pending', 'accepted'] as const;

export const Friendship = z.object({
	...Timestamps.shape,
	user1Id: id,
	user2Id: id,
	status: z.enum(statuses).default('pending').optional(),
});

export const NewFriendship = Friendship.omit(timestamps);

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = z.infer<typeof NewFriendship>;
