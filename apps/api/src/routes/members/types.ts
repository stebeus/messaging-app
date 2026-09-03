import type { GroupParameters } from '@repo/contracts/groups';
import type { Member } from '@repo/contracts/members';
import type { RawUserParameters, UserId } from '#routes/users/types.ts';

export type RawMemberParameters = RawUserParameters & GroupParameters;

export type ManagementParameters = GroupParameters & {
	actorId: UserId;
};

export type MemberManagementParameters = GroupParameters &
	ManagementParameters & {
		targetId: UserId;
	};

export type Role = Member['role'];

export type ManageableRole = Exclude<Role, 'owner'>;

export type RoleManagementParameters = MemberManagementParameters & {
	role: ManageableRole;
};
