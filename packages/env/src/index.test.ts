import { describe, expect, it } from 'vitest';
import * as z from 'zod';

import { createEnv } from './index.js';

const schema = {
	environment: z.string(),
	port: z.coerce.number(),
};

describe('createEnv', () => {
	describe('Given invalid environment variables', () => {
		it.for`
			case            | mockEnv
			${'empty'}      | ${undefined}
			${'incomplete'} | ${{ environment: 'test' }}
			${'incorrect'}  | ${{ environment: 'test', port: 'three thousand' }}
		`('throws when they are $case', ({ mockEnv }) => {
			expect(() => createEnv(mockEnv, schema)).toThrow();
		});
	});

	it('creates type-safe environment variables', () => {
		// Arrange
		const mockEnv = { environment: 'test', port: '3000' };

		// Act
		const env = createEnv(mockEnv, schema);

		// Assert
		expect(env).toStrictEqual({ environment: 'test', port: 3000 });
	});
});
