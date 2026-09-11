import type { FriendRequestArgs, FriendRequestSelectionResult } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { friendRequests } from '#db/index.ts';

export const isFriendRequest = ({ requesterId, recipientId }: FriendRequestArgs) =>
	and(eq(friendRequests.requesterId, requesterId), eq(friendRequests.recipientId, recipientId));

export const groupFriendRequests = (requests: FriendRequestSelectionResult[]) => {
	const filterSent = ({ requester }: FriendRequestSelectionResult = {}) => requester == null;

	const filterReceived = ({ recipient }: FriendRequestSelectionResult = {}) => recipient == null;

	const createSent = ({ requester, recipient, ...sent }: FriendRequestSelectionResult = {}) =>
		({ ...sent, user: recipient }) as const;

	const createReceived = ({ requester, recipient, ...sent }: FriendRequestSelectionResult = {}) =>
		({ ...sent, user: requester }) as const;

	const sent = requests.filter(filterSent).map(createSent);
	const received = requests.filter(filterReceived).map(createReceived);

	return { sent, received } as const;
};
