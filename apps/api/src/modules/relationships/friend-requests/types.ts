import type { FriendRequest } from '@repo/contracts/friend-requests';
import type { Selection } from '#db/types.ts';
import type { QueryParameters } from '#types.ts';

export type FriendRequestParameters = Pick<FriendRequest, 'requesterId' | 'recipientId'>;

export type FriendRequestSelection = Selection<FriendRequest>;

export type FriendRequestsSelection = FriendRequestParameters & QueryParameters;
