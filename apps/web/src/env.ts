import * as z from 'zod';

import { createEnv } from '@repo/env';

export const env = createEnv(import.meta.env, {
	VITE_APP_NAME: z.string(),
	VITE_API_URL: z.url(),
});
