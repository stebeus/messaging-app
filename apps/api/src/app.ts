import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { env } from './env.ts';
import { auth } from './lib/auth.ts';
import { routes } from './routes/index.ts';
import { HttpError, NotFoundError } from './utils/errors.ts';

export const app = new Hono().basePath('/api');

app.use(logger());

app.all('/auth/*', (c) => auth.handler(c.req.raw));

app.use(
	cors({
		origin: env.CLIENT_URL,
		allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
		credentials: true,
	}),
);

app.route('/v1', routes);

app.notFound((c) => {
	const error = new NotFoundError();
	return c.json({ error }, error.status);
});

app.onError((error, c) => {
	const httpError = HttpError.isHttpError(error) ? error : new HttpError();
	if (!HttpError.isHttpError(error)) console.error(error);
	return c.json({ error: httpError }, httpError.status);
});
