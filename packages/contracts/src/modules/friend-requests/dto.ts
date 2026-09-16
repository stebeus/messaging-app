import * as z from 'zod';

import { User } from '#modules/users/entity.js';
import { id } from '#shared/entities.js';

import { FriendRequest } from './entity.js';

export const FriendRequestParams = z.object({
	recipientId: id,
});

export const AcceptFriendRequestParams = z.object({
	requesterId: id,
});

export const FriendRequestResponse = z.object({
	...FriendRequest.shape,
	user: User,
});

export const ListFriendRequestResponse = z.object({
	sent: z.array(FriendRequestResponse),
	received: z.array(FriendRequestResponse),
});

export type FriendRequestParams = z.infer<typeof FriendRequestParams>;

export type AcceptFriendRequestParams = z.infer<typeof AcceptFriendRequestParams>;

export type FriendRequestResponse = z.infer<typeof FriendRequestResponse>;

export type ListFriendRequestResponse = z.infer<typeof ListFriendRequestResponse>;
