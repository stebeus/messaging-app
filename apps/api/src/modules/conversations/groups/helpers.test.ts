import { describe, expect, it } from 'vitest';

import { containsName, memberOfGroup } from './helpers.ts';

describe('containsName', () => {
	it('creates nothing when given no group name', () => {
		expect(containsName()).toBeUndefined();
	});

	it('creates a search query when given a group name', () => {
		expect(containsName('Group')).toStrictEqual({ name: { like: '%Group%' } });
	});
});

describe('memberOfGroup', () => {
	it('creates a group member filter', () => {
		expect(memberOfGroup('1')).toStrictEqual({ conversation: { members: { userId: '1' } } });
	});
});
