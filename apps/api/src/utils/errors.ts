import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { STATUS_CODES } from 'node:http';

import { HTTPException } from 'hono/http-exception';

type ApiErrorOptions = Partial<{
	res: Response;
	message: string;
	cause: unknown;
}>;

export class ApiError extends HTTPException {
	readonly message;
	readonly cause;

	constructor(
		status: ContentfulStatusCode = 500,
		{ res, message = STATUS_CODES[status] ?? '', cause }: ApiErrorOptions = {},
	) {
		super(status, { res });
		this.message = message;
		this.cause = cause;
	}
}
