import * as z from 'zod';

import { createdAt, id } from '#shared/entities.js';

export const Friendship = z.object({
	user1Id: id,
	user2Id: id,
	createdAt,
});

export const NewFriendship = Friendship.omit({ createdAt: true });

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = z.input<typeof NewFriendship>;
