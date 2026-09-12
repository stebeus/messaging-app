import type { Role } from '@repo/contracts/members';

import { describe, expect, it } from 'vitest';

import { canManage, canManageMember } from './helpers.ts';

const createMember = (userId: number, role: Role) =>
	({
		userId: userId.toString(),
		conversationId: '1',
		role,
		createdAt: new Date(),
		updatedAt: new Date(),
	}) as const;

const member = createMember(1, 'member');
const admin = createMember(2, 'admin');
const owner = createMember(3, 'owner');

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
