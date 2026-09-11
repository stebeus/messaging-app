import type { CreateGroupBody, Group, UpdateGroupBody } from '@repo/contracts/groups';
import type { UserParams } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { GroupMember } from '#modules/members/types.ts';
import type { BodyDto, QueryDto } from '#types.ts';

export type GroupsSelection = UserParams & QueryDto;

export type GroupSelection = Selection<Group>;

export type CreateGroupArgs = UserParams & BodyDto<CreateGroupBody>;

export type EditGroupArgs = GroupMember & BodyDto<UpdateGroupBody>;
