import * as z from 'zod';

import { User } from '#modules/users/entity.js';
import { id } from '#shared/entities.js';

import { Friendship } from './entity.js';

export const FriendParams = z.object({
	friendId: id,
});

export const FriendResponse = z.object({
	...Friendship.shape,
	friend: User,
});

export const ListFriendResponse = z.array(FriendResponse);

export type FriendParams = z.infer<typeof FriendParams>;

export type FriendResponse = z.infer<typeof FriendResponse>;

export type ListFriendResponse = z.infer<typeof ListFriendResponse>;
