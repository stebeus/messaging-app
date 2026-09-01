import { snakeCase } from 'drizzle-orm/pg-core';

import { Conversation, conversationTypes } from '@repo/contracts/conversations';

import { createdAt, id } from '#db/columns.ts';

const { type } = Conversation.shape;

export const conversations = snakeCase.table('conversations', (t) => ({
	id,
	type: t.text({ enum: conversationTypes }).default(type.def.defaultValue).notNull(),
	createdAt,
}));
