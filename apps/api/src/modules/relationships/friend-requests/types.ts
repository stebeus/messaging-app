import type { FriendRequest } from '@repo/contracts/friend-requests';
import type { Selection } from '#db/types.ts';

export type FriendRequestParameters = Pick<FriendRequest, 'requesterId' | 'recipientId'>;

export type FriendRequestSelection = Selection<FriendRequest>;
