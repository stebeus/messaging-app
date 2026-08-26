import type { SQL } from 'drizzle-orm';
import type { PgInsertValue, PgTable, PgUpdateSetSource } from 'drizzle-orm/pg-core';

import { db } from './client.ts';

export const insert = async <Table extends PgTable>(table: Table, values: PgInsertValue<Table>) => {
	const [data] = await db.insert(table).values(values).returning();
	return data;
};

export const update = async <Table extends PgTable>(
	table: Table,
	values: PgUpdateSetSource<Table>,
	condition: SQL,
) => await db.update(table).set(values).where(condition).returning();

export const del = async <Table extends PgTable>(table: Table, condition: SQL) => {
	const [data] = await db.delete(table).where(condition).returning();
	return data;
};
