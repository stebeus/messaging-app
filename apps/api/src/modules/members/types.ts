import type { ConversationParams } from '@repo/contracts/conversations';
import type { GroupParams } from '@repo/contracts/groups';
import type { Member, Role, UpdateMemberBody } from '@repo/contracts/members';
import type { Id } from '@repo/contracts/shared';
import type { UserParams } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { UsersSelection } from '#modules/users/types.ts';
import type { BodyDto } from '#types.ts';

export type MembersSelection = ConversationParams & UsersSelection;

export type MemberSelection = Selection<Member>;

export type MemberArgs = Pick<Member, 'userId' | 'conversationId'>;

export type GroupMember = UserParams & GroupParams;

export type ListMemberArgs = GroupMember & UsersSelection;

export type Management = GroupParams & {
	actorId: Id;
};

export type MemberManagement = Management & {
	targetId: Id;
};

export type RoleManagement = MemberManagement & BodyDto<UpdateMemberBody>;

export type Hierarchy = Readonly<Record<Role, number>>;
