import type { GroupParameters } from '@repo/contracts/groups';
import type { Member } from '@repo/contracts/members';
import type { Id } from '@repo/contracts/shared';
import type { Selection } from '#db/types.ts';

export type MemberParameters = Pick<Member, 'userId' | 'conversationId'>;

export type MemberSelection = Selection<Member>;

export type ManagementParameters = GroupParameters & {
	actorId: Id;
};

export type MemberManagementParameters = ManagementParameters & {
	targetId: Id;
};

export type Role = Member['role'];

export type ManageableRole = Exclude<Role, 'owner'>;

export type RoleManagementParameters = MemberManagementParameters & {
	role: ManageableRole;
};
