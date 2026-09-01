import { ne } from 'drizzle-orm';
import { check, snakeCase, unique } from 'drizzle-orm/pg-core';

import { Friendship, statuses } from '@repo/contracts/users/friendships';

import { reference, timestamps, users } from '#db/index.ts';

const { status } = Friendship.shape;

export const friendships = snakeCase.table(
	'friendships',
	(t) => ({
		...timestamps,
		userAId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		userBId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		status: t.text({ enum: statuses }).default(status.def.defaultValue).notNull(),
	}),
	(t) => [check('not_self_friend', ne(t.userAId, t.userBId)), unique().on(t.userAId, t.userBId)],
);
