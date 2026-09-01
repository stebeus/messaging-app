import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';

import { relations } from './relations.ts';
import { authRelations } from './schemas/auth/schema.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
	relations: { ...relations, ...authRelations },
});
