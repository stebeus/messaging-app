import * as pg from 'drizzle-orm/pg-core';

export const id = pg.integer().primaryKey().generatedAlwaysAsIdentity();

export const createdAt = pg.timestamp().defaultNow().notNull();

export const updatedAt = pg
	.timestamp()
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());

export const timestamps = { createdAt, updatedAt } as const;

export const base = { ...timestamps, id } as const;

export const reference = <Column extends pg.AnyPgColumn>(
	column: () => Column,
	options?: pg.ReferenceConfig['config'],
) => pg.integer().references(column, options);
