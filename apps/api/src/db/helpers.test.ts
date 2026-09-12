import { describe, expect, it } from 'vitest';

import { contains, orderBy, parseId } from './helpers.ts';

describe('contains', () => {
	it('creates nothing when given no data', () => {
		expect(contains()).toBeUndefined();
	});

	it('creates a search query when given data', () => {
		expect(contains('query')).toStrictEqual({ like: '%query%' });
	});
});

describe('orderBy', () => {
	describe('Given no inputs', () => {
		const expected = { orderBy: { createdAt: 'asc' } } as const;

		it('sorts by creation date', () => {
			expect(orderBy()).toStrictEqual(expected);
		});

		it('uses ascending order', () => {
			expect(orderBy()).toStrictEqual(expected);
		});
	});

	describe('Given inputs', () => {
		it('sorts by field', () => {
			expect(orderBy('name')).toStrictEqual({ orderBy: { name: 'asc' } });
		});

		it('uses a custom order', () => {
			expect(orderBy('name', 'desc')).toStrictEqual({ orderBy: { name: 'desc' } });
		});
	});
});

describe('parseId', () => {
	it('throws errors for invalid IDs', () => {
		expect(() => parseId('text')).toThrow();
	});

	it('converts IDs to integers', () => {
		expect(parseId('1,7')).toBe(1);
	});
});
