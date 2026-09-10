import type { ConversationParameters } from '@repo/contracts/conversations';
import type { GroupParameters } from '@repo/contracts/groups';
import type { Member, roles } from '@repo/contracts/members';
import type { Id } from '@repo/contracts/shared';
import type { UserParameters, UserQuery } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { ScopedQueryParameters } from '#types.ts';

export type MemberParameters = Pick<Member, 'userId' | 'conversationId'>;

export type GroupMemberParameters = UserParameters & GroupParameters;

export type MembersSelection = ScopedQueryParameters<ConversationParameters, UserQuery>;

export type MemberSearchParameters = ScopedQueryParameters<GroupMemberParameters, UserQuery>;

export type MemberSelection = Selection<Member>;

export type Role = Member['role'];

export type Roles = typeof roles;

export type Hierarchy = Readonly<Record<Role, number>>;

export type ManageableRole = Exclude<Role, 'owner'>;

export type Management = GroupParameters & {
	actorId: Id;
};

export type MemberManagement = Management & {
	targetId: Id;
};

export type RoleManagement = MemberManagement & {
	role: ManageableRole;
};
