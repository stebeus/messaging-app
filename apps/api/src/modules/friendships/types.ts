import type { Friendship } from '@repo/contracts/friendships';
import type { UserId } from '#modules/users/types.ts';

export type FriendshipParameters = Pick<Friendship, 'user1Id' | 'user2Id'>;

export type RawFriendshipParameters = {
	user1Id: UserId;
	user2Id: UserId;
};
