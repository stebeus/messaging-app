import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuth } from 'better-auth/minimal';
import { username } from 'better-auth/plugins';

import { db } from '#db/client.ts';
import * as schema from '#routes/users/schema.ts';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema,
		schemaName: 'auth',
		usePlural: true,
	}),
	plugins: [username()],
	advanced: {
		database: {
			generateId: 'serial',
		},
	},
	emailAndPassword: {
		enabled: true,
	},
});
