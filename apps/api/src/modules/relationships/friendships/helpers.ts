import type { Id } from '@repo/contracts/shared';
import type { FriendshipParameters, FriendshipSelectionResult } from './types.ts';

import { and, eq } from 'drizzle-orm';

import { friendships } from '#db/index.ts';

const toInteger = (id: Id) => {
	const parsedId = Number.parseInt(id, 10);
	if (Number.isNaN(parsedId)) throw new Error('Parsed ID is not a number');
	return parsedId;
};

export const isFriendship = ({ user1Id, user2Id }: FriendshipParameters) =>
	and(eq(friendships.user1Id, user1Id), eq(friendships.user2Id, user2Id));

export const mergeFriend = ({ user1, user2, ...friendship }: FriendshipSelectionResult = {}) =>
	({ ...friendship, friend: user1 ?? user2 }) as const;

export const orderFriendshipIds = (params: FriendshipParameters) => {
	const [user1Id, user2Id] = Object.values(params).map(toInteger) as [number, number];

	const minId = Math.min(user1Id, user2Id).toString();
	const maxId = Math.max(user1Id, user2Id).toString();

	return { user1Id: minId, user2Id: maxId } as const;
};
