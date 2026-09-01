import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';

import { relations, userRelations } from './relations/index.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
	relations: { ...relations, ...userRelations },
});
