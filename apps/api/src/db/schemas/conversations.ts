import { snakeCase, unique } from 'drizzle-orm/pg-core';

import { Conversation, conversationTypes } from '@repo/contracts/conversations';
import { Group, visibilities } from '@repo/contracts/groups';
import { Member, roles } from '@repo/contracts/members';

import { users } from './auth.ts';
import { base, createdAt, id, reference, timestamps, updatedAt } from './helpers.ts';

const { type } = Conversation.shape;
const { visibility } = Group.shape;
const { role } = Member.shape;

export const conversations = snakeCase.table('conversations', (t) => ({
	id,
	type: t.text({ enum: conversationTypes }).default(type.def.defaultValue).notNull(),
	createdAt,
}));

export const groups = snakeCase.table('groups', (t) => ({
	...timestamps,
	conversationId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	ownerId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
	name: t.text().notNull(),
	description: t.text(),
	avatar: t.text(),
	visibility: t.text({ enum: visibilities }).default(visibility.def.defaultValue).notNull(),
}));

export const members = snakeCase.table(
	'conversation_members',
	(t) => ({
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		conversationId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
		role: t.text({ enum: roles }).default(role.def.defaultValue).notNull(),
		joinedAt: createdAt,
		updatedAt,
	}),
	(t) => [unique().on(t.userId, t.conversationId)],
);

export const messages = snakeCase.table('messages', (t) => ({
	...base,
	senderId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	conversationId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
	content: t.text().notNull(),
}));
