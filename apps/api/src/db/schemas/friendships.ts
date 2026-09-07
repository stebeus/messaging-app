import { ne } from 'drizzle-orm';
import { check, snakeCase, uniqueIndex } from 'drizzle-orm/pg-core';

import { users } from './auth.ts';
import { createdAt, greatest, least, reference } from './helpers.ts';

export const friendships = snakeCase.table(
	'friendships',
	{
		user1Id: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		user2Id: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		createdAt,
	},
	(t) => [
		check('no_self_friendship', ne(t.user1Id, t.user2Id)),
		uniqueIndex().on(least(t.user1Id, t.user2Id), greatest(t.user1Id, t.user2Id)),
	],
);
