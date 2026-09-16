import { describe, expect, it } from 'vitest';

import { toCamelCase, toKebabCase } from '#utils/formatters.ts';

describe('toCamelCase', () => {
	it('camel cases strings', () => {
		expect(toCamelCase('Hello, $W0rl_-d! !')).toBe('helloW0rlD');
	});
});

describe('toKebabCase', () => {
	it('kebab cases strings', () => {
		expect(toKebabCase('Hello, $W0rl_-d! !')).toBe('hello-w0rl-d');
	});
});
