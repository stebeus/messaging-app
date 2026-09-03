import { serve } from '@hono/node-server';

import { app } from './app.ts';
import { env } from './env.ts';

serve({ fetch: app.fetch, port: env.PORT }, ({ port }) =>
	console.log(`Server running on port ${port}`),
);
