import { snakeCase } from 'drizzle-orm/pg-core';
import * as z from 'zod';

import { id, type Timestamps, timestamps } from '#db/columns.ts';
import { users } from '#routes/auth/schema.ts';
export const messages = snakeCase.table('messages', (t) => ({
	id,
	content: t.text().notNull(),
	...timestamps,
	userId: t
		.integer()
		.notNull()
		.references(() => users.id),
}));

export const messageParamSchema = z.object({
	id: z.coerce.number(),
});

export const messageSchema = z.object({
	content: z.string(),
});

export type Message = typeof messages.$inferSelect;

export type NewMessage = typeof messages.$inferInsert;

export type MessageUpdate = Omit<Message, Timestamps | 'userId'>;
