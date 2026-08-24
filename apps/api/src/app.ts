import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

import { env } from './env.ts';
import { routes } from './routes/index.ts';

export const app = new Hono();

app.use(logger());

app.use(cors({ origin: env.CLIENT_URL }));

app.route('/api/v1', routes);

app.notFound((c) => {
	const status = 404;
	return c.json({ error: { status, message: 'Not Found' } }, status);
});

app.onError((error, c) => {
	if (error instanceof HTTPException) return c.json({ error }, error.status);

	const status = 500;

	console.error(error);
	return c.json({ error: { status, message: 'Internal Server Error' } }, status);
});
