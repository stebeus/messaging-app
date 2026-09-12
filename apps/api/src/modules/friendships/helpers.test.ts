import type { Id } from '@repo/contracts/shared';
import type { User } from '@repo/contracts/users';

import { describe, expect, it } from 'vitest';

import { createFriendship, createUser } from '#test/factories.ts';

import { mergeFriend, orderFriendshipIds } from './helpers.ts';

describe('mergeFriend', () => {
	const createFriendshipResult = (user1?: User, user2?: User) =>
		({ ...createFriendship(), user1, user2 }) as const;

	const createExpectedMerge = (id?: Id) =>
		({ ...createFriendship(), friend: createUser({ id }) }) as const;

	it('merges user 1 as a friend when user 2 is empty', () => {
		// Arrange
		const user = createUser({ id: '1' });

		const friendship = createFriendshipResult(user);
		const expected = createExpectedMerge(user.id);

		// Act
		const merged = mergeFriend(friendship);

		// Assert
		expect(merged).toStrictEqual(expected);
	});

	it('merges user 2 as a friend when user 1 is empty', () => {
		// Arrange
		const user = createUser({ id: '1' });

		const friendship = createFriendshipResult(undefined, user);
		const expected = createExpectedMerge(user.id);

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
