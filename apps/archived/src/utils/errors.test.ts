import { describe, expect, it } from 'vitest';

import { HttpError } from './errors.ts';

describe('HttpError.isHttpError', () => {
	it('confirms that it is not an HTTP error', () => {
		const error = new Error();
		expect(HttpError.isHttpError(error)).toBeFalsy();
	});

	it('confirms that it is an HTTP error', () => {
		const error = new HttpError();
		expect(HttpError.isHttpError(error)).toBeTruthy();
	});
});
