import type { FriendRequestArgs } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { friendRequests } from '#db/index.ts';

export const isFriendRequest = ({ requesterId, recipientId }: FriendRequestArgs) =>
	and(eq(friendRequests.requesterId, requesterId), eq(friendRequests.recipientId, recipientId));
