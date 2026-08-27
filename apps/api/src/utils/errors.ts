import type { IntClosedRange } from 'type-fest';

import { STATUS_CODES } from 'node:http';

type Status = IntClosedRange<400, 599>;

type HttpErrorOptions = Partial<{
	message: string;
	cause: unknown;
}>;

export class HttpError extends Error {
	static isHttpError(value: unknown) {
		return value instanceof HttpError;
	}

	readonly status;
	readonly message;
	readonly cause;

	constructor(
		status: Status = 500,
		{ message = STATUS_CODES[status] ?? 'Internal Server Error', cause }: HttpErrorOptions = {},
	) {
		super(message, { cause });

		this.status = status;
		this.message = message;
		this.cause = cause;
	}
}
