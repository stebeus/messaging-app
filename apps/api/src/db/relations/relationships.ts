import { defineRelationsPart } from 'drizzle-orm';

import { friendRequests, friendships, users } from '#db/schemas/index.ts';

export const relationshipRelations = defineRelationsPart(
	{ users, friendRequests, friendships },
	(r) => ({
		friendRequests: {
			requester: r.one.users({
				from: r.friendRequests.requesterId,
				to: r.users.id,
			}),
			recipient: r.one.users({
				from: r.friendRequests.recipientId,
				to: r.users.id,
			}),
		},
		friendships: {
			user1: r.one.users({
				from: r.friendships.user1Id,
				to: r.users.id,
			}),
			user2: r.one.users({
				from: r.friendships.user2Id,
				to: r.users.id,
			}),
		},
	}),
);
