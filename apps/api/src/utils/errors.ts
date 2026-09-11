import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { STATUS_CODES } from 'node:http';

import { HTTPException } from 'hono/http-exception';

import { toTitleCase } from './formatters.ts';

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
		this.message = toTitleCase(message ?? 'internal server error');
		this.cause = cause;
	}
}

export class BadRequestError extends HttpError {
	constructor(options?: HttpErrorOptions) {
		super(400, options);
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
		const resourcePrefix = resource == null ? '' : `${resource} `;
		super(404, { message: `${resourcePrefix}not found`, ...options });
	}
}

export class ConflictError extends HttpError {
	constructor(options?: HttpErrorOptions) {
		super(409, options);
	}
}
