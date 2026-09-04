import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { STATUS_CODES } from 'node:http';

import { HTTPException } from 'hono/http-exception';

type HttpErrorOptions = Partial<{
	res: Response;
	message: string;
	cause: unknown;
}>;

type NotFoundErrorOptions = Omit<HttpErrorOptions, 'message'> & {
	resource?: string;
};

export class HttpError extends HTTPException {
	static isHttpError(value: unknown) {
		return value instanceof HTTPException;
	}

	readonly message;
	readonly cause;

	constructor(
		status: ContentfulStatusCode = 500,
		{ res, message = STATUS_CODES[status], cause }: HttpErrorOptions = {},
	) {
		super(status, { res, message, cause });
		this.message = message ?? 'Internal Server Error';
		this.cause = cause;
	}
}

export class UnauthorizedError extends HttpError {
	constructor(options?: HttpErrorOptions) {
		super(401, options);
	}
}

export class ForbiddenError extends HttpError {
	constructor(options?: HttpErrorOptions) {
		super(403, options);
	}
}

export class NotFoundError extends HttpError {
	constructor({ resource, ...options }: NotFoundErrorOptions = {}) {
		super(404, { message: `${resource} Not Found`, ...options });
	}
}
