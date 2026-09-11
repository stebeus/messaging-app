import type { FriendRequest } from '@repo/contracts/friend-requests';
import type { Selection } from '#db/types.ts';

export type FriendRequestSelection = Selection<FriendRequest>;

export type FriendRequestArgs = Pick<FriendRequest, 'requesterId' | 'recipientId'>;
