import { describe, expect, it } from 'vitest';

import { toTitleCase } from '#utils/formatters.ts';

describe('toTitleCase', () => {
	it('title cases strings', () => {
		expect(toTitleCase('hello, world!')).toBe('Hello, World!');
	});
});
