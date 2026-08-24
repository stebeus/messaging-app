import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuth } from 'better-auth/minimal';

import { db } from '#db/client.ts';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		usePlural: true,
	}),
	advanced: {
		database: {
			generateId: 'serial',
		},
	},
	emailAndPassword: {
		enabled: true,
	},
});
