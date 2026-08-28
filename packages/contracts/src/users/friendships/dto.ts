import z from 'zod';

import { UserParams } from '#users/dto.js';
import { id } from '#utils.js';

export const FriendshipParams = z.object({
	...UserParams.shape,
	friendId: id,
});

export type FriendshipParams = z.infer<typeof FriendshipParams>;
