import { snakeCase } from 'drizzle-orm/pg-core';

import { Group, privacies } from '@repo/contracts/conversations/groups';

import { reference, timestamps } from '#db/columns.ts';
import { conversations } from '#routes/conversations/schema.ts';
import { users } from '#routes/users/schema.ts';

const { privacy } = Group.shape;

export const groups = snakeCase.table('groups', (t) => ({
	...timestamps,
	conversationId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
	ownerId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	name: t.text().notNull(),
	description: t.text(),
	image: t.text(),
	privacy: t.text({ enum: privacies }).default(privacy.def.defaultValue).notNull(),
}));
