import * as z from 'zod';

import { id, Timestamps, timestamps } from '#shared/fields.js';

export const statuses = ['pending', 'accepted'] as const;

export const Friendship = z.object({
	...Timestamps.shape,
	userAId: id,
	userBId: id,
	status: z.enum(statuses).default('pending'),
});

export const NewFriendship = Friendship.omit(timestamps);

export const FriendshipUpdate = Friendship.omit(timestamps).partial({ status: true });

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = z.infer<typeof NewFriendship>;

export type FriendshipUpdate = z.infer<typeof FriendshipUpdate>;
