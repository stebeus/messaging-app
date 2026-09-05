import type { Timestamps } from '@repo/contracts/shared';
import type { RelationsFieldFilter } from 'drizzle-orm';
import type { db } from './client.ts';

type Database = typeof db;

type TransactionHandler = Parameters<Database['transaction']>[0];

type Transaction = Parameters<TransactionHandler>[0];

export type DatabaseClient = Database | Transaction;

type TimestampFilters = Record<keyof Timestamps, RelationsFieldFilter<Date>>;

export type Selection<Entity> = Partial<Omit<Entity, keyof Timestamps> & TimestampFilters>;
