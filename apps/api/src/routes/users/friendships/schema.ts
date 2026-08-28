import { ne } from 'drizzle-orm';
import { check, snakeCase, unique } from 'drizzle-orm/pg-core';

import { createdAt, reference } from '#db/columns.ts';
import { users } from '#routes/users/schema.ts';

export const friendships = snakeCase.table(
	'friendships',
	{
		userId: reference(() => users.id, { onDelete: 'set null' }),
		friendId: reference(() => users.id, { onDelete: 'set null' }),
		createdAt,
	},
	({ userId, friendId }) => [
		check('user_not_friend', ne(userId, friendId)),
		unique().on(userId, friendId),
	],
);
