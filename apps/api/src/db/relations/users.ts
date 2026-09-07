import { defineRelationsPart } from 'drizzle-orm';

import {
	accounts,
	bans,
	friendRequests,
	friendships,
	groups,
	members,
	sessions,
	users,
} from '#db/schemas/index.ts';

export const userRelations = defineRelationsPart(
	{ users, sessions, accounts, bans, friendRequests, friendships, groups, members },
	(r) => ({
		users: {
			sessions: r.many.sessions({
				from: r.users.id,
				to: r.sessions.userId,
			}),
			accounts: r.many.accounts({
				from: r.users.id,
				to: r.accounts.userId,
			}),
			bans: r.many.bans({
				from: r.users.id,
				to: r.bans.userId,
			}),
			sentFriendRequests: r.many.friendRequests({
				from: r.users.id,
				to: r.friendRequests.requesterId,
			}),
			receivedFriendRequests: r.many.friendRequests({
				from: r.users.id,
				to: r.friendRequests.recipientId,
			}),
			user1Friends: r.many.friendships({
				from: r.users.id,
				to: r.friendships.user1Id,
			}),
			user2Friends: r.many.friendships({
				from: r.users.id,
				to: r.friendships.user2Id,
			}),
			groups: r.many.groups({
				from: r.users.id,
				to: r.groups.ownerId,
			}),
			memberships: r.many.members({
				from: r.users.id,
				to: r.members.userId,
			}),
		},
		sessions: {
			user: r.one.users({
				from: r.sessions.userId,
				to: r.users.id,
			}),
		},
		accounts: {
			user: r.one.users({
				from: r.accounts.userId,
				to: r.users.id,
			}),
		},
	}),
);
