import type { db } from './client.ts';

type Database = typeof db;

type TransactionHandler = Parameters<Database['transaction']>[0];

type Transaction = Parameters<TransactionHandler>[0];

export type DatabaseClient = Database | Transaction;
