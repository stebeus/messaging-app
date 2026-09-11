import type { Friendship } from '@repo/contracts/relationships/friendships';
import type { AsyncReturnType } from 'type-fest';
import type { Selection } from '#db/types.ts';
import type { friendshipRepository } from './repository.ts';

export type FriendshipSelection = Selection<Friendship>;

export type FriendshipSelectionResult = Partial<
	AsyncReturnType<typeof friendshipRepository.findOne>
>;
