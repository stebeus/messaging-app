import { defineConfig } from 'drizzle-kit';

import { env } from './src/env.ts';

// https://orm.drizzle.team/docs/drizzle-config-file
export default defineConfig({
	dialect: 'postgresql',
	schema: './src/**/schema.ts',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
