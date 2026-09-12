import { betterAuth } from 'better-auth/minimal';
import { type TestHelpers, testUtils } from 'better-auth/plugins';

import { testDb } from '#db/client.ts';
import { createAuthConfig } from '#lib/auth.ts';

import { user } from './constants.ts';
import { generateUniqueString } from './utils.ts';

type UserOptions = Parameters<TestHelpers['createUser']>[0];

export const auth = betterAuth({
	...createAuthConfig(testDb),
	plugins: [testUtils()],
});

export const getAuthTestUtils = async () => {
	const { test } = await auth.$context;
	return test;
};

export const createAuthenticatedUser = async ({
	name = user.name,
	email = `${generateUniqueString(user.username)}@email.com`,
	emailVerified = user.emailIsVerified,
	image = user.avatar,
}: UserOptions = {}) => {
	const test = await getAuthTestUtils();

	const user = test.createUser({ name, email, emailVerified, image });

	const savedUser = await test.saveUser(user);
	const headers = await test.getAuthHeaders({ userId: savedUser.id });

	return { headers, user } as const;
};
