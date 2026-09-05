import type { Timestamps } from '@repo/contracts/shared';
import type { RelationsFieldFilter } from 'drizzle-orm';
import type { db } from './client.ts';

type Database = typeof db;

type TransactionHandler = Parameters<Database['transaction']>[0];

type Transaction = Parameters<TransactionHandler>[0];

type DatabaseClient = Database | Transaction;

export type DatabaseContext<Context> = Context & {
	tx?: DatabaseClient;
};

type TimestampFilters = Record<keyof Timestamps, RelationsFieldFilter<Date>>;

export type Selection<Entity> = Partial<Omit<Entity, keyof Timestamps> & TimestampFilters>;
