import type { Friendship } from '@repo/contracts/friendships';
import type { Selection } from '#db/types.ts';
import type { UsersSelection } from '#modules/users/types.ts';
import type * as friendshipRepository from './repository.ts';

export type FriendshipParameters = Pick<Friendship, 'user1Id' | 'user2Id'>;

export type FriendshipsSelection = FriendshipParameters & UsersSelection;

export type FriendshipSelection = Selection<Friendship>;

export type FriendshipSelectionResult = Partial<
	Awaited<ReturnType<typeof friendshipRepository.findOne>>
>;
