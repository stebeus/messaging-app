import { ne } from 'drizzle-orm';
import { check, snakeCase, unique } from 'drizzle-orm/pg-core';

import { Friendship, statuses } from '@repo/contracts/friendships';

import { users } from './auth.ts';
import { reference, timestamps } from './helpers.ts';

const { status } = Friendship.shape;

export const friendships = snakeCase.table(
	'friendships',
	(t) => ({
		...timestamps,
		user1Id: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		user2Id: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		status: t.text({ enum: statuses }).default(status.def.defaultValue).notNull(),
	}),
	(t) => [check('no_self_friendship', ne(t.user1Id, t.user2Id)), unique().on(t.user1Id, t.user2Id)],
);
