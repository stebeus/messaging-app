import * as z from 'zod';

import { id } from '#shared/entities.js';

export const FriendRequestParams = z.object({
	recipientId: id,
});

export const AcceptFriendRequestParams = z.object({
	requesterId: id,
});

export type FriendRequestParams = z.infer<typeof FriendRequestParams>;

export type AcceptFriendRequestParams = z.infer<typeof AcceptFriendRequestParams>;
