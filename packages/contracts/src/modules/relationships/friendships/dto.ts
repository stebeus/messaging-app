import * as z from 'zod';

import { id } from '#shared/entities.js';

export const FriendParams = z.object({
	friendId: id,
});

export type FriendParams = z.infer<typeof FriendParams>;
