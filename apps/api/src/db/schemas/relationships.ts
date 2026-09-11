import { lt, ne } from 'drizzle-orm';
import { check, snakeCase, unique, uniqueIndex } from 'drizzle-orm/pg-core';

import { users } from './auth.ts';
import { castToBigInt, createdAt, greatest, least, reference } from './helpers.ts';

export const relationshipSchema = snakeCase.schema('relationship');

export const friendRequests = relationshipSchema.table(
	'friend_requests',
	{
		requesterId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		recipientId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		createdAt,
	},
	(t) => [
		check('no_self_friend_request', ne(t.requesterId, t.recipientId)),
		uniqueIndex('friend_request_idx').on(
			least(t.requesterId, t.recipientId),
			greatest(t.requesterId, t.recipientId),
		),
	],
);

export const friendships = relationshipSchema.table(
	'friendships',
	{
		user1Id: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		user2Id: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		createdAt,
	},
	(t) => [
		check('no_self_friendship', ne(t.user1Id, t.user2Id)),
		check('friend_order', lt(castToBigInt(t.user1Id), castToBigInt(t.user2Id))),
		unique().on(t.user1Id, t.user2Id),
	],
);
