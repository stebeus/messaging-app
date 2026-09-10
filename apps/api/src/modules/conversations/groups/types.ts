import type {
	CreateGroupBody,
	Group,
	GroupParameters,
	UpdateGroupBody,
} from '@repo/contracts/groups';
import type { UserParameters } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { QueryParameters } from '#types.ts';

export type GroupsSelection = UserParameters & QueryParameters;

export type GroupSelection = Selection<Group>;

export type ParticipatedGroup = GroupParameters & UserParameters;

export type CreateGroupParameters = UserParameters & {
	body: CreateGroupBody;
};

export type EditGroupParameters = ParticipatedGroup & {
	body: UpdateGroupBody;
};
