import * as z from 'zod';

import { id } from '#shared/entities.js';

export const FriendParameters = z.object({
	friendId: id,
});

export type FriendParameters = z.infer<typeof FriendParameters>;
