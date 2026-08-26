import z from 'zod';

import { id } from '#utils.js';

export const FriendshipParams = z.object({
	friendId: id,
});

export type FriendshipParams = z.infer<typeof FriendshipParams>;
