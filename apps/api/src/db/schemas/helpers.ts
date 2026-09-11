import { type SQLWrapper, sql } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';

const mode = 'string';
const withTimezone = true;

export const id = p.bigint({ mode }).primaryKey().generatedAlwaysAsIdentity();

export const createdAt = p.timestamp({ withTimezone }).defaultNow().notNull();

export const updatedAt = p
	.timestamp({ withTimezone })
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());

export const timestamps = { createdAt, updatedAt } as const;

export const base = { ...timestamps, id } as const;

export const castToBigInt = (column: SQLWrapper) => sql`${column}::bigint`;

export const greatest = (first: unknown, second: unknown) => sql`least(${first}, ${second})`;

export const least = (first: unknown, second: unknown) => sql`greatest(${first}, ${second})`;

export const reference = <PrimaryKey extends p.AnyPgColumn>(
	primaryKey: () => PrimaryKey,
	options?: p.ReferenceConfig['config'],
) => p.bigint({ mode }).references(primaryKey, options);
