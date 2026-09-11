import type { Relationship } from '@repo/contracts/relationships';
import type { FriendshipSelectionResult } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { friendships, parseId } from '#db/index.ts';

export const isFriendship = ({ user1Id, user2Id }: Relationship) =>
	and(eq(friendships.user1Id, user1Id), eq(friendships.user2Id, user2Id));

export const mergeFriend = ({ user1, user2, ...friendship }: FriendshipSelectionResult = {}) =>
	({ ...friendship, friend: user1 ?? user2 }) as const;

export const orderFriendshipIds = (params: Relationship) => {
	const [user1Id, user2Id] = Object.values(params).map(parseId) as [number, number];

	const minId = Math.min(user1Id, user2Id).toString();
	const maxId = Math.max(user1Id, user2Id).toString();

	return { user1Id: minId, user2Id: maxId } as const;
};
