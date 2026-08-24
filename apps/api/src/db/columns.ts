import { integer, timestamp } from 'drizzle-orm/pg-core';

export const id = integer().primaryKey().generatedByDefaultAsIdentity();

export const timestamps = {
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
};
