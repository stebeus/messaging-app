import type { db } from './client.ts';

type TransactionHandler = Parameters<typeof db.transaction>[0];

type Transaction = Parameters<TransactionHandler>[0];

type DatabaseClient = typeof db | Transaction;

export type DatabaseContext<Context> = Context & {
	client?: DatabaseClient;
};
