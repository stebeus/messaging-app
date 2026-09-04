import * as z from 'zod';

import { id } from '#helpers/entities.js';

export const FriendParameters = z.object({
	friendId: id,
});

export const SendFriendRequestParameters = z.object({
	recipientId: id,
});

export const AcceptFriendRequestParameters = z.object({
	senderId: id,
});

export type FriendParameters = z.infer<typeof FriendParameters>;

export type SendFriendRequestParameters = z.infer<typeof SendFriendRequestParameters>;

export type AcceptFriendRequestParameters = z.infer<typeof AcceptFriendRequestParameters>;
