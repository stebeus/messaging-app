import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';
import { userRelations } from '#routes/users/relations.ts';

import { relations } from './relations.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
	relations: { ...relations, ...userRelations },
});
