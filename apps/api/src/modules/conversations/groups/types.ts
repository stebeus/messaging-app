import type { Group, GroupParameters } from '@repo/contracts/groups';
import type { UserParameters } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';

export type GroupSelection = Selection<Group>;

export type ParticipatedGroup = UserParameters & GroupParameters;
