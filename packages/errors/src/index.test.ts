import { describe, expect, it } from 'vitest';

import { catchError } from './index.js';

describe('catchError', () => {
	describe.for`
		case         | value               | expected
		${'numbers'} | ${0}                | ${'0'}
		${'strings'} | ${'string'}         | ${'"string"'}
		${'bigints'} | ${1n}               | ${'[Non-serializable value]'}
		${'objects'} | ${{ key: 'value' }} | ${'{\n\t"key": "value"\n}'}
	`('Given $case', ({ value, expected }) => {
		it('creates errors for them', () => {
			const caught = catchError(value);
			expect(caught).toBeInstanceOf(Error);
		});

		it('describes them as unexpected throws', () => {
			const { message } = catchError(value);
			expect(message).toBe(`Unexpected throw: ${expected}`);
		});
	});

	it('preserves errors', () => {
		// Arrange
		const error = new Error();

		// Act
		const caught = catchError(error);

		// Assert
		expect(caught).toBe(error);
	});
});
