import type { RelationsFieldFilter } from 'drizzle-orm';
import type { db } from './client.ts';

type Database = typeof db;

type TransactionHandler = Parameters<Database['transaction']>[0];

type Transaction = Parameters<TransactionHandler>[0];

type DatabaseClient = Database | Transaction;

export type DatabaseContext<Context> = Context & {
	tx?: DatabaseClient;
};

type SelectionFilter<Value> = RelationsFieldFilter<NonNullable<Value>>;

export type Selection<Entity> = {
	readonly [Key in keyof Entity]?: SelectionFilter<Entity[Key]>;
};
