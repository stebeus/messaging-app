import type { ErrorRequestHandler, RequestHandler } from 'express';

import { HttpError } from '#utils/errors.ts';

export const handleNotFound: RequestHandler = (_req, _res, next) => next(new HttpError(404));

export const handleError: ErrorRequestHandler = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const httpError = HttpError.isHttpError(error) ? error : new HttpError();

	if (!HttpError.isHttpError(error)) req.log.error(error);

	return res.status(httpError.status).send({ error: httpError });
};
