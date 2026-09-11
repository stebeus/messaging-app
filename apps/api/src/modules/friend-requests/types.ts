import type { FriendRequest } from '@repo/contracts/friend-requests';
import type { AsyncReturnType } from 'type-fest';
import type { Selection } from '#db/types.ts';
import type { friendRequestRepository } from './repository.ts';

export type FriendRequestSelection = Selection<FriendRequest>;

export type FriendRequestSelectionResult = Partial<
	AsyncReturnType<typeof friendRequestRepository.findOne>
>;

export type FriendRequestArgs = Pick<FriendRequest, 'requesterId' | 'recipientId'>;
