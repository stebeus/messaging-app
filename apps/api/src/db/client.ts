import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
});
