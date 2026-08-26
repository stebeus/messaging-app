import { snakeCase } from 'drizzle-orm/pg-core';

import { base, reference } from '#db/columns.ts';
import { conversations } from '#routes/conversations/schema.ts';
import { users } from '#routes/users/schema.ts';

export const messages = snakeCase.table('messages', (t) => ({
	...base,
	content: t.text().notNull(),
	senderId: reference(() => users.id, { onDelete: 'set null' }),
	conversationId: reference(() => conversations.id, { onDelete: 'cascade' }).notNull(),
}));
