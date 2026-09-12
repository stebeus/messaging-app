import { describe, expect, it } from 'vitest';

import { containsName, createUserFilter } from './helpers.ts';

describe('containsName', () => {
	it('creates nothing when given no name', () => {
		expect(containsName()).toBeUndefined();
	});

	it('creates a search query when given a name', () => {
		expect(containsName('John Doe')).toStrictEqual({
			OR: [{ username: { like: '%John Doe%' } }, { displayName: { like: '%John Doe%' } }],
		});
	});
});

describe('createUserFilter', () => {
	it('creates a filter for excluding the current user', () => {
		expect(createUserFilter('1')).toStrictEqual({ where: { NOT: { id: '1' } } });
	});
});
