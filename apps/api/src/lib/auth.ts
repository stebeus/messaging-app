import { type DB, drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { type BetterAuthPlugin, betterAuth } from 'better-auth';
import { testUtils, username } from 'better-auth/plugins';

import { db } from '#db/index.ts';
import * as schema from '#db/schemas/auth.ts';

type AuthOptions = Partial<{
	database: DB;
	plugins: BetterAuthPlugin[];
}>;

const createAuth = ({ database = db, plugins = [] }: AuthOptions = {}) =>
	betterAuth({
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
		plugins: [
			...plugins,
			username({
				schema: {
					user: {
						fields: {
							displayUsername: 'displayName',
						},
					},
				},
			}),
		],
		user: {
			fields: {
				emailVerified: 'emailIsVerified',
				image: 'avatar',
			},
		},
	});

export const auth = createAuth();

export const testAuth = createAuth({ plugins: [testUtils()] });
