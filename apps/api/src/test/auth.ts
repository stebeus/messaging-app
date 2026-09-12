import type { User } from '@repo/contracts/users';

import { betterAuth } from 'better-auth/minimal';
import { type TestHelpers, testUtils } from 'better-auth/plugins';

import { testDb } from '#db/client.ts';
import { createAuthConfig, createUsernameConfig } from '#lib/auth.ts';

type AuthUser = Parameters<TestHelpers['createUser']>[0];

type UserOptions = Partial<AuthUser & Pick<User, 'username' | 'displayName'>>;

export const auth = betterAuth({
	...createAuthConfig(testDb),
	plugins: [createUsernameConfig(), testUtils()],
});

export const getAuthTestUtils = async () => {
	const { test } = await auth.$context;
	return test;
};

export const createAuthenticatedUser = async (options?: UserOptions) => {
	const test = await getAuthTestUtils();

	const user = test.createUser(options);

	const savedUser = await test.saveUser(user);
	const headers = await test.getAuthHeaders({ userId: savedUser.id });

	return { headers, user: savedUser } as const;
};
