import type { Friendship } from '@repo/contracts/friendships';
import type { Selection } from '#db/types.ts';
import type { friendshipRepository } from './repository.ts';

export type FriendshipParameters = Pick<Friendship, 'user1Id' | 'user2Id'>;

export type FriendshipSelection = Selection<Friendship>;

export type FriendshipSelectionResult = Partial<
	Awaited<ReturnType<typeof friendshipRepository.findOne>>
>;
