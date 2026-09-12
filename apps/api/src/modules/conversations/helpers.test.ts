import { describe, expect, it } from 'vitest';

import { memberOf } from './helpers.ts';

describe('memberOf', () => {
	it('creates a conversation member filter', () => {
		expect(memberOf('1')).toStrictEqual({ members: { userId: '1' } });
	});
});
