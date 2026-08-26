import * as z from 'zod';

import { createdAt, id } from '#utils.js';

export const Friendship = z.object({
	userId: id,
	friendId: id,
	createdAt,
});

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = Omit<Friendship, 'createdAt'>;
