import * as p from 'drizzle-orm/pg-core';

const mode = 'string';

export const id = p.bigint({ mode }).primaryKey().generatedAlwaysAsIdentity();

export const createdAt = p.timestamp().defaultNow().notNull();

export const updatedAt = p
	.timestamp()
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());

export const timestamps = { createdAt, updatedAt } as const;

export const base = { ...timestamps, id } as const;

export const reference = <Column extends p.AnyPgColumn>(
	column: () => Column,
	options?: p.ReferenceConfig['config'],
) => p.bigint({ mode }).references(column, options);
