import { describe, expect, it } from 'vitest';

import { FetchError } from '#utils/fetch.ts';

describe('FetchError.isFetchError', () => {
	it('confirms that it is not a fetch error', () => {
		const error = new Error();
		expect(FetchError.isFetchError(error)).toBeFalsy();
	});

	it('confirms that it is a fetch error', () => {
		const error = new FetchError({ status: 500, message: 'Internal Server Error' });
		expect(FetchError.isFetchError(error)).toBeTruthy();
	});
});
