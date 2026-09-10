import type { Ban } from '@repo/contracts/bans';
import type { GroupParameters } from '@repo/contracts/groups';
import type { UserQuery } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { ScopedQueryParameters } from '#types.ts';

export type BanParameters = Pick<Ban, 'userId' | 'groupId'>;

export type BansSelection = ScopedQueryParameters<GroupParameters, UserQuery>;

export type BanSelection = Selection<Ban>;
