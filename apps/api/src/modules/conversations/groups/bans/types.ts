import type { Ban } from '@repo/contracts/bans';
import type { Selection } from '#db/types.ts';

export type BanParameters = Pick<Ban, 'userId' | 'groupId'>;

export type BanSelection = Selection<Ban>;
