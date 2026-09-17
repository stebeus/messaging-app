import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { env } from '#env.ts';

export const authClient = createAuthClient({
	baseURL: env.VITE_API_URL,
	plugins: [usernameClient()],
});
