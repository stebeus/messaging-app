import { snakeCase } from 'drizzle-orm/pg-core';

import { Group, visibilities } from '@repo/contracts/conversations/groups';

import { reference, timestamps, users } from '#db/index.ts';
import { conversations } from '#routes/conversations/schema.ts';

const { visibility } = Group.shape;

export const groups = snakeCase.table('groups', (t) => ({
	...timestamps,
	conversationId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	ownerId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
	name: t.text().notNull(),
	description: t.text(),
	avatar: t.text(),
	visibility: t.text({ enum: visibilities }).default(visibility.def.defaultValue).notNull(),
}));
