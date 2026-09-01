import type { SQL } from 'drizzle-orm';
import type { PgInsertValue, PgTable, PgUpdateSetSource } from 'drizzle-orm/pg-core';

import { db } from './client.ts';

export const insert = async <Table extends PgTable>(table: Table, values: PgInsertValue<Table>) =>
	await db.insert(table).values(values).returning();

export const update = async <Table extends PgTable>(
	table: Table,
	values: PgUpdateSetSource<Table>,
	condition: SQL,
) => (await db.update(table).set(values).where(condition).returning())[0];

export const del = async <Table extends PgTable>(table: Table, condition?: SQL) =>
	await db.delete(table).where(condition).returning();
