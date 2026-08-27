import type { RequestHandler } from 'express';

import { fromNodeHeaders } from 'better-auth/node';

import { auth } from '#lib/auth.ts';
import { HttpError } from '#utils/errors.ts';

export const authorize: RequestHandler = async (req, res, next) => {
	const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
	if (session == null) throw new HttpError(401);

	res.locals.auth = session;

	next();
};
