import * as z from 'zod';

import { Group } from '#modules/groups/entity.js';
import { User } from '#modules/users/entity.js';

import { Ban } from './entity.js';

export const BanResponse = z.object({
	...Ban.shape,
	user: User,
	group: Group,
});

export const ListBanResponse = z.array(BanResponse);

export type BanResponse = z.infer<typeof BanResponse>;

export type ListBanResponse = z.infer<typeof ListBanResponse>;
