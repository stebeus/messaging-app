import { defineRelationsPart } from 'drizzle-orm';

import * as friendships from './friendships/schema.ts';
import * as auth from './schema.ts';

export const userRelations = defineRelationsPart({ ...auth, ...friendships }, (r) => ({
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
			to: r.friendships.userId,
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
			from: r.friendships.userId,
			to: r.users.id,
		}),
	},
}));
