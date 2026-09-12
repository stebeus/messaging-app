import { describe, expect, it } from 'vitest';

import { createTimestamp, createUser } from '#test/factories.ts';

import { groupFriendRequests } from './helpers.ts';

describe('groupFriendRequests', () => {
	it('groups friend requests by direction', () => {
		// Arrange
		const user1 = createUser();
		const user2 = createUser({ id: '2' });
		const user3 = createUser({ id: '3' });

		const createdAt = createTimestamp();

		const friendRequests = [
			{ requesterId: user1.id, recipientId: user2.id, createdAt, recipient: user2 },
			{ requesterId: user3.id, recipientId: user1.id, createdAt, requester: user3 },
		];

		// Act
		const grouped = groupFriendRequests(friendRequests);

		// Assert
		expect(grouped).toStrictEqual({
			sent: [{ requesterId: '1', recipientId: '2', createdAt, user: user2 }],
			received: [{ requesterId: '3', recipientId: '1', createdAt, user: user3 }],
		});
	});
});
