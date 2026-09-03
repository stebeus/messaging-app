import { defineRelationsPart } from 'drizzle-orm';

import { accounts, friendships, groups, sessions, users } from '#db/schema/index.ts';

export const userRelations = defineRelationsPart(
	{ users, sessions, accounts, friendships, groups },
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
			friendships: r.many.friendships({
				from: r.users.id,
				to: r.friendships.user1Id,
			}),
			groups: r.many.groups({
				from: r.users.id,
				to: r.groups.ownerId,
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
		friendships: {
			users: r.many.users({
				from: r.friendships.user2Id,
				to: r.users.id,
			}),
		},
	}),
);
