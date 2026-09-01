import { snakeCase, unique } from 'drizzle-orm/pg-core';

import { Member, roles } from '@repo/contracts/conversations/members';

import { createdAt, reference, updatedAt, users } from '#db/index.ts';
import { conversations } from '#routes/conversations/schema.ts';

const { role } = Member.shape;

export const members = snakeCase.table(
	'conversation_members',
	(t) => ({
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		conversationId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
		roles: t.text({ enum: roles }).default(role.def.defaultValue).notNull(),
		joinedAt: createdAt,
		updatedAt,
	}),
	(t) => [unique().on(t.userId, t.conversationId)],
);
