import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { betterAuth } from 'better-auth/minimal';
import { username } from 'better-auth/plugins';

import { db } from '#db/client.ts';
import * as schema from '#db/schemas/auth.ts';

export const createAuthConfig = (database = db) =>
	({
		database: drizzleAdapter(database, {
			provider: 'pg',
			schema,
			schemaName: 'auth',
			usePlural: true,
		}),
		advanced: {
			database: {
				generateId: 'serial',
			},
		},
		emailAndPassword: {
			autoSignIn: true,
			enabled: true,
		},
		user: {
			fields: {
				emailVerified: 'emailIsVerified',
				image: 'avatar',
			},
		},
	}) as const;

export const createUsernameConfig = () =>
	username({ schema: { user: { fields: { displayUsername: 'displayName' } } } });

export const auth = betterAuth({
	...createAuthConfig(),
	plugins: [createUsernameConfig()],
});
