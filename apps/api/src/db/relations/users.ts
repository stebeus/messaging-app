import { defineRelationsPart } from 'drizzle-orm';

import {
	accounts,
	bans,
	friendships,
	groups,
	members,
	sessions,
	users,
} from '#db/schemas/index.ts';

export const userRelations = defineRelationsPart(
	{ users, sessions, accounts, bans, friendships, groups, members },
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
			friendships: r.many.friendships({
				from: r.users.id,
				to: r.friendships.user1Id,
			}),
			groups: r.many.groups({
				from: r.users.id,
				to: r.groups.ownerId,
			}),
			members: r.many.members({
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
		friendships: {
			users: r.many.users({
				from: r.friendships.user2Id,
				to: r.users.id,
			}),
		},
	}),
);
