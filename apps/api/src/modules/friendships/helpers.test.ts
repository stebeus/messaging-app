import type { User } from '@repo/contracts/users';

import { describe, expect, it } from 'vitest';

import { createTimestamps, createUser } from '#utils/test.ts';

import { mergeFriend, orderFriendshipIds } from './helpers.ts';

describe('mergeFriend', () => {
	const { createdAt } = createTimestamps();

	const createFriendship = (user1?: User, user2?: User) =>
		({ user1Id: '1', user2Id: '2', createdAt, user1, user2 }) as const;

	const createExpectedMerge = (id: string) =>
		({ user1Id: '1', user2Id: '2', createdAt, friend: createUser({ id }) }) as const;

	it('merges user 1 as a friend when user 2 is empty', () => {
		// Arrange
		const id = '1';
		const friendship = createFriendship(createUser({ id }));
		const expected = createExpectedMerge(id);

		// Act
		const merged = mergeFriend(friendship);

		// Assert
		expect(merged).toStrictEqual(expected);
	});

	it('merges user 2 as a friend when user 1 is empty', () => {
		// Arrange
		const id = '2';
		const friendship = createFriendship(undefined, createUser({ id }));
		const expected = createExpectedMerge(id);

		// Act
		const merged = mergeFriend(friendship);

		// Assert
		expect(merged).toStrictEqual(expected);
	});
});

describe('orderFriendshipIds', () => {
	it('preserves ordered IDs ', () => {
		// Arrange
		const friendshipId = { user1Id: '1', user2Id: '2' } as const;

		//  Act
		const orderedFriendshipId = orderFriendshipIds(friendshipId);

		// Assert
		expect(orderedFriendshipId).toStrictEqual({ user1Id: '1', user2Id: '2' });
	});

	it('sorts IDs in ascending order', () => {
		// Arrange
		const friendshipId = { user1Id: '2', user2Id: '1' } as const;

		//  Act
		const orderedFriendshipId = orderFriendshipIds(friendshipId);

		// Assert
		expect(orderedFriendshipId).toStrictEqual({ user1Id: '1', user2Id: '2' });
	});
});
