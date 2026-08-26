import { integer, timestamp } from 'drizzle-orm/pg-core';

export const id = integer().primaryKey().generatedByDefaultAsIdentity();

export const createdAt = timestamp().defaultNow().notNull();

export const updatedAt = timestamp()
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());

export const timestamps = { createdAt, updatedAt };

export const base = { ...timestamps, id };
