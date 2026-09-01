import { createMiddleware } from 'hono/factory';

import { auth } from '#lib/auth.ts';
import { HttpError } from '#utils/errors.ts';

type Env = {
	Variables: {
		auth: typeof auth.$Infer.Session;
	};
};

export const requireAuth = createMiddleware<Env>(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (session == null) throw new HttpError(401);

	c.set('auth', session);

	await next();
});
