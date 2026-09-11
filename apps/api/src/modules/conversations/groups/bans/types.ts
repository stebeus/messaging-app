import type { Ban } from '@repo/contracts/bans';
import type { GroupParams } from '@repo/contracts/groups';
import type { Selection } from '#db/types.ts';
import type { GroupMember } from '#modules/members/types.ts';
import type { UsersSelection } from '#modules/users/types.ts';

export type BansSelection = GroupParams & UsersSelection;

export type BanSelection = Selection<Ban>;

export type ListBanArgs = GroupMember & UsersSelection;
