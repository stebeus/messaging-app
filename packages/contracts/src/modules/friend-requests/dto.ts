import * as z from 'zod';

import { id } from '#shared/entities.js';

export const AcceptFriendRequestParameters = z.object({
	requesterId: id,
});

export const SendFriendRequestParameters = z.object({
	recipientId: id,
});

export type AcceptFriendRequestParameters = z.infer<typeof AcceptFriendRequestParameters>;

export type SendFriendRequestParameters = z.infer<typeof SendFriendRequestParameters>;
