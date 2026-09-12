import { describe, expect, it } from 'vitest';

import { mergeFriend, orderFriendshipIds } from './helpers.ts';

describe('mergeFriend', () => {
	const date = new Date();

	const createUser = (id: number) =>
		({
			id: id.toString(),
			name: 'John Doe',
			username: 'john_doe',
			displayName: null,
			email: 'john_doe@email.com',
			emailIsVerified: false,
			avatar: null,
			createdAt: date,
			updatedAt: date,
		}) as const;

	const createExpectedMerge = (id: number) =>
		({ user1Id: '1', user2Id: '2', createdAt: date, friend: createUser(id) }) as const;

	it('merges user 1 as a friend when user 2 is empty', () => {
		// Arrange
		const friendship = {
			user1Id: '1',
			user2Id: '2',
			createdAt: date,
			user1: createUser(1),
			user2: undefined,
		} as const;

		const expected = createExpectedMerge(1);

		// Act
		const merged = mergeFriend(friendship);

		// Assert
		expect(merged).toStrictEqual(expected);
	});

	it('merges user 2 as a friend when user 1 is empty', () => {
		// Arrange
		const friendship = {
			user1Id: '1',
			user2Id: '2',
			createdAt: date,
			user1: undefined,
			user2: createUser(2),
		} as const;

		const expected = createExpectedMerge(2);

		// Act
		const merged = mergeFriend(friendship);

		// Assert
		expect(merged).toStrictEqual(expected);
	});
});

describe('orderFriendshipIds', () => {
	it('preserves ordered IDs ', () => {
		const friendshipId = { user1Id: '1', user2Id: '2' } as const;
		expect(orderFriendshipIds(friendshipId)).toStrictEqual({ user1Id: '1', user2Id: '2' });
	});

	it('sorts IDs in ascending order', () => {
		const friendshipId = { user1Id: '2', user2Id: '1' } as const;
		expect(orderFriendshipIds(friendshipId)).toStrictEqual({ user1Id: '1', user2Id: '2' });
	});
});
