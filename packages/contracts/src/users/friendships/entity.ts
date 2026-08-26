import * as z from 'zod';

import { createdAt, id } from '#utils.js';

export const Friendship = z.object({
	userId: id,
	friendId: id,
	createdAt,
});

export const NewFriendship = Friendship.omit({ createdAt: true });

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = z.infer<typeof NewFriendship>;
