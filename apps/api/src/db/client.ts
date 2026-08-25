import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';
import { authRelations } from '#routes/auth/schema.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
	relations: { ...authRelations },
});
