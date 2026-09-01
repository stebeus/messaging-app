import { snakeCase } from 'drizzle-orm/pg-core';

import { base, reference, users } from '#db/index.ts';
import { conversations } from '#routes/conversations/schema.ts';

export const messages = snakeCase.table('messages', (t) => ({
	...base,
	senderId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	conversationId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
	content: t.text().notNull(),
}));
