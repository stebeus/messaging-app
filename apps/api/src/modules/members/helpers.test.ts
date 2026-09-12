import { describe, expect, it } from 'vitest';

import { createMember } from '#test/factories.ts';

import { canManage, canManageMember } from './helpers.ts';

const member = createMember();
const admin = createMember({ userId: '2', role: 'admin' });
const owner = createMember({ userId: '3', role: 'owner' });

describe('canManage', () => {
	it('confirms that members are unauthorized', () => {
		expect(canManage(member)).toBeFalsy();
	});

	it('confirms that admins are authorized', () => {
		expect(canManage(admin)).toBeTruthy();
	});

	it('confirms that owners are authorized', () => {
		expect(canManage(owner)).toBeTruthy();
	});
});

describe('canManageMember', () => {
	it('confirms that inferior roles cannot manage superior roles', () => {
		expect(canManageMember(member, admin)).toBeFalsy();
	});

	it('confirms that equal roles cannot manage themselves', () => {
		expect(canManageMember(admin, admin)).toBeFalsy();
	});

	it('confirms that superior roles can manage inferior roles', () => {
		expect(canManageMember(owner, admin)).toBeTruthy();
	});
});
